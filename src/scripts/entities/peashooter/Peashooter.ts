import P5 from 'p5'
import { EntityState, HandleState } from '../../../types'
import { DEBUG } from '../../constants/game'
import {
  DRAW_PEASHOOTER_SPRITE_BORDERS,
  FIRE_RATE,
  FramesIndex,
  PEASHOOTER_HEIGHT,
  PEASHOOTER_HP,
  PEASHOOTER_TIMER,
  PEASHOOTER_WIDTH,
  PeashooterState,
  TransformFrame
} from '../../constants/peashooter'
import Plant from '../Plant'

class Peashooter extends Plant {
  hp: number = PEASHOOTER_HP
  remainingHp: number = PEASHOOTER_HP
  firingTimer: number
  currentState: HandleState
  states: EntityState
  lawnRow: number
  addPea: (x: number, y: number, lawnRow: number) => void

  // Solo para usarse en el método debug().
  dx: number = 0

  constructor(p5: P5, x: number, y: number, lawnRow: number, addPea: (x: number, y: number, lawnRow: number) => void) {
    super(x, y)

    this.lawnRow = lawnRow
    this.addPea = addPea

    this.isZombieAhead = false
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

    this.currentState = this.states[PeashooterState.IDLE]
  }

  static preload(p5: P5) {
    Peashooter.spritesheet = p5.loadImage('/sprites/peashooter.png')
  }

  setIsZombieAhead(isZombieAhead: boolean) {
    this.isZombieAhead = isZombieAhead
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
    const initialFrame = p5.floor(p5.random(0, FramesIndex[PeashooterState.IDLE].length))

    this.changeState(p5, PeashooterState.IDLE, initialFrame)
  }

  changeState(p5: P5, newState: string, initialAnimationFrame: number = 0) {
    this.currentState = this.states[newState]
    this.animationFrame = initialAnimationFrame
    this.animationTimer = p5.millis() + PEASHOOTER_TIMER * p5.deltaTime
  }

  updateFiringPea(p5: P5) {
    if (p5.millis() < this.firingTimer) return

    this.changeState(p5, PeashooterState.SHOOTING)
    this.firingTimer = p5.millis() + FIRE_RATE
    this.addPea(this.vector.x + 10, this.vector.y - 8, this.lawnRow)
  }

  updateAnimation(p5: P5) {
    if (p5.millis() < this.animationTimer) return

    this.animationFrame++
    if (this.animationFrame >= FramesIndex[this.currentState.type].length) this.currentState.update(p5)

    this.animationTimer = p5.millis() + PEASHOOTER_TIMER * p5.deltaTime
  }

  update(p5: P5) {
    if (this.isZombieAhead) this.updateFiringPea(p5)

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
