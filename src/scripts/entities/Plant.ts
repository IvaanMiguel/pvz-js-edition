import { PLANT_BASIC_HP } from '../constants/game'
import Entity from './Entity'

abstract class Plant extends Entity {
  isZombieAhead: boolean = false
  hp: number = PLANT_BASIC_HP
  remainingHp: number = PLANT_BASIC_HP

  constructor(x: number, y: number, hitbox: { x: number; y: number; w: number; h: number; isActive: boolean }) {
    super(x, y, { ...hitbox })
  }

  // abstract onZombieAhead(zombie: Entity): void

  abstract setIsZombieAhead(isZombieAhead: boolean): void
}

export default Plant
