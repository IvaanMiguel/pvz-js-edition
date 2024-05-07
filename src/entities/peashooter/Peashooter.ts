import P5 from 'p5'
import { DEBUG } from '../../constants/game'
import {
  FIRE_RATE,
  FramesIndex,
  PEASHOOTER_HEIGHT,
  PEASHOOTER_TIMER,
  PEASHOOTER_WIDTH,
  PeaState,
  PeashooterState,
  TransformFrame
} from '../../constants/peashooter'
import { EntityState, HandleState } from '../../types'
import Entity from '../Entity'
import Pea from './Pea'

class Peashooter extends Entity {
  firingTimer: number
  peas: Pea[] = []
  currentState: HandleState
  states: EntityState
  dx: number = 0

  constructor(p5: P5, x: number, y: number) {
    super(x, y)

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

  handleIdleUpdate() {
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
    if (p5.millis() < this.firingTimer) return

    this.changeState(p5, PeashooterState.SHOOTING)

    this.firingTimer = p5.millis() + FIRE_RATE
    this.peas.push(new Pea(this.vector.x + 5, this.vector.y - 8))
  }

  updateAnimation(p5: P5) {
    if (p5.millis() < this.animationTimer) return

    this.animationFrame++
    if (this.animationFrame >= FramesIndex[this.currentState.type].length) this.currentState.update(p5)

    this.animationTimer = p5.millis() + PEASHOOTER_TIMER * p5.deltaTime
  }

  update(p5: P5) {
    this.updateFiringPea(p5)

    this.peas.forEach((pea) => {
      const index = this.peas.indexOf(pea)

      if (pea.vector.x > p5.width - 20 && pea.currentState.type !== PeaState.ON_HIT) {
        pea.onHitEnd = () => this.peas.splice(index, 1)
        pea.changeState(p5, PeaState.ON_HIT)
      }

      pea.update(p5)

      // pea.vector.x > p5.width + 10 ? this.peas.splice(index, 1) : pea.update(p5)
    })

    this.updateAnimation(p5)
  }

  draw(p5: P5) {
    this.peas.forEach((pea) => pea.draw(p5))

    this.currentState.draw(p5)

    if (!DEBUG) return

    this.debug(p5)
  }

  debug(p5: P5) {
    p5.stroke('red')
    p5.noFill()
    p5.strokeWeight(1)
    p5.rectMode(p5.CENTER)
    p5.rect(this.dx, this.vector.y, PEASHOOTER_WIDTH - 1, PEASHOOTER_HEIGHT - 1)
  }
}

export default Peashooter
