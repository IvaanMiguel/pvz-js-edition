import P5, { Image } from 'p5'
import {
  DEBUG,
  FRAME_RATE_FRECUENCY,
  LAWN_HEIGHT,
  LAWN_OFFSET_X,
  LAWN_OFFSET_Y,
  LAWN_WIDTH,
  SHOW_FPS,
  TILE_HEIGHT,
  TILE_WIDTH
} from '../constants/game'
import Zombie from '../entities/Zombie'
import Peashooter from '../entities/peashooter/Peashooter'
import Lawn from './Lawn'
import Player from './Player'
import PeasSystem from './systems/PeasSystem'
import ZombiesSystem from './systems/ZombiesSystem'

class Scene {
  static bgImage: Image

  framesTimer: number = 0
  frameRate: number = 0
  lawn: Lawn
  player: Player
  peasSystem: PeasSystem
  zombiesSystem: ZombiesSystem
  SPAWNING_TIMER_CONST: number = 2000
  spawningTime: number = 0

  constructor(p5: P5) {
    this.zombiesSystem = new ZombiesSystem()
    this.lawn = new Lawn(LAWN_OFFSET_X, LAWN_OFFSET_Y, LAWN_WIDTH, LAWN_HEIGHT, this.zombiesSystem)
    this.peasSystem = new PeasSystem(this.lawn, this.zombiesSystem)
    this.player = new Player(this.lawn, this.peasSystem)

    if (!DEBUG) return

    this.frameRate = this.getFrameRate(p5)
    this.framesTimer = p5.millis() + FRAME_RATE_FRECUENCY
  }

  static preload(p5: P5) {
    Scene.bgImage = p5.loadImage('/sprites/bg.png')

    Peashooter.preload(p5)
    Zombie.preload(p5)
  }

  getFrameRate = (p5: P5) => p5.round(p5.frameRate())

  updateFrameRate(p5: P5) {
    if (p5.millis() < this.framesTimer) return

    this.frameRate = this.getFrameRate(p5)
    this.framesTimer = p5.millis() + FRAME_RATE_FRECUENCY
  }

  update(p5: P5) {
    if (p5.millis() >= this.spawningTime) {
      const lawnRow = Math.floor(Math.random() * 5)
      const y = (lawnRow + 1) * TILE_HEIGHT + LAWN_OFFSET_Y - TILE_HEIGHT / 2

      this.zombiesSystem.addZombieToRow(new Zombie(p5.width + 10, y, 10, lawnRow, this.zombiesSystem.onZombieEnd), lawnRow)
      this.spawningTime = p5.millis() + this.SPAWNING_TIMER_CONST
    }

    this.player.update(p5)
    this.lawn.update(p5)
    this.zombiesSystem.update(p5)
    this.peasSystem.update(p5)

    if (SHOW_FPS) this.updateFrameRate(p5)
  }

  draw(p5: P5) {
    p5.imageMode(p5.CORNER)
    p5.image(Scene.bgImage, 0, 0)

    this.lawn.draw(p5)
    this.peasSystem.draw(p5)

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

    p5.rect(this.lawn.x, this.lawn.y, this.lawn.w, this.lawn.h)

    for (let i = 1; i < this.lawn.h / TILE_HEIGHT; i++) {
      p5.line(this.lawn.x, TILE_HEIGHT * i + this.lawn.y, this.lawn.x + this.lawn.w, TILE_HEIGHT * i + this.lawn.y)
    }

    for (let i = 1; i < this.lawn.w / TILE_WIDTH; i++) {
      p5.line(this.lawn.x + TILE_WIDTH * i, this.lawn.y, this.lawn.x + TILE_WIDTH * i, this.lawn.y + this.lawn.h)
    }
  }
}

export default Scene
