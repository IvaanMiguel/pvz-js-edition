import Entity from './Entity'

abstract class Plant extends Entity {
  isZombieAhead: boolean

  constructor(x: number, y: number, hitbox: { x: number; y: number; w: number; h: number; isActive: boolean }) {
    super(x, y, { ...hitbox })

    this.isZombieAhead = false
  }

  // abstract onZombieAhead(zombie: Entity): void

  abstract setIsZombieAhead(isZombieAhead: boolean): void
}

export default Plant
