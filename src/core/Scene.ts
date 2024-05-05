import P5, { Image } from 'p5'
import {
  DEBUG,
  FRAME_RATE_FRECUENCY,
  LAWN_OFFSET_X,
  LAWN_OFFSET_Y,
  LAWN_HEIGHT,
  LAWN_WIDTH,
  TILE_HEIGHT,
  TILE_WIDTH,
  SHOW_FPS
} from '../constants/game'
import Peashooter from '../entities/peashooter/Peashooter'

class Scene {
  static bgImage: Image

  framesTimer: number = 0
  frameRate: number = 0
  peashooters: Peashooter[] = []

  constructor(p5: P5) {
    if (!DEBUG) return

    this.frameRate = this.getFrameRate(p5)
    this.framesTimer = p5.millis() + FRAME_RATE_FRECUENCY
  }

  static preload(p5: P5) {
    Scene.bgImage = p5.loadImage('/sprites/bg.png')

    Peashooter.preload(p5)
  }

  getFrameRate = (p5: P5) => p5.round(p5.frameRate())

  updateFrameRate(p5: P5) {
    if (p5.millis() < this.framesTimer) return

    this.frameRate = this.getFrameRate(p5)
    this.framesTimer = p5.millis() + FRAME_RATE_FRECUENCY
  }

  update(p5: P5) {
    this.peashooters.forEach(peashooter => peashooter.update(p5))

    if (SHOW_FPS) this.updateFrameRate(p5)
  }

  draw(p5: P5) {
    p5.imageMode(p5.CORNER)
    p5.image(Scene.bgImage, 0, 0)

    this.peashooters.forEach(peashooter => peashooter.draw(p5))

    if (SHOW_FPS) this.showFps(p5)

    if (!DEBUG) return

    this.debug(p5)
  }

  showFps(p5: P5) {
    p5.strokeWeight(1)
    p5.stroke('black')
    p5.fill('black')
    p5.textAlign(p5.CENTER)
    p5.text(this.frameRate, 8, 10)
  }

  debug(p5: P5) {
    p5.stroke('red')
    p5.noFill()
    p5.rectMode(p5.CORNER)

    p5.rect(LAWN_OFFSET_X, LAWN_OFFSET_Y, LAWN_WIDTH, LAWN_HEIGHT)
  
    for (let i = 0; i < 4; i++) {
      p5.line(
        LAWN_OFFSET_X,
        (TILE_HEIGHT * (i + 1)) + LAWN_OFFSET_Y,
        LAWN_OFFSET_X + LAWN_WIDTH,
        (TILE_HEIGHT * (i + 1)) + LAWN_OFFSET_Y
      )
    }

    for (let i = 0; i < 8; i++) {
      p5.line(
        LAWN_OFFSET_X + (TILE_WIDTH * (i + 1)),
        LAWN_OFFSET_Y,
        LAWN_OFFSET_X + (TILE_WIDTH * (i + 1)),
        LAWN_OFFSET_Y + LAWN_HEIGHT,
      )
    }
  }
}

export default Scene
