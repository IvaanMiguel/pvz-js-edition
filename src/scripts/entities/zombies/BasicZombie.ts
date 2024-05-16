import P5 from 'p5'
import { EntityState, HandleState } from '../../../types'
import { DEBUG } from '../../constants/game'
import {
  BASIC_ZOMBIE_DMG,
  BASIC_ZOMBIE_HP,
  DRAW_COORDS_POINT,
  DRAW_HITBOX,
  DRAW_SPRITE_BORDERS,
  FramesIndex,
  HITBOX_HEIGHT,
  HITBOX_OFFSET_X,
  HITBOX_WIDTH,
  SHOW_HP,
  TransformFrame,
  ZOMBIE_SPEED,
  ZOMBIE_TIMER,
  ZombieDimensions,
  ZombieState
} from '../../constants/zombie/basicZombie'
import { drawHp } from '../../utils'
import Pea from '../projectiles/Pea'
import Zombie from './Zombie'
import basicZombieSprites from '/sprites/zombies/basic-zombie.png'

class BasicZombie extends Zombie {
  states: EntityState
  currentState: HandleState
  dmg: number = BASIC_ZOMBIE_DMG
  hpStatus: 'FULL' | 'DAMAGED'

  constructor(x: number, y: number, lawnRow: number, onZombieEnd: (zombie: Zombie) => void) {
    super(
      x,
      y,
      BASIC_ZOMBIE_HP,
      {
        x: x - HITBOX_WIDTH / 2 + HITBOX_OFFSET_X,
        y: y - HITBOX_HEIGHT / 2,
        w: HITBOX_WIDTH,
        h: HITBOX_HEIGHT,
        isActive: true
      },
      lawnRow,
      onZombieEnd
    )

    this.hpStatus = 'FULL'

    this.states = {
      [ZombieState.WALKING.FULL]: {
        type: ZombieState.WALKING.FULL,
        draw: this.handleDraw,
        update: this.handleUpdate
      },
      [ZombieState.WALKING.DAMAGED]: {
        type: ZombieState.WALKING.DAMAGED,
        draw: this.handleDraw,
        update: this.handleUpdate
      },
      [ZombieState.EATING.FULL]: {
        type: ZombieState.EATING.FULL,
        draw: this.handleDraw,
        update: this.handleUpdate
      },
      [ZombieState.EATING.DAMAGED]: {
        type: ZombieState.EATING.DAMAGED,
        draw: this.handleDraw,
        update: this.handleUpdate
      },
      [ZombieState.LYING_DOWN]: {
        type: ZombieState.LYING_DOWN,
        draw: this.handleLyingDownDraw,
        update: this.handleLyingDownUpdate
      }
    }

    this.currentState = this.states[ZombieState[this.action][this.hpStatus]]
  }

  static preload(p5: P5) {
    BasicZombie.spritesheet = p5.loadImage(basicZombieSprites)
  }

  hit(pea: Pea) {
    this.remainingHp -= pea.dmg
  }

  kill(p5: P5) {
    this.currentState = this.states[ZombieState.LYING_DOWN]
    this.animationFrame = 0
    this.animationTimer = p5.millis() + ZOMBIE_TIMER * p5.deltaTime
  }

  handleUpdate = (p5: P5) => {
    if (p5.millis() < this.animationTimer) return

    this.animationFrame++
    if (this.animationFrame >= FramesIndex[this.currentState.type].length) this.animationFrame = 0

    this.animationTimer = p5.millis() + ZOMBIE_TIMER * p5.deltaTime
  }

  handleLyingDownUpdate = (p5: P5) => {
    if (p5.millis() < this.animationTimer) return

    this.animationFrame++
    if (this.animationFrame >= FramesIndex[this.currentState.type].length) {
      this.animationFrame = 0
      this.onZombieEnd(this)
    }

    this.animationTimer = p5.millis() + ZOMBIE_TIMER * p5.deltaTime
  }

  handleDraw = (p5: P5) => {
    const currentState = ZombieState[this.action][this.hpStatus]

    const width = ZombieDimensions[currentState].width
    const height = ZombieDimensions[currentState].height

    p5.imageMode(p5.CENTER)
    p5.image(
      BasicZombie.spritesheet,
      this.position.x + (TransformFrame[currentState]?.offsetX || 0),
      this.position.y + (TransformFrame[currentState]?.offsetY || 0),
      width,
      height,
      width * FramesIndex[currentState][this.animationFrame],
      ZombieDimensions[currentState].originY || 0,
      width,
      height
    )
  }

  handleLyingDownDraw = (p5: P5) => {
    const width = ZombieDimensions[this.currentState.type].width
    const height = ZombieDimensions[this.currentState.type].height

    p5.imageMode(p5.CENTER)
    p5.image(
      BasicZombie.spritesheet,
      this.position.x + (TransformFrame[this.currentState.type]?.offsetX || 0),
      this.position.y + (TransformFrame[this.currentState.type]?.offsetY || 0),
      width,
      height,
      width * FramesIndex[this.currentState.type][this.animationFrame],
      ZombieDimensions[this.currentState.type].originY || 0,
      width,
      height
    )
  }

  updatePosition(p5: P5) {
    if (this.action !== 'WALKING' || this.remainingHp <= 0) return

    const xVelocity = ZOMBIE_SPEED * (p5.deltaTime / 1000)

    this.position.sub(xVelocity, 0)
    this.hitbox.position.sub(xVelocity, 0)
  }

  update(p5: P5) {
    this.hpStatus = this.remainingHp <= this.hp / 2 ? 'DAMAGED' : 'FULL'
    this.hitbox.isActive = this.remainingHp > 0

    if (this.remainingHp <= 0 && this.currentState.type !== ZombieState.LYING_DOWN) this.kill(p5)

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

    if (DRAW_HITBOX && this.hitbox.isActive) this.drawHitbox(p5)

    if (DRAW_SPRITE_BORDERS) {
      this.drawSpriteBorders(
        p5,
        this.position.x + (TransformFrame[this.currentState.type]?.offsetX || 0),
        this.position.y + (TransformFrame[this.currentState.type]?.offsetY || 0),
        ZombieDimensions[this.currentState.type].width,
        ZombieDimensions[this.currentState.type].height
      )
    }

    if (DRAW_COORDS_POINT) this.drawCoordsPoint(p5)

    if (SHOW_HP && this.remainingHp > 0) drawHp(p5, this.position.x, this.position.y, this.hp, this.remainingHp)
  }
}

export default BasicZombie
