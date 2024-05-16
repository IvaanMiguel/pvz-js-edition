import P5 from 'p5'
import { EntityState, HandleState } from '../../../types'
import { DEBUG } from '../../constants/game'
import {
  DRAW_REPEATER_COORDS_POINT,
  DRAW_REPEATER_HITBOX,
  DRAW_REPEATER_SPRITE_BORDERS,
  REPEATER_FIRE_RATE,
  REPEATER_HEIGHT,
  REPEATER_HITBOX_HEIGHT,
  REPEATER_HITBOX_WIDTH,
  REPEATER_WIDTH,
  RepeaterAnimation,
  RepeaterFrame,
  RepeaterKeyframe,
  RepeaterState,
  SHOW_HP
} from '../../constants/plants/repeater'
import { drawHp } from '../../utils'
import Plant from './Plant'
import repeaterSprites from '/sprites/plants/repeater.png'

class Repeater extends Plant {
  states: EntityState
  currentState: HandleState
  firingTimer: number
  lawnRow: number
  firingPeas: number = 2
  addPea: (x: number, y: number, lawnRow: number) => void

  constructor(p5: P5, x: number, y: number, lawnRow: number, addPea: (x: number, y: number, lawnRow: number) => void) {
    super(x, y, {
      x: x - REPEATER_HITBOX_WIDTH / 2,
      y: y - REPEATER_HITBOX_HEIGHT / 2,
      w: REPEATER_HITBOX_WIDTH,
      h: REPEATER_HITBOX_HEIGHT,
      isActive: true
    })

    this.lawnRow = lawnRow
    this.addPea = addPea

    this.animationTimer = p5.millis() + RepeaterAnimation[RepeaterState.IDLE][0].timer * p5.deltaTime
    this.firingTimer = p5.millis() + REPEATER_FIRE_RATE / 4

    this.states = {
      [RepeaterState.IDLE]: {
        type: RepeaterState.IDLE,
        update: this.handleUpdateIdleState,
        draw: this.handleDrawState
      },
      [RepeaterState.SHOOTING]: {
        type: RepeaterState.SHOOTING,
        update: this.handleUpdateShootingState,
        draw: this.handleDrawState
      }
    }

    this.currentState = this.states[RepeaterState.IDLE]
  }

  static preload(p5: P5) {
    Repeater.spritesheet = p5.loadImage(repeaterSprites)
  }

  static getPlaceholder() {
    const { originX, originY, w, h } = RepeaterKeyframe[RepeaterFrame.IDLE_1]

    return Repeater.spritesheet.get(originX, originY, w, h)
  }

  setIsZombieAhead(isZombieAhead: boolean) {
    this.isZombieAhead = isZombieAhead
  }

  changeState(p5: P5, newState: string, initialAnimationFrame: number = 0) {
    this.currentState = this.states[newState]
    this.animationFrame = initialAnimationFrame
    this.animationTimer =
      p5.millis() + RepeaterAnimation[this.currentState.type][this.animationFrame].timer * p5.deltaTime
  }

  handleUpdateShootingState = (p5: P5) => {
    if (p5.millis() < this.animationTimer) return

    this.animationFrame++
    if (this.animationFrame >= RepeaterAnimation[this.currentState.type].length) {
      const initialFrame = p5.floor(p5.random(0, RepeaterAnimation[RepeaterState.IDLE].length))

      this.changeState(p5, RepeaterState.IDLE, initialFrame)
      this.firingTimer = p5.millis() + REPEATER_FIRE_RATE
      return
    }

    if (this.animationFrame % 2 !== 0) this.addPea(this.position.x + 10, this.position.y - 8, this.lawnRow)

    this.animationTimer =
      p5.millis() + RepeaterAnimation[this.currentState.type][this.animationFrame].timer * p5.deltaTime
  }

  updateFiringPea(p5: P5) {
    if (!this.isZombieAhead || p5.millis() < this.firingTimer || this.currentState.type === RepeaterState.SHOOTING) {
      return
    }

    this.changeState(p5, RepeaterState.SHOOTING)
  }

  handleUpdateIdleState = (p5: P5) => {
    if (p5.millis() < this.animationTimer) return

    this.animationFrame++
    if (this.animationFrame >= RepeaterAnimation[this.currentState.type].length) this.animationFrame = 0

    this.animationTimer =
      p5.millis() + RepeaterAnimation[this.currentState.type][this.animationFrame].timer * p5.deltaTime
  }

  update(p5: P5) {
    this.updateFiringPea(p5)
    this.currentState.update(p5)
  }

  handleDrawState = (p5: P5) => {
    const { originX, originY, w, h } = RepeaterAnimation[this.currentState.type][this.animationFrame]

    p5.imageMode(p5.CENTER)
    p5.image(Repeater.spritesheet, this.position.x, this.position.y, w, h, originX, originY, w, h)
  }

  draw(p5: P5) {
    this.currentState.draw(p5)

    if (DEBUG) this.debug(p5)
  }

  debug(p5: P5) {
    if (DRAW_REPEATER_HITBOX && this.hitbox.isActive) this.drawHitbox(p5)

    if (DRAW_REPEATER_SPRITE_BORDERS) {
      this.drawSpriteBorders(p5, this.position.x, this.position.y, REPEATER_WIDTH, REPEATER_HEIGHT)
    }

    if (DRAW_REPEATER_COORDS_POINT) this.drawCoordsPoint(p5)

    if (SHOW_HP && this.remainingHp > 0) drawHp(p5, this.position.x, this.position.y, this.hp, this.remainingHp)
  }
}

export default Repeater
