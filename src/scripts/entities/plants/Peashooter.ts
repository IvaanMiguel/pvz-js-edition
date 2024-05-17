import P5 from 'p5'
import { EntityState, HandleState } from '../../../types'
import { DEBUG } from '../../constants/game'
import {
  DRAW_PEASHOOTER_COORDS_POINT,
  DRAW_PEASHOOTER_HITBOX,
  DRAW_PEASHOOTER_SPRITE_BORDERS,
  PEASHOOTER_FIRE_RATE,
  PEASHOOTER_HEIGHT,
  PEASHOOTER_HITBOX_HEIGHT,
  PEASHOOTER_HITBOX_WIDTH,
  PEASHOOTER_WIDTH,
  PeashooterAnimation,
  PeashooterState,
  SHOW_PEASHOOTER_HP
} from '../../constants/plants/peashooter'
import { drawHp } from '../../utils'
import Plant from './Plant'
import peashooterSprites from '/sprites/plants/peashooter.png'

class Peashooter extends Plant {
  firingTimer: number
  currentState: HandleState
  states: EntityState
  lawnRow: number
  addPea: (x: number, y: number, lawnRow: number) => void

  constructor(p5: P5, x: number, y: number, lawnRow: number, addPea: (x: number, y: number, lawnRow: number) => void) {
    super(x, y, {
      x: x - PEASHOOTER_HITBOX_WIDTH / 2,
      y: y - PEASHOOTER_HITBOX_HEIGHT / 2,
      w: PEASHOOTER_HITBOX_WIDTH,
      h: PEASHOOTER_HITBOX_HEIGHT,
      isActive: true
    })

    this.lawnRow = lawnRow
    this.addPea = addPea

    this.isZombieAhead = false
    this.animationTimer = p5.millis() + PeashooterAnimation[PeashooterState.IDLE][0].timer * p5.deltaTime
    this.firingTimer = p5.millis() + PEASHOOTER_FIRE_RATE / 4

    this.states = {
      [PeashooterState.IDLE]: {
        type: PeashooterState.IDLE,
        animation: PeashooterAnimation[PeashooterState.IDLE],
        draw: this.handleDrawState,
        update: this.handleUpdateIdleState
      },
      [PeashooterState.SHOOTING]: {
        type: PeashooterState.SHOOTING,
        animation: PeashooterAnimation[PeashooterState.SHOOTING],
        draw: this.handleDrawState,
        update: this.handleUpdateShootingState
      }
    }

    this.currentState = this.states[PeashooterState.IDLE]
  }

  static preload(p5: P5) {
    Peashooter.spritesheet = p5.loadImage(peashooterSprites)
  }

  static getPlaceholder() {
    return Peashooter.spritesheet.get(0, 0, PEASHOOTER_WIDTH, PEASHOOTER_HEIGHT)
  }

  setIsZombieAhead(isZombieAhead: boolean) {
    this.isZombieAhead = isZombieAhead
  }

  changeState(p5: P5, newState: string, initialAnimationFrame: number = 0) {
    this.currentState = this.states[newState]
    this.animationFrame = initialAnimationFrame
    this.animationTimer = p5.millis() + this.currentState.animation[this.animationFrame].timer * p5.deltaTime
  }

  updateFiringPea(p5: P5) {
    if (!this.isZombieAhead || this.currentState.type === PeashooterState.SHOOTING || p5.millis() < this.firingTimer) {
      return
    }

    this.changeState(p5, PeashooterState.SHOOTING)
  }

  handleUpdateIdleState = (p5: P5) => {
    if (p5.millis() < this.animationTimer) return

    this.animationFrame++
    if (this.animationFrame >= this.currentState.animation.length) this.animationFrame = 0

    this.animationTimer = p5.millis() + this.currentState.animation[this.animationFrame].timer * p5.deltaTime
  }

  handleUpdateShootingState = (p5: P5) => {
    if (p5.millis() < this.animationTimer) return

    this.animationFrame++
    if (this.animationFrame >= this.currentState.animation.length) {
      const initialFrame = p5.floor(p5.random(0, PeashooterAnimation[PeashooterState.IDLE].length))

      this.changeState(p5, PeashooterState.IDLE, initialFrame)
      this.firingTimer = p5.millis() + PEASHOOTER_FIRE_RATE

      return
    }

    if (this.animationFrame === 2) this.addPea(this.position.x + 10, this.position.y - 8, this.lawnRow)

    this.animationTimer = p5.millis() + this.currentState.animation[this.animationFrame].timer * p5.deltaTime
  }

  update(p5: P5) {
    this.updateFiringPea(p5)
    this.currentState.update(p5)
  }

  handleDrawState = (p5: P5) => {
    const { originX, originY, w, h } = this.currentState.animation[this.animationFrame]

    p5.imageMode(p5.CENTER)
    p5.image(Peashooter.spritesheet, this.position.x, this.position.y, w, h, originX, originY, w, h)
  }

  draw(p5: P5) {
    this.currentState.draw(p5)

    if (!DEBUG) return

    this.debug(p5)
  }

  debug(p5: P5) {
    if (DRAW_PEASHOOTER_HITBOX && this.hitbox.isActive) this.drawHitbox(p5)

    if (DRAW_PEASHOOTER_SPRITE_BORDERS) {
      this.drawSpriteBorders(p5, this.position.x, this.position.y, PEASHOOTER_WIDTH, PEASHOOTER_HEIGHT)
    }

    if (DRAW_PEASHOOTER_COORDS_POINT) this.drawCoordsPoint(p5)

    if (SHOW_PEASHOOTER_HP && this.remainingHp > 0)
      drawHp(p5, this.position.x, this.position.y, this.hp, this.remainingHp)
  }
}

export default Peashooter
