import P5, { Image } from 'p5'
import {
  SUN_COUNTER_HUD_X,
  SUN_COUNTER_HUD_Y,
  SUN_HUD_SIZE,
  SUN_NUMBER_HEIGHT,
  SUN_NUMBER_HUD_MIDDLE_X,
  SUN_NUMBER_HUD_Y,
  SUN_NUMBER_ORIGIN_X,
  SUN_NUMBER_ORIGIN_Y,
  SUN_NUMBER_WIDTH,
  SUN_ORIGIN_X,
  SUN_ORIGIN_Y
} from '../constants/hud'
import SunSystem from '../core/systems/SunSystem'
import hudImage from '/sprites/hud.png'

class SunCounter {
  static spritesheet: Image

  x: number
  y: number
  sunSystem: SunSystem
  sunDigits: number[] = []

  constructor(x: number, y: number, sunSystem: SunSystem) {
    this.x = x
    this.y = y
    this.sunSystem = sunSystem
  }

  static preload(p5: P5) {
    SunCounter.spritesheet = p5.loadImage(hudImage)
  }

  updateSunDigits(p5: P5) {
    this.sunDigits = []

    if (this.sunSystem.collectedSun > 0) {
      let sun = this.sunSystem.collectedSun

      while (sun > 0) {
        this.sunDigits.unshift(sun % 10)
        sun = p5.floor(sun / 10)
      }
    } else {
      this.sunDigits.push(0)
    }
  }

  drawSunDigits(p5: P5) {
    const sunDigitsWidth = SUN_NUMBER_WIDTH * this.sunDigits.length

    for (let i = 0; i < this.sunDigits.length; i++) {
      const sunDigit = this.sunDigits[i]

      p5.image(
        SunCounter.spritesheet,
        SUN_NUMBER_HUD_MIDDLE_X - sunDigitsWidth / 2 + SUN_NUMBER_WIDTH * i,
        SUN_NUMBER_HUD_Y,
        SUN_NUMBER_WIDTH,
        SUN_NUMBER_HEIGHT,
        SUN_NUMBER_ORIGIN_X + SUN_NUMBER_WIDTH * sunDigit + sunDigit,
        SUN_NUMBER_ORIGIN_Y,
        SUN_NUMBER_WIDTH,
        SUN_NUMBER_HEIGHT
      )
    }
  }

  update(p5: P5) {
    this.updateSunDigits(p5)
  }

  draw(p5: P5) {
    p5.imageMode(p5.CORNER)
    p5.image(
      SunCounter.spritesheet,
      SUN_COUNTER_HUD_X,
      SUN_COUNTER_HUD_Y,
      SUN_HUD_SIZE,
      SUN_HUD_SIZE,
      SUN_ORIGIN_X,
      SUN_ORIGIN_Y,
      SUN_HUD_SIZE,
      SUN_HUD_SIZE
    )
    this.drawSunDigits(p5)
  }
}

export default SunCounter
