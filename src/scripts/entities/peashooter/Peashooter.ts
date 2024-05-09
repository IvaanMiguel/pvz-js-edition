import P5 from 'p5'
import { DEBUG } from '../../constants/game'
import {
  DRAW_PEASHOOTER_SPRITE_BORDERS,
  FIRE_RATE,
  FramesIndex,
  PEASHOOTER_HEIGHT,
  PEASHOOTER_TIMER,
  PEASHOOTER_WIDTH,
  PeashooterState,
  TransformFrame
} from '../../constants/peashooter'
import { EntityState, HandleState } from '../../../types'
import Entity from '../Entity'

class Peashooter extends Entity {
  firingTimer: number
  currentState: HandleState
  changingStateTimer: number
  states: EntityState
  isZombieAhead: boolean
  addPea: (x: number, y: number) => void
  CHANGING_STATE_CONST: number = 500

  // Solo para usarse en el método debug().
  dx: number = 0

  constructor(p5: P5, x: number, y: number, addPea: (x: number, y: number) => void) {
    super(x, y)

    this.addPea = addPea
    this.isZombieAhead = Math.floor(Math.random() * 2) === 0
    this.animationTimer = p5.millis() + PEASHOOTER_TIMER * p5.deltaTime
    this.firingTimer = p5.millis() + FIRE_RATE / 4

    this.states = {
      [PeashooterState.IDLE]: {
        type: PeashooterState.IDLE,
        draw: this.handleIdleDraw,
        update: this.handleIdleUpdate
      },
      [PeashooterState.SHOOTING]: {
        type: PeashooterState.SHOOTING,
        draw: this.handleShootingDraw,
        update: this.handleShootingUpdate
      }
    }

    this.changingStateTimer = p5.millis() + this.CHANGING_STATE_CONST
    this.currentState = this.states[PeashooterState.IDLE]
  }

  static preload(p5: P5) {
    Peashooter.spritesheet = p5.loadImage('/sprites/peashooter.png')
  }

  handleIdleDraw = (p5: P5) => {
    this.dx = this.vector.x + (TransformFrame[this.animationFrame]?.offsetX || 0)
    const sx = 26 * FramesIndex[this.currentState.type][this.animationFrame]

    p5.imageMode(p5.CENTER)
    p5.image(
      Peashooter.spritesheet,
      this.dx,
      this.vector.y,
      PEASHOOTER_WIDTH,
      PEASHOOTER_HEIGHT,
      sx,
      0,
      PEASHOOTER_WIDTH,
      PEASHOOTER_HEIGHT
    )
  }

  handleIdleUpdate = () => {
    this.animationFrame = 0
  }

  handleShootingDraw = (p5: P5) => {
    p5.imageMode(p5.CENTER)
    p5.image(
      Peashooter.spritesheet,
      this.vector.x,
      this.vector.y,
      PEASHOOTER_WIDTH,
      PEASHOOTER_HEIGHT,
      26 * FramesIndex[this.currentState.type][this.animationFrame],
      30,
      PEASHOOTER_WIDTH,
      PEASHOOTER_HEIGHT
    )
  }

  handleShootingUpdate = (p5: P5) => {
    this.animationFrame = 0
    this.changeState(p5, PeashooterState.IDLE)
  }

  changeState(p5: P5, newState: string) {
    this.currentState = this.states[newState]
    this.animationFrame = 0
    this.animationTimer = p5.millis() + PEASHOOTER_TIMER * p5.deltaTime
  }

  updateFiringPea(p5: P5) {
    if (p5.millis() < this.firingTimer || !this.isZombieAhead) return

    this.changeState(p5, PeashooterState.SHOOTING)
    this.firingTimer = p5.millis() + FIRE_RATE
    this.addPea(this.vector.x + 10, this.vector.y - 8)
  }

  updateAnimation(p5: P5) {
    if (p5.millis() < this.animationTimer) return

    this.animationFrame++
    if (this.animationFrame >= FramesIndex[this.currentState.type].length) this.currentState.update(p5)

    this.animationTimer = p5.millis() + PEASHOOTER_TIMER * p5.deltaTime
  }

  update(p5: P5) {
    this.updateFiringPea(p5)
    this.updateAnimation(p5)
  }

  draw(p5: P5) {
    this.currentState.draw(p5)

    if (!DEBUG) return

    this.debug(p5)
  }

  debug(p5: P5) {
    if (DRAW_PEASHOOTER_SPRITE_BORDERS) {
      p5.stroke('red')
      p5.noFill()
      p5.strokeWeight(1)
      p5.rectMode(p5.CENTER)
      p5.rect(this.dx, this.vector.y, PEASHOOTER_WIDTH, PEASHOOTER_HEIGHT)
    }
  }
}

export default Peashooter
