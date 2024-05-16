import P5, { Vector } from 'p5'
import { EntityState, HandleState, Hitbox } from '../../../types'
import { DEBUG } from '../../constants/game'
import {
  ARMING_TIMER,
  DRAW_POTATO_MINE_COORDS_POINT,
  DRAW_POTATO_MINE_HITBOX,
  DRAW_POTATO_MINE_SPRITE_BORDERS,
  DRAW_SPUDOW_HITBOX,
  POTATO_MINE_DNG,
  POTATO_MINE_HITBOX_HEIGHT,
  POTATO_MINE_HITBOX_WIDTH,
  PotatoMineAnimation,
  PotatoMineState,
  SHOW_HP,
  SPUDOW_HITBOX_HEIGHT,
  SPUDOW_HITBOX_WIDTH
} from '../../constants/plants/potatoMine'
import { areColliding, drawHp } from '../../utils'
import BasicZombie from '../zombies/BasicZombie'
import Plant from './Plant'
import potatoMineSprites from '/sprites/plants/potato-mine.png'

class PotatoMine extends Plant {
  states: EntityState
  currentState: HandleState
  armingTimer: number
  isArmed: boolean
  lawnRow: number
  dmg: number = POTATO_MINE_DNG
  spudowHitbox: Hitbox
  drawingOffset: number = -14

  constructor(p5: P5, x: number, y: number, lawnRow: number) {
    super(x, y, {
      x: x - POTATO_MINE_HITBOX_WIDTH / 2,
      y: y,
      w: POTATO_MINE_HITBOX_WIDTH,
      h: POTATO_MINE_HITBOX_HEIGHT,
      isActive: true
    })

    this.lawnRow = lawnRow
    this.spudowHitbox = {
      position: new Vector(x - SPUDOW_HITBOX_WIDTH / 2, y),
      w: SPUDOW_HITBOX_WIDTH,
      h: SPUDOW_HITBOX_HEIGHT,
      isActive: false
    }
    this.isArmed = false
    this.armingTimer = p5.millis() + ARMING_TIMER
    this.animationTimer = p5.millis() + PotatoMineAnimation[PotatoMineState.SLEEPING][0].timer * p5.deltaTime
    this.states = {
      [PotatoMineState.SLEEPING]: {
        type: PotatoMineState.SLEEPING,
        update: this.handleUpdateSleepingState,
        draw: this.handleDrawState
      },
      [PotatoMineState.ARMING]: {
        type: PotatoMineState.ARMING,
        update: this.handleUpdateArmingState,
        draw: this.handleDrawState
      },
      [PotatoMineState.IDLE]: {
        type: PotatoMineState.IDLE,
        update: () => {},
        draw: this.handleDrawState
      },
      [PotatoMineState.SPUDOW]: {
        type: PotatoMineState.SPUDOW,
        update: this.handleUpdateSpudowState,
        draw: this.handleDrawSpudowState
      }
    }

    this.currentState = this.states[PotatoMineState.SLEEPING]
  }

  static preload(p5: P5) {
    PotatoMine.spritesheet = p5.loadImage(potatoMineSprites)
  }

  static getPlaceholder() {
    const { originX, originY, w, h } = PotatoMineAnimation[PotatoMineState.IDLE][0]

    return PotatoMine.spritesheet.get(originX, originY, w, h)
  }

  setIsZombieAhead(isZombieAhead: boolean) {
    this.isZombieAhead = isZombieAhead
  }

  spudow(p5: P5, zombies: BasicZombie[]) {
    if (this.currentState.type === PotatoMineState.SPUDOW) return

    this.changeState(p5, PotatoMineState.SPUDOW)

    for (let i = zombies.length - 1; i >= 0; i--) {
      if (!areColliding(this.spudowHitbox, zombies[i].hitbox)) continue

      zombies[i].remainingHp <= this.dmg ? zombies[i].onZombieEnd(zombies[i]) : (zombies[i].remainingHp -= this.dmg)
    }

    this.spudowHitbox.isActive = false
  }

  changeState(p5: P5, newState: string) {
    this.currentState = this.states[newState]
    this.animationFrame = 0
    this.animationTimer = p5.millis() + PotatoMineAnimation[this.currentState.type][0].timer * p5.deltaTime
  }

  updateAnimation(p5: P5) {
    if (p5.millis() < this.animationTimer) return

    this.animationFrame++
    if (this.animationFrame >= PotatoMineAnimation[this.currentState.type].length) this.animationFrame = 0

    this.animationTimer =
      p5.millis() + PotatoMineAnimation[this.currentState.type][this.animationFrame].timer * p5.deltaTime
  }

  handleUpdateSleepingState = (p5: P5) => {
    if (p5.millis() < this.armingTimer || this.isArmed) return

    this.isArmed = true
    this.hitbox.isActive = false
    this.changeState(p5, PotatoMineState.ARMING)
  }

  handleUpdateArmingState = (p5: P5) => {
    if (this.animationFrame < PotatoMineAnimation[this.currentState.type].length - 1) return

    this.spudowHitbox.isActive = true
    this.changeState(p5, PotatoMineState.IDLE)
  }

  handleUpdateSpudowState = () => {
    if (this.animationFrame < PotatoMineAnimation[this.currentState.type].length - 1) return

    this.remainingHp = 0
  }

  update(p5: P5) {
    this.currentState.update(p5)
    this.updateAnimation(p5)

    console.log(this.isZombieAhead)
  }

  handleDrawSpudowState = (p5: P5) => {
    const { originX, originY, w, h } = PotatoMineAnimation[this.currentState.type][this.animationFrame]

    p5.imageMode(p5.CENTER)
    p5.image(
      PotatoMine.spritesheet,
      this.position.x,
      this.position.y + this.drawingOffset,
      w,
      h,
      originX,
      originY,
      w,
      h
    )
  }

  handleDrawState = (p5: P5) => {
    const { originX, originY, w, h } = PotatoMineAnimation[this.currentState.type][this.animationFrame]

    p5.imageMode(p5.CENTER)
    p5.image(PotatoMine.spritesheet, this.position.x, this.position.y, w, h, originX, originY, w, h)
  }

  draw(p5: P5) {
    this.currentState.draw(p5)

    if (DEBUG) this.debug(p5)
  }

  drawSpudowHitbox(p5: P5) {
    if (!this.spudowHitbox.isActive) return

    p5.strokeWeight(1)
    p5.noFill()
    p5.noTint()

    p5.stroke('darkred')
    p5.rectMode(p5.CORNER)
    p5.rect(this.spudowHitbox.position.x, this.spudowHitbox.position.y, this.spudowHitbox.w, this.spudowHitbox.h)

    p5.stroke('yellow')
    p5.point(this.spudowHitbox.position.x, this.spudowHitbox.position.y)
  }

  debug(p5: P5) {
    if (DRAW_POTATO_MINE_HITBOX && this.hitbox.isActive) this.drawHitbox(p5)

    if (DRAW_POTATO_MINE_SPRITE_BORDERS) {
      this.drawSpriteBorders(
        p5,
        this.position.x,
        this.position.y + (this.currentState.type === PotatoMineState.SPUDOW ? this.drawingOffset : 0),
        PotatoMineAnimation[this.currentState.type][this.animationFrame].w,
        PotatoMineAnimation[this.currentState.type][this.animationFrame].h
      )
    }

    if (DRAW_SPUDOW_HITBOX) this.drawSpudowHitbox(p5)

    if (DRAW_POTATO_MINE_COORDS_POINT) this.drawCoordsPoint(p5)

    if (SHOW_HP && this.remainingHp > 0) drawHp(p5, this.position.x, this.position.y, this.hp, this.remainingHp)
  }
}

export default PotatoMine
