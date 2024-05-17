import P5 from 'p5'
import { ConstructorHitbox, EntityState, HandleState } from '../../../types'
import { DEBUG } from '../../constants/game'
import {
  BASIC_ZOMBIE_HITBOX_HEIGHT,
  BASIC_ZOMBIE_HITBOX_OFFSET_X,
  BASIC_ZOMBIE_HITBOX_WIDTH,
  BASIC_ZOMBIE_HP,
  BasicZombieAnimation,
  BasicZombieState,
  DRAW_BASIC_ZOMBIE_COORDS_POINT,
  DRAW_BASIC_ZOMBIE_HITBOX,
  DRAW_BASIC_ZOMBIE_SPRITE_BORDERS,
  SHOW_BASIC_ZOMBIE_HP,
  TransformFrame,
  ZOMBIE_SPEED
} from '../../constants/zombie/basicZombie'
import { drawHp } from '../../utils'
import Pea from '../projectiles/Pea'
import Zombie from './Zombie'
import basicZombieSprites from '/sprites/zombies/basic-zombie.png'

class BasicZombie extends Zombie {
  states: EntityState
  currentState: HandleState
  hpStatus: 'FULL' | 'DAMAGED' = 'FULL'

  constructor(x: number, y: number, lawnRow: number, onZombieEnd: (zombie: Zombie) => void) {
    const hitbox: ConstructorHitbox = {
      x: x - BASIC_ZOMBIE_HITBOX_WIDTH / 2 + BASIC_ZOMBIE_HITBOX_OFFSET_X,
      y: y - BASIC_ZOMBIE_HITBOX_HEIGHT / 2,
      w: BASIC_ZOMBIE_HITBOX_WIDTH,
      h: BASIC_ZOMBIE_HITBOX_HEIGHT,
      isActive: true
    }
    super(x, y, BASIC_ZOMBIE_HP, hitbox, lawnRow, onZombieEnd)

    this.states = {
      [BasicZombieState.WALKING.FULL]: {
        type: BasicZombieState.WALKING.FULL,
        animation: BasicZombieAnimation[BasicZombieState.WALKING.FULL],
        draw: this.handleDrawState,
        update: this.handleUpdateState
      },
      [BasicZombieState.WALKING.DAMAGED]: {
        type: BasicZombieState.WALKING.DAMAGED,
        animation: BasicZombieAnimation[BasicZombieState.WALKING.DAMAGED],
        draw: this.handleDrawState,
        update: this.handleUpdateState
      },
      [BasicZombieState.EATING.FULL]: {
        type: BasicZombieState.EATING.FULL,
        animation: BasicZombieAnimation[BasicZombieState.EATING.FULL],
        draw: this.handleDrawState,
        update: this.handleUpdateState
      },
      [BasicZombieState.EATING.DAMAGED]: {
        type: BasicZombieState.EATING.DAMAGED,
        animation: BasicZombieAnimation[BasicZombieState.EATING.DAMAGED],
        draw: this.handleDrawState,
        update: this.handleUpdateState
      },
      [BasicZombieState.LYING_DOWN]: {
        type: BasicZombieState.LYING_DOWN,
        animation: BasicZombieAnimation[BasicZombieState.LYING_DOWN],
        draw: this.handleDrawState,
        update: this.handleLyingDownUpdate
      }
    }

    this.currentState = this.states[BasicZombieState[this.action][this.hpStatus]]
  }

  static preload(p5: P5) {
    BasicZombie.spritesheet = p5.loadImage(basicZombieSprites)
  }

  hit(pea: Pea) {
    this.remainingHp -= pea.dmg
  }

  kill(p5: P5) {
    this.currentState = this.states[BasicZombieState.LYING_DOWN]
    this.animationFrame = 0
    this.animationTimer = p5.millis() + this.currentState.animation[this.animationFrame].timer * p5.deltaTime
  }

  handleUpdateState = (p5: P5) => {
    if (p5.millis() < this.animationTimer) return

    this.animationFrame++
    if (this.animationFrame >= this.currentState.animation.length) this.animationFrame = 0

    this.animationTimer = p5.millis() + this.currentState.animation[this.animationFrame].timer * p5.deltaTime
  }

  handleLyingDownUpdate = (p5: P5) => {
    if (p5.millis() < this.animationTimer) return

    this.animationFrame++
    if (this.animationFrame >= this.currentState.animation.length) {
      this.animationFrame = 0
      this.onZombieEnd(this)
    }

    this.animationTimer = p5.millis() + this.currentState.animation[this.animationFrame].timer * p5.deltaTime
  }

  handleDrawState = (p5: P5) => {
    const { originX, originY, w, h } = this.currentState.animation[this.animationFrame]
    const x = this.position.x + (TransformFrame[this.currentState.type]?.offsetX || 0)
    const y = this.position.y + (TransformFrame[this.currentState.type]?.offsetY || 0)

    p5.imageMode(p5.CENTER)
    p5.image(BasicZombie.spritesheet, x, y, w, h, originX, originY, w, h)
  }

  updateAction() {
    if (this.remainingHp <= 0) return

    this.action = this.isPlantAhead ? 'EATING' : 'WALKING'
    this.currentState = this.states[BasicZombieState[this.action][this.hpStatus]]
  }

  updatePosition(p5: P5) {
    if (this.action !== 'WALKING' || this.remainingHp <= 0) return

    const xVelocity = ZOMBIE_SPEED * (p5.deltaTime / 1000)

    this.position.sub(xVelocity, 0)
    this.hitbox.position.sub(xVelocity, 0)
  }

  update(p5: P5) {
    this.hpStatus = this.remainingHp <= this.hp / 2 ? 'DAMAGED' : 'FULL'

    this.updateAction()

    this.hitbox.isActive = this.remainingHp > 0

    if (this.remainingHp <= 0 && this.currentState.type !== BasicZombieState.LYING_DOWN) this.kill(p5)

    this.updatePosition(p5)
    this.currentState.update(p5)
  }

  draw(p5: P5) {
    this.currentState.draw(p5)

    if (!DEBUG) return

    this.debug(p5)
  }

  debug(p5: P5) {
    p5.strokeWeight(1)

    if (DRAW_BASIC_ZOMBIE_HITBOX && this.hitbox.isActive) this.drawHitbox(p5)

    if (DRAW_BASIC_ZOMBIE_SPRITE_BORDERS) {
      this.drawSpriteBorders(
        p5,
        this.position.x + (TransformFrame[this.currentState.type]?.offsetX || 0),
        this.position.y + (TransformFrame[this.currentState.type]?.offsetY || 0),
        this.currentState.animation[this.animationFrame].w,
        this.currentState.animation[this.animationFrame].h
      )
    }

    if (DRAW_BASIC_ZOMBIE_COORDS_POINT) this.drawCoordsPoint(p5)

    if (SHOW_BASIC_ZOMBIE_HP && this.remainingHp > 0)
      drawHp(p5, this.position.x, this.position.y, this.hp, this.remainingHp)
  }
}

export default BasicZombie
