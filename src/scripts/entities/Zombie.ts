import P5 from 'p5'
import { EntityState, HandleState } from '../../types'
import { DEBUG } from '../constants/game'
import {
  FramesIndex,
  TransformFrame,
  ZOMBIE_SPEED,
  ZOMBIE_TIMER,
  ZombieDimensions,
  ZombieState
} from '../constants/zombie'
import Entity from './Entity'

class Zombie extends Entity {
  states: EntityState
  currentState: HandleState
  hp: number
  remainingHp: number
  action: 'EATING' | 'WALKING'
  hpStatus: 'FULL' | 'DAMAGED'

  constructor(x: number, y: number, hp: number) {
    super(x, y)

    this.hp = hp
    this.remainingHp = hp
    this.action = 'WALKING'
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
        update: this.handleUpdate
      }
    }

    this.currentState = this.states[ZombieState[this.action][this.hpStatus]]
  }

  static preload(p5: P5) {
    Zombie.spritesheet = p5.loadImage('/sprites/zombie.png')
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

  handleDraw = (p5: P5) => {
    const currentState = ZombieState[this.action][this.hpStatus]

    const width = ZombieDimensions[currentState].width
    const height = ZombieDimensions[currentState].height

    p5.imageMode(p5.CENTER)
    p5.image(
      Zombie.spritesheet,
      this.vector.x + (TransformFrame[currentState]?.offsetX || 0),
      this.vector.y + (TransformFrame[currentState]?.offsetY || 0),
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
      Zombie.spritesheet,
      this.vector.x + (TransformFrame[this.currentState.type]?.offsetX || 0),
      this.vector.y + (TransformFrame[this.currentState.type]?.offsetY || 0),
      width,
      height,
      width * FramesIndex[this.currentState.type][this.animationFrame],
      ZombieDimensions[this.currentState.type].originY || 0,
      width,
      height
    )
  }

  update(p5: P5) {
    this.hpStatus = this.remainingHp <= (this.hp / 2) ? 'DAMAGED' : 'FULL'

    if (this.remainingHp <= 0 && this.currentState.type !== ZombieState.LYING_DOWN) this.kill(p5)

    if (this.action === 'WALKING' && this.remainingHp > 0) this.vector.sub(ZOMBIE_SPEED * (p5.deltaTime / 1000), 0)

    this.currentState.update(p5)
  }

  draw(p5: P5) {
    this.currentState.draw(p5)

    if (!DEBUG) return

    this.debug(p5)
  }

  debug(p5: P5) {
    p5.stroke('red')
    p5.noFill()
    p5.strokeWeight(1)
    p5.rectMode(p5.CENTER)
    p5.rect(
      this.vector.x + (TransformFrame[this.currentState.type]?.offsetX || 0),
      this.vector.y + (TransformFrame[this.currentState.type]?.offsetY || 0),
      ZombieDimensions[this.currentState.type].width - 1,
      ZombieDimensions[this.currentState.type].height - 1
    )
  }
}

export default Zombie
