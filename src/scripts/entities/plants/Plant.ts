import { BASIC_PLANT_HP } from '../../constants/plants';
import Entity from '../Entity'

abstract class Plant extends Entity {
  isZombieAhead: boolean = false
  hp: number = BASIC_PLANT_HP
  remainingHp: number = BASIC_PLANT_HP

  constructor(x: number, y: number, hitbox: { x: number; y: number; w: number; h: number; isActive: boolean }) {
    super(x, y, { ...hitbox })
  }

  // abstract onZombieAhead(zombie: Entity): void

  abstract setIsZombieAhead(isZombieAhead: boolean): void
}

export default Plant
