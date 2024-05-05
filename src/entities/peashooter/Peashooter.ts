import P5 from 'p5'
import { DEBUG } from '../../constants/game'
import {
  FramesIndex,
  PEASHOOTER_HEIGHT,
  PEASHOOTER_TIMER,
  PEASHOOTER_WIDTH,
  PeashooterState,
  TransformFrame
} from '../../constants/peashooter'
import Entity from '../Entity'

class Peashooter extends Entity {
  constructor(p5: P5, x: number, y: number) {
    super(x, y)

    this.animationTimer = p5.millis() + PEASHOOTER_TIMER * p5.deltaTime
  }

  static preload(p5: P5) {
    Peashooter.spritesheet = p5.loadImage('/sprites/peashooter.png')
  }

  updateAnimation(p5: P5) {
    if (p5.millis() < this.animationTimer) return

    this.animationFrame++
    if (this.animationFrame >= FramesIndex[PeashooterState.IDLE].length) this.animationFrame = 0

    this.animationTimer = p5.millis() + PEASHOOTER_TIMER * p5.deltaTime
  }

  update(p5: P5) {
    this.updateAnimation(p5)
  }

  draw(p5: P5) {
    const dx = this.x + (TransformFrame[this.animationFrame]?.offsetX || 0)
    const sx = 26 * FramesIndex[PeashooterState.IDLE][this.animationFrame]

    p5.imageMode(p5.CENTER)
    p5.image(
      Peashooter.spritesheet,
      dx,
      this.y,
      PEASHOOTER_WIDTH,
      PEASHOOTER_HEIGHT,
      sx,
      0,
      PEASHOOTER_WIDTH,
      PEASHOOTER_HEIGHT
    )

    if (!DEBUG) return

    this.debug(p5, dx)
  }

  debug(p5: P5, dx: number) {
    p5.stroke('red')
    p5.noFill()
    p5.strokeWeight(1)
    p5.rectMode(p5.CENTER)
    p5.rect(dx, this.y, PEASHOOTER_WIDTH - 1, PEASHOOTER_HEIGHT - 1)
  }
}

export default Peashooter
