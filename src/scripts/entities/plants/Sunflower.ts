import P5 from 'p5'
import { EntityState, HandleState } from '../../../types'
import { DEBUG } from '../../constants/game'
import {
  DRAW_SUNFLOWER_COORDS_POINT,
  DRAW_SUNFLOWER_HITBOX,
  DRAW_SUNFLOWER_SPRITE_BORDERS,
  SHOW_HP,
  SUNFLOWER_HEIGHT,
  SUNFLOWER_HITBOX_HEIGHT,
  SUNFLOWER_HITBOX_WIDTH,
  SUNFLOWER_SPAWNING_SUN_TIMER,
  SUNFLOWER_WIDTH,
  SunflowerAnimation,
  SunflowerState
} from '../../constants/sunflower'
import { drawHp } from '../../utils'
import Plant from './Plant'
import sunflowerSprites from '/sprites/plants/sunflower.png'

class Sunflower extends Plant {
  states: EntityState
  currentState: HandleState
  spawningSunTimer: number
  addSun: (x: number, y: number, stoppingY: number) => void

  constructor(p5: P5, x: number, y: number, addSun: (x: number, y: number, stoppingY: number) => void) {
    super(x, y, {
      x: x - SUNFLOWER_HITBOX_WIDTH / 2,
      y: y - SUNFLOWER_HITBOX_HEIGHT / 2,
      w: SUNFLOWER_HITBOX_WIDTH,
      h: SUNFLOWER_HITBOX_HEIGHT,
      isActive: true
    })

    this.addSun = addSun
    this.spawningSunTimer = p5.millis() + SUNFLOWER_SPAWNING_SUN_TIMER / 8

    this.states = {
      [SunflowerState.IDLE]: {
        type: SunflowerState.IDLE,
        update: this.handleUpdateState,
        draw: this.handleDrawState
      },
      [SunflowerState.SHINING]: {
        type: SunflowerState.SHINING,
        update: this.handleUpdateState,
        draw: this.handleDrawState
      }
    }

    this.currentState = this.states[SunflowerState.IDLE]
  }

  static preload(p5: P5) {
    Sunflower.spritesheet = p5.loadImage(sunflowerSprites)
  }

  static getPlaceholder() {
    const { originX, originY, w, h } = SunflowerAnimation[SunflowerState.IDLE][0]

    return Sunflower.spritesheet.get(originX, originY, w, h)
  }

  setIsZombieAhead(isZombieAhead: boolean) {
    this.isZombieAhead = isZombieAhead
  }

  changeState(newState: string) {
    this.currentState = this.states[newState]
  }

  handleUpdateState = (p5: P5) => {
    if (p5.millis() < this.animationTimer) return

    this.animationFrame++
    if (this.animationFrame >= SunflowerAnimation[this.currentState.type].length) this.animationFrame = 0

    this.animationTimer =
      p5.millis() + SunflowerAnimation[this.currentState.type][this.animationFrame].timer * p5.deltaTime
  }

  handleDrawState = (p5: P5) => {
    p5.imageMode(p5.CENTER)

    const { originX, originY, w, h } = SunflowerAnimation[this.currentState.type][this.animationFrame]

    p5.image(Sunflower.spritesheet, this.position.x, this.position.y, w, h, originX, originY, w, h)
  }

  handleOnShining(p5: P5) {
    if (p5.millis() >= this.spawningSunTimer - 1000) this.changeState(SunflowerState.SHINING)
  }

  updateSpawningSunTimer(p5: P5) {
    if (p5.millis() < this.spawningSunTimer) return

    this.changeState(SunflowerState.IDLE)
    this.spawningSunTimer = p5.millis() + SUNFLOWER_SPAWNING_SUN_TIMER

    const sunX = p5.random(this.position.x - SUNFLOWER_WIDTH / 2, this.position.x + SUNFLOWER_WIDTH / 2)
    this.addSun(sunX, this.position.y, this.position.y + SUNFLOWER_HEIGHT / 2)
  }

  update(p5: P5) {
    this.updateSpawningSunTimer(p5)
    this.handleOnShining(p5)
    this.currentState.update(p5)
  }

  draw(p5: P5) {
    this.currentState.draw(p5)

    if (DEBUG) this.debug(p5)
  }

  debug(p5: P5) {
    if (DRAW_SUNFLOWER_HITBOX && this.hitbox.isActive) this.drawHitbox(p5)

    if (DRAW_SUNFLOWER_SPRITE_BORDERS) {
      this.drawSpriteBorders(p5, this.position.x, this.position.y, SUNFLOWER_WIDTH, SUNFLOWER_HEIGHT)
    }

    if (DRAW_SUNFLOWER_COORDS_POINT) this.drawCoordsPoint(p5)

    if (SHOW_HP && this.remainingHp > 0) drawHp(p5, this.position.x, this.position.y, this.hp, this.remainingHp)
  }
}

export default Sunflower
