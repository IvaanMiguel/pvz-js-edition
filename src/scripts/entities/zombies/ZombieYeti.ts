import P5 from 'p5'
import { ConstructorHitbox, EntityState, HandleState } from '../../../types'
import {
  DRAW_ZOMBIE_YETI_COORDS_POINT,
  DRAW_ZOMBIE_YETI_HITBOX,
  DRAW_ZOMBIE_YETI_SPRITE_BORDERS,
  SHOW_ZOMBIE_YETI_HP,
  ZOMBIE_YETI_DMG,
  ZOMBIE_YETI_HITBOX_HEIGHT,
  ZOMBIE_YETI_HITBOX_OFFSET_X,
  ZOMBIE_YETI_HITBOX_WIDTH,
  ZOMBIE_YETI_HP,
  ZOMBIE_YETI_OFFSET_Y,
  ZOMBIE_YETI_SPEED,
  ZombieYetiAnimation,
  ZombieYetiState
} from '../../constants/zombie/zombieYeti'
import Zombie from './Zombie'
import zombieYetiSprites from '/sprites/zombies/zombie-yeti.png'
import Pea from '../projectiles/Pea'
import { DEBUG } from '../../constants/game'
import { drawHp } from '../../utils'

class ZombieYeti extends Zombie {
  states: EntityState
  currentState: HandleState
  hpStatus: 'FULL' | 'DAMAGED' = 'FULL'
  dmg: number = ZOMBIE_YETI_DMG

  constructor(x: number, y: number, lawnRow: number, onZombieEnd: (zombie: Zombie) => void) {
    const hitbox: ConstructorHitbox = {
      x: x - ZOMBIE_YETI_HITBOX_WIDTH / 2 + ZOMBIE_YETI_HITBOX_OFFSET_X,
      y: y - ZOMBIE_YETI_HITBOX_HEIGHT / 2,
      w: ZOMBIE_YETI_HITBOX_WIDTH,
      h: ZOMBIE_YETI_HITBOX_HEIGHT,
      isActive: true
    }

    super(x, y, ZOMBIE_YETI_HP, hitbox, lawnRow, onZombieEnd)

    this.states = {
      [ZombieYetiState.WALKING.FULL]: {
        type: ZombieYetiState.WALKING.FULL,
        animation: ZombieYetiAnimation[ZombieYetiState.WALKING.FULL],
        update: this.handleUpdateState,
        draw: this.handleDrawState
      },
      [ZombieYetiState.WALKING.DAMAGED]: {
        type: ZombieYetiState.WALKING.DAMAGED,
        animation: ZombieYetiAnimation[ZombieYetiState.WALKING.DAMAGED],
        update: this.handleUpdateState,
        draw: this.handleDrawState
      },
      [ZombieYetiState.EATING.FULL]: {
        type: ZombieYetiState.EATING.FULL,
        animation: ZombieYetiAnimation[ZombieYetiState.EATING.FULL],
        update: this.handleUpdateState,
        draw: this.handleDrawState
      },
      [ZombieYetiState.EATING.DAMAGED]: {
        type: ZombieYetiState.EATING.DAMAGED,
        animation: ZombieYetiAnimation[ZombieYetiState.EATING.DAMAGED],
        update: this.handleUpdateState,
        draw: this.handleDrawState
      },
      [ZombieYetiState.DYING]: {
        type: ZombieYetiState.DYING,
        animation: ZombieYetiAnimation[ZombieYetiState.DYING],
        update: this.handleDyingUpdate,
        draw: this.handleDrawState
      }
    }

    this.currentState = this.states[ZombieYetiState.WALKING.FULL]
  }

  static preload(p5: P5) {
    ZombieYeti.spritesheet = p5.loadImage(zombieYetiSprites)
  }

  hit(pea: Pea) {
    this.remainingHp -= pea.dmg
  }

  kill(p5: P5) {
    this.changeState(p5, ZombieYetiState.DYING)
  }

  changeState(p5: P5, newState: string) {
    this.currentState = this.states[newState]
    this.animationFrame = 0
    this.animationTimer = p5.millis() + this.currentState.animation[this.animationFrame].timer * p5.deltaTime
  }

  handleUpdateState = (p5: P5) => {
    if (p5.millis() < this.animationTimer) return

    this.animationFrame++
    if (this.animationFrame >= this.currentState.animation.length) this.animationFrame = 0

    this.animationTimer = p5.millis() + this.currentState.animation[this.animationFrame].timer * p5.deltaTime
  }

  handleDyingUpdate = (p5: P5) => {
    if (p5.millis() < this.animationTimer) return

    this.animationFrame++
    if (this.animationFrame >= this.currentState.animation.length) {
      this.animationFrame = 0
      this.onZombieEnd(this)
    }

    this.animationTimer = p5.millis() + this.currentState.animation[this.animationFrame].timer * p5.deltaTime
  }

  updateAction(p5: P5) {
    if (this.remainingHp <= 0) return

    const newAction = this.isPlantAhead ? 'EATING' : 'WALKING'

    if (this.action === newAction) return
    this.action = newAction

    this.changeState(p5, ZombieYetiState[this.action][this.hpStatus])
  }

  updatePosition(p5: P5) {
    if (this.action !== 'WALKING' || this.remainingHp <= 0) return

    const xVelocity = ZOMBIE_YETI_SPEED * (p5.deltaTime / 1000)

    this.position.sub(xVelocity, 0)
    this.hitbox.position.sub(xVelocity, 0)
  }

  updateHpStatus() {
    if (this.remainingHp <= 0) return

    if (this.remainingHp > this.hp / 2) {
      this.currentState = this.states[ZombieYetiState[this.action]['FULL']]
    } else {
      this.currentState = this.states[ZombieYetiState[this.action]['DAMAGED']]
    }
  }

  update(p5: P5) {
    this.updateHpStatus()
    this.updateAction(p5)

    this.hitbox.isActive = this.remainingHp > 0

    if (this.remainingHp <= 0 && this.currentState.type !== ZombieYetiState.DYING) this.kill(p5)

    this.updatePosition(p5)
    this.currentState.update(p5)
  }

  handleDrawState = (p5: P5) => {
    const { originX, originY, w, h } = this.currentState.animation[this.animationFrame]
    const positionY = this.position.y + ZOMBIE_YETI_OFFSET_Y

    p5.imageMode(p5.CENTER)
    p5.image(ZombieYeti.spritesheet, this.position.x, positionY, w, h, originX, originY, w, h)
  }

  draw(p5: P5) {
    this.currentState.draw(p5)

    if (DEBUG) this.debug(p5)
  }

  debug(p5: P5) {
    if (DRAW_ZOMBIE_YETI_HITBOX && this.hitbox.isActive) this.drawHitbox(p5)

    if (DRAW_ZOMBIE_YETI_SPRITE_BORDERS) {
      this.drawSpriteBorders(
        p5,
        this.position.x,
        this.position.y + ZOMBIE_YETI_OFFSET_Y,
        this.currentState.animation[this.animationFrame].w,
        this.currentState.animation[this.animationFrame].h
      )
    }

    if (DRAW_ZOMBIE_YETI_COORDS_POINT) this.drawCoordsPoint(p5)

    if (SHOW_ZOMBIE_YETI_HP && this.remainingHp > 0)
      drawHp(p5, this.position.x, this.position.y, this.hp, this.remainingHp)
  }
}

export default ZombieYeti
