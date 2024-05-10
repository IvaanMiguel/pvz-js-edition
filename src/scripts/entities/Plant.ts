import Entity from './Entity'

abstract class Plant extends Entity {
  isZombieAhead: boolean

  constructor(x: number, y: number) {
    super(x, y)

    this.isZombieAhead = false
  }

  // abstract onZombieAhead(zombie: Entity): void

  abstract setIsZombieAhead(isZombieAhead: boolean): void
}

export default Plant
