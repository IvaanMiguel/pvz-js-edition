import P5 from 'p5'
import { EntityState, HandleState } from '../../../types'
import { DEBUG } from '../../constants/game'
import {
  DRAW_PEA_COORDS_POINT,
  DRAW_PEA_HITBOX,
  DRAW_PEA_SPRITE_BORDERS,
  PEA_DMG,
  PEA_SIZE,
  PEA_SPEED,
  PeaAnimation,
  PeaFrame,
  PeaKeyframe,
  PeaState
} from '../../constants/peashooter'
import Entity from '../Entity'
import Peashooter from './Peashooter'

class Pea extends Entity {
  states: EntityState
  currentState: HandleState
  dmg: number = PEA_DMG
  lawnRow: number
  onPeaEnd: (pea: Pea) => void

  constructor(x: number, y: number, lawnRow: number, onPeaEnd: (pea: Pea) => void) {
    super(x, y, { x, y, w: 1, h: 1, isActive: true })

    Pea.spritesheet = Peashooter.spritesheet

    this.lawnRow = lawnRow
    this.onPeaEnd = onPeaEnd

    this.states = {
      [PeaState.FLYING]: {
        type: PeaState.FLYING,
        draw: this.handleFlyingDraw,
        update: this.handleFlyingUpdate
      },
      [PeaState.ON_HIT]: {
        type: PeaState.ON_HIT,
        draw: this.handleOnHitDraw,
        update: this.handleOnHitUpdate
      }
    }

    this.currentState = this.states[PeaState.FLYING]
  }

  handleFlyingDraw = (p5: P5) => {
    const { originX, originY, w, h } = PeaKeyframe[PeaFrame.FLYING]

    p5.imageMode(p5.CENTER)
    p5.image(Peashooter.spritesheet, this.position.x, this.position.y, w, h, originX, originY, w, h)
  }

  handleFlyingUpdate = (p5: P5) => {
    const xVelocity = PEA_SPEED * (p5.deltaTime / 1000)
    this.position.add(xVelocity, 0)
    this.hitbox.position.add(xVelocity, 0)
  }

  handleOnHitDraw = (p5: P5) => {
    const { originX, originY, w, h } = PeaAnimation.OnHit[this.animationFrame]

    p5.imageMode(p5.CENTER)
    p5.image(Pea.spritesheet, this.position.x, this.position.y, w, h, originX, originY, w, h)
  }

  handleOnHitUpdate = (p5: P5) => {
    if (p5.millis() < this.animationTimer) return

    this.animationFrame++
    if (this.animationFrame >= PeaAnimation.OnHit.length) {
      this.animationFrame = 0
      this.onPeaEnd(this)
    }

    this.animationTimer = p5.millis() + PeaAnimation.OnHit[this.animationFrame].timer * p5.deltaTime
  }

  changeState(p5: P5, newState: string) {
    this.currentState = this.states[newState]
    this.animationFrame = 0
    this.animationTimer = p5.millis() + PeaAnimation.OnHit[this.animationFrame].timer * p5.deltaTime
  }

  update(p5: P5) {
    this.currentState.update(p5)
  }

  draw(p5: P5) {
    this.currentState.draw(p5)

    if (!DEBUG) return

    this.debug(p5)
  }

  debug(p5: P5) {
    p5.strokeWeight(1)

    if (DRAW_PEA_SPRITE_BORDERS) this.drawSpriteBorders(p5, this.position.x, this.position.y, PEA_SIZE, PEA_SIZE)

    if (DRAW_PEA_HITBOX) this.drawHitbox(p5)

    if (DRAW_PEA_COORDS_POINT) this.drawCoordsPoint(p5)
  }
}

export default Pea
