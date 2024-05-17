import P5 from 'p5'
import { EntityState, HandleState } from '../../../types'
import { DEBUG } from '../../constants/game'
import {
  DRAW_WALLNUT_COORDS_POINT,
  DRAW_WALLNUT_HITBOX,
  DRAW_WALLNUT_SPRITE_BORDERS,
  SHOW_HP,
  WALLNUT_HEIGHT,
  WALLNUT_HITBOX_HEIGHT,
  WALLNUT_HITBOX_WIDTH,
  WALLNUT_HP,
  WALLNUT_WIDTH,
  WallnutAnimation,
  WallnutFrame,
  WallnutKeyframe,
  WallnutState
} from '../../constants/plants/wallnut'
import { drawHp } from '../../utils'
import Plant from './Plant'
import wallnutSprites from '/sprites/plants/wallnut.png'

class Wallnut extends Plant {
  hp: number = WALLNUT_HP
  remainingHp: number = WALLNUT_HP
  lawnRow: number
  states: EntityState
  currentState: HandleState

  constructor(x: number, y: number, lawnRow: number) {
    super(x, y, {
      x: x - WALLNUT_HITBOX_WIDTH / 2,
      y: y - WALLNUT_HITBOX_HEIGHT / 2,
      w: WALLNUT_HITBOX_WIDTH,
      h: WALLNUT_HITBOX_HEIGHT,
      isActive: true
    })

    this.lawnRow = lawnRow

    this.states = {
      [WallnutState.FULL]: {
        type: WallnutState.FULL,
        animation: WallnutAnimation[WallnutState.FULL],
        draw: this.handleDrawState,
        update: this.handleUpdateState
      },
      [WallnutState.DAMAGED]: {
        type: WallnutState.DAMAGED,
        animation: WallnutAnimation[WallnutState.DAMAGED],
        draw: this.handleDrawState,
        update: this.handleUpdateState
      },
      [WallnutState.DYING]: {
        type: WallnutState.DYING,
        animation: WallnutAnimation[WallnutState.DYING],
        draw: this.handleDrawState,
        update: this.handleUpdateState
      }
    }
    this.currentState = this.states[WallnutState.FULL]
  }

  static preload(p5: P5) {
    this.spritesheet = p5.loadImage(wallnutSprites)
  }

  static getPlaceholder() {
    const { originX, originY, w, h } = WallnutKeyframe[WallnutFrame.FULL_1]

    return Wallnut.spritesheet.get(originX, originY, w, h)
  }

  setIsZombieAhead(isZombieAhead: boolean) {
    this.isZombieAhead = isZombieAhead
  }

  handleUpdateState = (p5: P5) => {
    if (p5.millis() < this.animationTimer) return

    this.animationFrame++
    if (this.animationFrame >= this.currentState.animation.length) this.animationFrame = 0

    this.animationTimer = p5.millis() + this.currentState.animation[this.animationFrame].timer * p5.deltaTime
  }

  updateHpStatus() {
    if (this.remainingHp >= this.hp) {
      this.currentState = this.states[WallnutState.FULL]
    } else if (this.remainingHp > this.hp * (1 / 3) && this.remainingHp <= this.hp * (2 / 3)) {
      this.currentState = this.states[WallnutState.DAMAGED]
    } else if (this.remainingHp <= this.hp * (1 / 3)) {
      this.currentState = this.states[WallnutState.DYING]
    }
  }

  update(p5: P5) {
    this.updateHpStatus()
    this.currentState.update(p5)
  }

  handleDrawState = (p5: P5) => {
    const { originX, originY, w, h } = this.currentState.animation[this.animationFrame]

    p5.imageMode(p5.CENTER)
    p5.image(Wallnut.spritesheet, this.position.x, this.position.y, w, h, originX, originY, w, h)
  }

  draw(p5: P5) {
    this.currentState.draw(p5)

    if (DEBUG) this.debug(p5)
  }

  debug(p5: P5) {
    if (DRAW_WALLNUT_HITBOX && this.hitbox.isActive) this.drawHitbox(p5)

    if (DRAW_WALLNUT_SPRITE_BORDERS) {
      this.drawSpriteBorders(p5, this.position.x, this.position.y, WALLNUT_WIDTH, WALLNUT_HEIGHT)
    }

    if (DRAW_WALLNUT_COORDS_POINT) this.drawCoordsPoint(p5)

    if (SHOW_HP && this.remainingHp > 0) drawHp(p5, this.position.x, this.position.y, this.hp, this.remainingHp)
  }
}

export default Wallnut
