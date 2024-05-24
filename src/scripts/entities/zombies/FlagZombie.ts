import P5 from 'p5'
import { ConstructorHitbox, EntityState, HandleState } from '../../../types'
import { DEBUG } from '../../constants/game'
import { BASIC_ZOMBIE_OFFSET_Y, BasicZombieAnimation, BasicZombieState } from '../../constants/zombie/basicZombie'
import {
  DRAW_FLAG_ZOMBIE_COORDS_POINT,
  DRAW_FLAG_ZOMBIE_HITBOX,
  DRAW_FLAG_ZOMBIE_SPRITE_BORDERS,
  FLAG_ZOMBIE_HITBOX_HEIGHT,
  FLAG_ZOMBIE_HITBOX_OFFSET_X,
  FLAG_ZOMBIE_HITBOX_WIDTH,
  FLAG_ZOMBIE_HP,
  FLAG_ZOMBIE_OFFSET_Y,
  FLAG_ZOMBIE_SPEED,
  FlagZombieAnimation,
  FlagZombieState,
  SHOW_FLAG_ZOMBIE_HP
} from '../../constants/zombie/flagZombie'
import { drawHp } from '../../utils'
import Pea from '../projectiles/Pea'
import Zombie from './Zombie'
import flagZombieSpritesheet from '/sprites/zombies/flag-zombie.png'
import BasicZombie from './BasicZombie'

class FlagZombie extends Zombie {
  states: EntityState
  currentState: HandleState
  hpStatus: 'FULL' | 'DAMAGED' = 'FULL'

  constructor(x: number, y: number, lawnRow: number, onZombieEnd: (zombie: Zombie) => void) {
    const hitbox: ConstructorHitbox = {
      x: x - FLAG_ZOMBIE_HITBOX_WIDTH / 2 + FLAG_ZOMBIE_HITBOX_OFFSET_X,
      y: y - FLAG_ZOMBIE_HITBOX_HEIGHT / 2,
      w: FLAG_ZOMBIE_HITBOX_WIDTH,
      h: FLAG_ZOMBIE_HITBOX_HEIGHT,
      isActive: true
    }

    super(x, y, FLAG_ZOMBIE_HP, hitbox, lawnRow, onZombieEnd)

    this.states = {
      [FlagZombieState.WALKING.FULL]: {
        type: FlagZombieState.WALKING.FULL,
        animation: FlagZombieAnimation[FlagZombieState.WALKING.FULL],
        draw: this.handleDrawState,
        update: this.handleUpdateState
      },
      [FlagZombieState.WALKING.DAMAGED]: {
        type: FlagZombieState.WALKING.DAMAGED,
        animation: FlagZombieAnimation[FlagZombieState.WALKING.DAMAGED],
        draw: this.handleDrawState,
        update: this.handleUpdateState
      },
      [FlagZombieState.EATING.FULL]: {
        type: FlagZombieState.EATING.FULL,
        animation: FlagZombieAnimation[FlagZombieState.EATING.FULL],
        draw: this.handleDrawState,
        update: this.handleUpdateState
      },
      [FlagZombieState.EATING.DAMAGED]: {
        type: FlagZombieState.EATING.DAMAGED,
        animation: FlagZombieAnimation[FlagZombieState.EATING.DAMAGED],
        draw: this.handleDrawState,
        update: this.handleUpdateState
      },
      [BasicZombieState.LYING_DOWN]: {
        type: BasicZombieState.LYING_DOWN,
        animation: BasicZombieAnimation[BasicZombieState.LYING_DOWN],
        draw: this.handleLyingDownDraw,
        update: this.handleLyingDownUpdate
      }
    }

    this.currentState = this.states[FlagZombieState[this.action][this.hpStatus]]
  }

  static preload(p5: P5) {
    FlagZombie.spritesheet = p5.loadImage(flagZombieSpritesheet)
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

  updateAction() {
    if (this.remainingHp <= 0) return

    this.action = this.isPlantAhead ? 'EATING' : 'WALKING'
    this.currentState = this.states[BasicZombieState[this.action][this.hpStatus]]
  }

  updatePosition(p5: P5) {
    if (this.action !== 'WALKING' || this.remainingHp <= 0) return

    const xVelocity = FLAG_ZOMBIE_SPEED * (p5.deltaTime / 1000)

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

  handleDrawState = (p5: P5) => {
    const { originX, originY, w, h } = this.currentState.animation[this.animationFrame]
    const positionY = this.position.y + FLAG_ZOMBIE_OFFSET_Y

    p5.imageMode(p5.CENTER)
    p5.image(FlagZombie.spritesheet, this.position.x, positionY, w, h, originX, originY, w, h)
  }

  handleLyingDownDraw = (p5: P5) => {
    const { originX, originY, w, h } = this.currentState.animation[this.animationFrame]
    const positionY = this.position.y + BASIC_ZOMBIE_OFFSET_Y

    p5.imageMode(p5.CENTER)
    p5.image(BasicZombie.spritesheet, this.position.x, positionY, w, h, originX, originY, w, h)
  }

  draw(p5: P5) {
    this.currentState.draw(p5)

    if (DEBUG) this.debug(p5)
  }

  debug(p5: P5) {
    if (DRAW_FLAG_ZOMBIE_HITBOX && this.hitbox.isActive) this.drawHitbox(p5)

    if (DRAW_FLAG_ZOMBIE_SPRITE_BORDERS) {
      this.drawSpriteBorders(
        p5,
        this.position.x,
        this.position.y + FLAG_ZOMBIE_OFFSET_Y,
        this.currentState.animation[this.animationFrame].w,
        this.currentState.animation[this.animationFrame].h
      )
    }

    if (DRAW_FLAG_ZOMBIE_COORDS_POINT) this.drawCoordsPoint(p5)

    if (SHOW_FLAG_ZOMBIE_HP && this.remainingHp > 0)
      drawHp(p5, this.position.x, this.position.y, this.hp, this.remainingHp)
  }
}

export default FlagZombie
