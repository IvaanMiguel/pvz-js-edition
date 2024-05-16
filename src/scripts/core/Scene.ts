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
import { SEEDS_BAR_X, SEEDS_BAR_Y, SUN_COUNTER_HUD_X, SUN_COUNTER_HUD_Y } from '../constants/hud'
import { PlantId } from '../constants/plants/plants'
import Peashooter from '../entities/plants/Peashooter'
import PotatoMine from '../entities/plants/PotatoMine'
import Sunflower from '../entities/plants/Sunflower'
import Wallnut from '../entities/plants/Wallnut'
import BasicZombie from '../entities/zombies/BasicZombie'
import SunCounter from '../screen/SunCounter'
import Player from './Player'
import LawnSystem from './systems/LawnSystem'
import PeasSystem from './systems/PeasSystem'
import SeedsBarSystem from './systems/SeedsBarSystem'
import SunSystem from './systems/SunSystem'
import VersusSystem from './systems/VersusSystem'
import ZombiesSystem from './systems/ZombiesSystem'
import bgImage from '/sprites/bg.png'

class Scene {
  static bgImage: Image

  framesTimer: number = 0
  frameRate: number = 0

  sunCounter: SunCounter

  lawnSystem: LawnSystem
  peasSystem: PeasSystem
  zombiesSystem: ZombiesSystem
  versusSystem: VersusSystem
  sunSystem: SunSystem
  seedsBarSystem: SeedsBarSystem

  player: Player
  SPAWNING_TIMER_CONST: number = 1000
  spawningTime: number = 0

  constructor(p5: P5) {
    this.zombiesSystem = new ZombiesSystem()
    this.lawnSystem = new LawnSystem(LAWN_OFFSET_X, LAWN_OFFSET_Y, LAWN_WIDTH, LAWN_HEIGHT, this.zombiesSystem)
    this.peasSystem = new PeasSystem(this.zombiesSystem)
    this.versusSystem = new VersusSystem(this.lawnSystem, this.peasSystem, this.zombiesSystem)
    this.sunSystem = new SunSystem(p5)

    this.seedsBarSystem = new SeedsBarSystem(
      SEEDS_BAR_X,
      SEEDS_BAR_Y,
      new Set([PlantId.SUNFLOWER, PlantId.PEASHOOTER, PlantId.POTATO_MINE, PlantId.REPEATER, PlantId.WALLNUT]),
      this.sunSystem
    )

    this.sunCounter = new SunCounter(SUN_COUNTER_HUD_X, SUN_COUNTER_HUD_Y, this.sunSystem)

    this.player = new Player(p5, this.lawnSystem, this.peasSystem, this.sunSystem, this.seedsBarSystem)

    if (!DEBUG) return

    this.frameRate = this.getFrameRate(p5)
    this.framesTimer = p5.millis() + FRAME_RATE_FRECUENCY
  }

  static preload(p5: P5) {
    Scene.bgImage = p5.loadImage(bgImage)

    SeedsBarSystem.preload(p5)
    SunCounter.preload(p5)
    Peashooter.preload(p5)
    Wallnut.preload(p5)
    Sunflower.preload(p5)
    PotatoMine.preload(p5)
    BasicZombie.preload(p5)
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

      this.zombiesSystem.addZombieToRow(
        new BasicZombie(p5.width + 10, y, lawnRow, this.zombiesSystem.onZombieEnd),
        lawnRow
      )
      this.spawningTime = p5.millis() + this.SPAWNING_TIMER_CONST
    }

    this.player.update(p5)
    this.versusSystem.update(p5)
    this.lawnSystem.update(p5)
    this.zombiesSystem.update(p5)
    this.peasSystem.update(p5)
    this.sunSystem.update(p5)
    this.sunCounter.update(p5)
    this.seedsBarSystem.update(p5)

    if (SHOW_FPS) this.updateFrameRate(p5)
  }

  draw(p5: P5) {
    p5.imageMode(p5.CORNER)
    p5.image(Scene.bgImage, 0, 0)

    this.sunCounter.draw(p5)
    this.seedsBarSystem.draw(p5)
    this.lawnSystem.draw(p5)
    this.peasSystem.draw(p5)
    this.sunSystem.draw(p5)
    this.player.draw(p5)

    if (SHOW_FPS) this.drawFps(p5)

    // if (DEBUG) this.debug(p5)
  }

  drawFps(p5: P5) {
    p5.strokeWeight(1)
    p5.stroke('black')
    p5.fill('black')
    p5.textAlign(p5.LEFT)
    p5.textSize(8)
    p5.text(`FPS: ${this.frameRate}`, 5, 10)
  }

  debug(p5: P5) {
    p5.stroke('red')
    p5.strokeWeight(1)
    p5.noFill()
    p5.rectMode(p5.CORNER)

    p5.rect(this.lawnSystem.x, this.lawnSystem.y, this.lawnSystem.w, this.lawnSystem.h)

    for (let i = 1; i < this.lawnSystem.h / TILE_HEIGHT; i++) {
      p5.line(
        this.lawnSystem.x,
        TILE_HEIGHT * i + this.lawnSystem.y,
        this.lawnSystem.x + this.lawnSystem.w,
        TILE_HEIGHT * i + this.lawnSystem.y
      )
    }

    for (let i = 1; i < this.lawnSystem.w / TILE_WIDTH; i++) {
      p5.line(
        this.lawnSystem.x + TILE_WIDTH * i,
        this.lawnSystem.y,
        this.lawnSystem.x + TILE_WIDTH * i,
        this.lawnSystem.y + this.lawnSystem.h
      )
    }
  }
}

export default Scene
