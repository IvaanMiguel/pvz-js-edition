import P5 from 'p5'
import { ConstructorHitbox, EntityState, HandleState } from '../../../types'
import { DEBUG } from '../../constants/game'
import {
  BASIC_ZOMBIE_HP,
  BASIC_ZOMBIE_OFFSET_Y,
  BasicZombieAnimation,
  BasicZombieState
} from '../../constants/zombie/basicZombie'
import {
  CONEHEAD_ZOMBIE_HITBOX_HEIGHT,
  CONEHEAD_ZOMBIE_HITBOX_OFFSET_X,
  CONEHEAD_ZOMBIE_HITBOX_WIDTH,
  CONEHEAD_ZOMBIE_HP,
  CONEHEAD_ZOMBIE_OFFSET_Y,
  CONEHEAD_ZOMBIE_SPEED,
  ConeheadZombieAnimation,
  ConeheadZombieState,
  DRAW_CONEHEAD_ZOMBIE_COORDS_POINT,
  DRAW_CONEHEAD_ZOMBIE_HITBOX,
  DRAW_CONEHEAD_ZOMBIE_SPRITE_BORDERS,
  ROADCONE_DAMAGED,
  ROADCONE_DESTROYED,
  SHOW_CONEHEAD_ZOMBIE_HP
} from '../../constants/zombie/coneheadZombie'
import { drawHp } from '../../utils'
import Pea from '../projectiles/Pea'
import BasicZombie from './BasicZombie'
import Zombie from './Zombie'
import coneheadZombieSprites from '/sprites/zombies/conehead-zombie.png'

class ConeheadZombie extends Zombie {
  hpStatus: 'FULL' | 'DAMAGED' | 'DESTROYED' = 'FULL'
  currentState: HandleState
  states: EntityState

  constructor(x: number, y: number, lawnRow: number, onZombieEnd: (zombie: Zombie) => void) {
    const hitbox: ConstructorHitbox = {
      x: x - CONEHEAD_ZOMBIE_HITBOX_WIDTH / 2 + CONEHEAD_ZOMBIE_HITBOX_OFFSET_X,
      y: y - CONEHEAD_ZOMBIE_HITBOX_HEIGHT / 2,
      w: CONEHEAD_ZOMBIE_HITBOX_WIDTH,
      h: CONEHEAD_ZOMBIE_HITBOX_HEIGHT,
      isActive: true
    }

    super(x, y, CONEHEAD_ZOMBIE_HP, hitbox, lawnRow, onZombieEnd)

    this.states = {
      [ConeheadZombieState.WALKING.FULL]: {
        type: ConeheadZombieState.WALKING.FULL,
        animation: ConeheadZombieAnimation[ConeheadZombieState.WALKING.FULL],
        update: this.handleUpdateState,
        draw: this.handleDrawConeheadState
      },
      [ConeheadZombieState.WALKING.DAMAGED]: {
        type: ConeheadZombieState.WALKING.DAMAGED,
        animation: ConeheadZombieAnimation[ConeheadZombieState.WALKING.DAMAGED],
        update: this.handleUpdateState,
        draw: this.handleDrawConeheadState
      },
      [ConeheadZombieState.WALKING.DESTROYED]: {
        type: ConeheadZombieState.WALKING.DESTROYED,
        animation: ConeheadZombieAnimation[ConeheadZombieState.WALKING.DESTROYED],
        update: this.handleUpdateState,
        draw: this.handleDrawConeheadState
      },
      [ConeheadZombieState.EATING.FULL]: {
        type: ConeheadZombieState.EATING.FULL,
        animation: ConeheadZombieAnimation[ConeheadZombieState.EATING.FULL],
        update: this.handleUpdateState,
        draw: this.handleDrawConeheadState
      },
      [ConeheadZombieState.EATING.DAMAGED]: {
        type: ConeheadZombieState.EATING.DAMAGED,
        animation: ConeheadZombieAnimation[ConeheadZombieState.EATING.DAMAGED],
        update: this.handleUpdateState,
        draw: this.handleDrawConeheadState
      },
      [ConeheadZombieState.EATING.DESTROYED]: {
        type: ConeheadZombieState.EATING.DESTROYED,
        animation: ConeheadZombieAnimation[ConeheadZombieState.EATING.DESTROYED],
        update: this.handleUpdateState,
        draw: this.handleDrawConeheadState
      },
      [BasicZombieState.WALKING.FULL]: {
        type: BasicZombieState.WALKING.FULL,
        animation: BasicZombieAnimation[BasicZombieState.WALKING.FULL],
        draw: this.handleDrawBasicState,
        update: this.handleUpdateState
      },
      [BasicZombieState.WALKING.DAMAGED]: {
        type: BasicZombieState.WALKING.DAMAGED,
        animation: BasicZombieAnimation[BasicZombieState.WALKING.DAMAGED],
        draw: this.handleDrawBasicState,
        update: this.handleUpdateState
      },
      [BasicZombieState.EATING.FULL]: {
        type: BasicZombieState.EATING.FULL,
        animation: BasicZombieAnimation[BasicZombieState.EATING.FULL],
        draw: this.handleDrawBasicState,
        update: this.handleUpdateState
      },
      [BasicZombieState.EATING.DAMAGED]: {
        type: BasicZombieState.EATING.DAMAGED,
        animation: BasicZombieAnimation[BasicZombieState.EATING.DAMAGED],
        draw: this.handleDrawBasicState,
        update: this.handleUpdateState
      },
      [BasicZombieState.LYING_DOWN]: {
        type: BasicZombieState.LYING_DOWN,
        animation: BasicZombieAnimation[BasicZombieState.LYING_DOWN],
        draw: this.handleDrawBasicState,
        update: this.handleLyingDownUpdate
      }
    }

    this.currentState = this.states[ConeheadZombieState.WALKING.FULL]
  }

  static preload(p5: P5) {
    ConeheadZombie.spritesheet = p5.loadImage(coneheadZombieSprites)
  }

  hit(pea: Pea) {
    this.remainingHp -= pea.dmg
  }

  kill(p5: P5) {
    this.currentState = this.states[BasicZombieState.LYING_DOWN]
    this.animationFrame = 0
    this.animationTimer = p5.millis() + this.currentState.animation[this.animationFrame].timer * p5.deltaTime
  }

  handleUpdateState = (p5: P5) => {
    if (p5.millis() < this.animationTimer) return

    this.animationFrame++
    if (this.animationFrame >= this.currentState.animation.length) this.animationFrame = 0

    this.animationTimer = p5.millis() + this.currentState.animation[this.animationFrame].timer * p5.deltaTime
  }

  handleLyingDownUpdate = (p5: P5) => {
    if (p5.millis() < this.animationTimer) return

    this.animationFrame++
    if (this.animationFrame >= this.currentState.animation.length) {
      this.animationFrame = 0
      this.onZombieEnd(this)
    }

    this.animationTimer = p5.millis() + this.currentState.animation[this.animationFrame].timer * p5.deltaTime
  }

  updatePosition(p5: P5) {
    if (this.action !== 'WALKING' || this.remainingHp <= 0) return

    const xVelocity = CONEHEAD_ZOMBIE_SPEED * (p5.deltaTime / 1000)

    this.position.sub(xVelocity, 0)
    this.hitbox.position.sub(xVelocity, 0)
  }

  updateHpStatus() {
    if (this.remainingHp <= 0) return

    if (this.remainingHp > ROADCONE_DAMAGED) {
      this.currentState = this.states[ConeheadZombieState[this.action]['FULL']]
    } else if (this.remainingHp > ROADCONE_DESTROYED) {
      this.currentState = this.states[ConeheadZombieState[this.action]['DAMAGED']]
    } else if (this.remainingHp > BASIC_ZOMBIE_HP) {
      this.currentState = this.states[ConeheadZombieState[this.action]['DESTROYED']]
    } else if (this.remainingHp > BASIC_ZOMBIE_HP / 2) {
      this.currentState = this.states[BasicZombieState[this.action]['FULL']]
    } else {
      this.currentState = this.states[BasicZombieState[this.action]['DAMAGED']]
    }
  }

  updateAction() {
    if (this.remainingHp <= 0) return

    this.action = this.isPlantAhead ? 'EATING' : 'WALKING'
    const hpStatus = this.hpStatus as 'FULL' | 'DAMAGED'

    this.currentState = this.states[BasicZombieState[this.action][hpStatus]]
  }

  update(p5: P5) {
    this.updateAction()
    this.updateHpStatus()

    this.hitbox.isActive = this.remainingHp > 0

    if (this.remainingHp <= 0 && this.currentState.type !== BasicZombieState.LYING_DOWN) this.kill(p5)

    this.updatePosition(p5)
    this.currentState.update(p5)
  }

  handleDrawBasicState = (p5: P5) => {
    const { originX, originY, w, h } = this.currentState.animation[this.animationFrame]
    const positionY = this.position.y + BASIC_ZOMBIE_OFFSET_Y

    p5.imageMode(p5.CENTER)
    p5.image(BasicZombie.spritesheet, this.position.x, positionY, w, h, originX, originY, w, h)
  }

  handleDrawConeheadState = (p5: P5) => {
    const { originX, originY, w, h } = this.currentState.animation[this.animationFrame]
    const positionY = this.position.y + CONEHEAD_ZOMBIE_OFFSET_Y

    p5.imageMode(p5.CENTER)
    p5.image(ConeheadZombie.spritesheet, this.position.x, positionY, w, h, originX, originY, w, h)
  }

  draw(p5: P5) {
    this.currentState.draw(p5)

    if (DEBUG) this.debug(p5)
  }

  debug(p5: P5) {
    if (DRAW_CONEHEAD_ZOMBIE_HITBOX && this.hitbox.isActive) this.drawHitbox(p5)

    if (DRAW_CONEHEAD_ZOMBIE_SPRITE_BORDERS) {
      const offsetY = this.remainingHp <= BASIC_ZOMBIE_HP ? BASIC_ZOMBIE_OFFSET_Y : CONEHEAD_ZOMBIE_OFFSET_Y
      const { w, h } = this.currentState.animation[this.animationFrame]

      this.drawSpriteBorders(p5, this.position.x, this.position.y + offsetY, w, h)
    }

    if (DRAW_CONEHEAD_ZOMBIE_COORDS_POINT) this.drawCoordsPoint(p5)

    if (SHOW_CONEHEAD_ZOMBIE_HP && this.remainingHp > 0)
      drawHp(p5, this.position.x, this.position.y, this.hp, this.remainingHp)
  }
}

export default ConeheadZombie
