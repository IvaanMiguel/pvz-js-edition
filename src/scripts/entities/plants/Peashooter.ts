import P5 from 'p5'
import { EntityState, HandleState } from '../../../types'
import { DEBUG } from '../../constants/game'
import {
  DRAW_PEASHOOTER_COORDS_POINT,
  DRAW_PEASHOOTER_HITBOX,
  DRAW_PEASHOOTER_SPRITE_BORDERS,
  FIRE_RATE,
  FramesIndex,
  PEASHOOTER_HEIGHT,
  PEASHOOTER_HITBOX_HEIGHT,
  PEASHOOTER_HITBOX_WIDTH,
  PEASHOOTER_TIMER,
  PEASHOOTER_WIDTH,
  PeashooterState,
  SHOW_HP,
  TransformFrame
} from '../../constants/peashooter'
import { drawHp } from '../../utils'
import Plant from './Plant'
import peashooterSprites from '/sprites/peashooter.png'

class Peashooter extends Plant {
  firingTimer: number
  currentState: HandleState
  states: EntityState
  lawnRow: number
  addPea: (x: number, y: number, lawnRow: number) => void

  // Solo para usarse en el método debug().
  dx: number = 0

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
    this.animationTimer = p5.millis() + PEASHOOTER_TIMER * p5.deltaTime
    this.firingTimer = p5.millis() + FIRE_RATE / 4

    this.states = {
      [PeashooterState.IDLE]: {
        type: PeashooterState.IDLE,
        draw: this.handleIdleDraw,
        update: this.handleIdleUpdate
      },
      [PeashooterState.SHOOTING]: {
        type: PeashooterState.SHOOTING,
        draw: this.handleShootingDraw,
        update: this.handleShootingUpdate
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

  handleIdleDraw = (p5: P5) => {
    this.dx = this.position.x + (TransformFrame[this.animationFrame]?.offsetX || 0)
    const sx = 26 * FramesIndex[this.currentState.type][this.animationFrame]

    p5.imageMode(p5.CENTER)
    p5.image(
      Peashooter.spritesheet,
      this.dx,
      this.position.y,
      PEASHOOTER_WIDTH,
      PEASHOOTER_HEIGHT,
      sx,
      0,
      PEASHOOTER_WIDTH,
      PEASHOOTER_HEIGHT
    )
  }

  handleIdleUpdate = () => {
    this.animationFrame = 0
  }

  handleShootingDraw = (p5: P5) => {
    p5.imageMode(p5.CENTER)
    p5.image(
      Peashooter.spritesheet,
      this.position.x,
      this.position.y,
      PEASHOOTER_WIDTH,
      PEASHOOTER_HEIGHT,
      26 * FramesIndex[this.currentState.type][this.animationFrame],
      30,
      PEASHOOTER_WIDTH,
      PEASHOOTER_HEIGHT
    )
  }

  handleShootingUpdate = (p5: P5) => {
    const initialFrame = p5.floor(p5.random(0, FramesIndex[PeashooterState.IDLE].length))

    this.changeState(p5, PeashooterState.IDLE, initialFrame)
  }

  changeState(p5: P5, newState: string, initialAnimationFrame: number = 0) {
    this.currentState = this.states[newState]
    this.animationFrame = initialAnimationFrame
    this.animationTimer = p5.millis() + PEASHOOTER_TIMER * p5.deltaTime
  }

  updateFiringPea(p5: P5) {
    if (p5.millis() < this.firingTimer) return

    this.changeState(p5, PeashooterState.SHOOTING)
    this.firingTimer = p5.millis() + FIRE_RATE
    this.addPea(this.position.x + 10, this.position.y - 8, this.lawnRow)
  }

  updateAnimation(p5: P5) {
    if (p5.millis() < this.animationTimer) return

    this.animationFrame++
    if (this.animationFrame >= FramesIndex[this.currentState.type].length) this.currentState.update(p5)

    this.animationTimer = p5.millis() + PEASHOOTER_TIMER * p5.deltaTime
  }

  update(p5: P5) {
    if (this.isZombieAhead) this.updateFiringPea(p5)

    this.updateAnimation(p5)
  }

  draw(p5: P5) {
    this.currentState.draw(p5)

    if (!DEBUG) return

    this.debug(p5)
  }

  debug(p5: P5) {
    if (DRAW_PEASHOOTER_HITBOX && this.hitbox.isActive) this.drawHitbox(p5)

    if (DRAW_PEASHOOTER_SPRITE_BORDERS) {
      this.drawSpriteBorders(p5, this.dx, this.position.y, PEASHOOTER_WIDTH, PEASHOOTER_HEIGHT)
    }

    if (DRAW_PEASHOOTER_COORDS_POINT) this.drawCoordsPoint(p5)

    if (SHOW_HP && this.remainingHp > 0) drawHp(p5, this.position.x, this.position.y, this.hp, this.remainingHp)
  }
}

export default Peashooter
