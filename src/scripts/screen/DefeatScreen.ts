import P5, { Image } from 'p5'
import { DEFEAT_ORIGIN_X, DEFEAT_ORIGIN_Y, DEFEAT_SIZE } from '../constants/hud'
import GameState from '../core/GameState'
import Scene from '../core/Scene'

class DefeatScreen {
  static spritesheet: Image

  gameState: GameState

  constructor(gameState: GameState) {
    this.gameState = gameState
  }

  static preload() {
    DefeatScreen.spritesheet = Scene.hudSpritesheet
  }

  draw(p5: P5) {
    if (!this.gameState.gameEnded) return

    p5.rectMode(p5.CORNER)
    p5.fill(0, 180)
    p5.rect(0, 0, p5.width, p5.height)

    p5.imageMode(p5.CENTER)
    p5.image(
      DefeatScreen.spritesheet,
      p5.width / 2,
      p5.height / 2,
      DEFEAT_SIZE,
      DEFEAT_SIZE,
      DEFEAT_ORIGIN_X,
      DEFEAT_ORIGIN_Y,
      DEFEAT_SIZE,
      DEFEAT_SIZE
    )
  }
}

export default DefeatScreen
