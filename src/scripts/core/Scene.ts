import P5, { Image } from 'p5'
import {
  DEBUG,
  FRAME_RATE_FRECUENCY,
  LAWN_HEIGHT,
  LAWN_OFFSET_X,
  LAWN_OFFSET_Y,
  LAWN_WIDTH,
  SHOW_FPS,
  SHOW_GRID,
  TILE_HEIGHT,
  TILE_WIDTH
} from '../constants/game'
import {
  PROGRESS_BAR_X,
  PROGRESS_BAR_Y,
  SEEDS_BAR_X,
  SEEDS_BAR_Y,
  SUN_COUNTER_HUD_X,
  SUN_COUNTER_HUD_Y
} from '../constants/hud'
import { Hordes } from '../constants/levels'
import { PlantId } from '../constants/plants/plants'
import Peashooter from '../entities/plants/Peashooter'
import PotatoMine from '../entities/plants/PotatoMine'
import Repeater from '../entities/plants/Repeater'
import Sunflower from '../entities/plants/Sunflower'
import Wallnut from '../entities/plants/Wallnut'
import Pea from '../entities/projectiles/Pea'
import BasicZombie from '../entities/zombies/BasicZombie'
import BucketheadZombie from '../entities/zombies/BucketheadZombie'
import ConeheadZombie from '../entities/zombies/ConeheadZombie'
import FlagZombie from '../entities/zombies/FlagZombie'
import ZombieYeti from '../entities/zombies/ZombieYeti'
import DefeatScreen from '../screen/DefeatScreen'
import ProgressBar from '../screen/ProgressBar'
import SunCounter from '../screen/SunCounter'
import GameState from './GameState'
import Player from './Player'
import HordeSystem from './systems/HordeSystem'
import LawnSystem from './systems/LawnSystem'
import PeasSystem from './systems/PeasSystem'
import SeedsBarSystem from './systems/SeedsBarSystem'
import SunSystem from './systems/SunSystem'
import VersusSystem from './systems/VersusSystem'
import ZombiesSystem from './systems/ZombiesSystem'
import bgImage from '/sprites/bg.png'
import hudSpritesheet from '/sprites/hud.png'

class Scene {
  static bgImage: Image
  static hudSpritesheet: Image

  framesTimer: number = 0
  frameRate: number = 0

  gameState: GameState

  defeatScreen: DefeatScreen
  sunCounter: SunCounter
  progressBar: ProgressBar

  hordeSystem: HordeSystem
  lawnSystem: LawnSystem
  peasSystem: PeasSystem
  zombiesSystem: ZombiesSystem
  versusSystem: VersusSystem
  sunSystem: SunSystem
  seedsBarSystem: SeedsBarSystem

  player: Player
  SPAWNING_TIMER_CONST: number = 5000
  spawningTime: number = 0

  constructor(p5: P5) {
    this.progressBar = new ProgressBar(PROGRESS_BAR_X, PROGRESS_BAR_Y, Hordes)

    this.zombiesSystem = new ZombiesSystem()
    this.gameState = new GameState(p5, this.zombiesSystem, this.restart)
    this.defeatScreen = new DefeatScreen(this.gameState)
    this.hordeSystem = new HordeSystem(p5, this.zombiesSystem, this.progressBar, Hordes)
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

    this.player = new Player(p5, this.gameState, this.lawnSystem, this.peasSystem, this.sunSystem, this.seedsBarSystem)

    if (!DEBUG) return

    this.frameRate = this.getFrameRate(p5)
    this.framesTimer = p5.millis() + FRAME_RATE_FRECUENCY
  }

  static preload(p5: P5) {
    Scene.bgImage = p5.loadImage(bgImage)
    Scene.hudSpritesheet = p5.loadImage(hudSpritesheet)

    SeedsBarSystem.preload(p5)
    Pea.preload(p5)
    DefeatScreen.preload()
    SunCounter.preload()
    ProgressBar.preload()
    Peashooter.preload(p5)
    Wallnut.preload(p5)
    Sunflower.preload(p5)
    PotatoMine.preload(p5)
    Repeater.preload(p5)
    BasicZombie.preload(p5)
    ConeheadZombie.preload(p5)
    BucketheadZombie.preload(p5)
    ZombieYeti.preload(p5)
    FlagZombie.preload(p5)
  }

  restart = (p5: P5) => {
    this.progressBar.restart()
    this.hordeSystem.restart(p5)
    this.lawnSystem.restart()
    this.peasSystem.restart()
    this.zombiesSystem.restart()
    this.sunSystem.restart(p5)
    this.seedsBarSystem.restart()
  }

  getFrameRate = (p5: P5) => p5.round(p5.frameRate())

  updateFrameRate(p5: P5) {
    if (p5.millis() < this.framesTimer) return

    this.frameRate = this.getFrameRate(p5)
    this.framesTimer = p5.millis() + FRAME_RATE_FRECUENCY
  }

  update(p5: P5) {
    this.player.update(p5)

    if (this.gameState.gameEnded) return

    this.gameState.update(p5)
    this.versusSystem.update(p5)
    this.lawnSystem.update(p5)
    this.hordeSystem.update(p5)
    this.progressBar.update(p5)
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
    this.progressBar.draw(p5)
    this.hordeSystem.draw(p5)
    this.peasSystem.draw(p5)
    this.sunSystem.draw(p5)
    this.player.draw(p5)
    this.defeatScreen.draw(p5)

    if (SHOW_FPS) this.drawFps(p5)

    if (DEBUG) this.debug(p5)
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
    if (!SHOW_GRID) return

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
