import P5 from 'p5'
import { BASIC_ZOMBIE_DMG } from '../../constants/zombie/basicZombie'
import Entity from '../Entity'
import Pea from '../projectiles/Pea'

abstract class Zombie extends Entity {
  hp: number
  remainingHp: number
  dmg: number = BASIC_ZOMBIE_DMG
  action: 'EATING' | 'WALKING' = 'WALKING'
  lawnRow: number
  onZombieEnd: (zombie: Zombie) => void

  constructor(
    x: number,
    y: number,
    hp: number,
    hitbox: { x: number; y: number; w: number; h: number; isActive: boolean },
    lawnRow: number,
    onZombieEnd: (zombie: Zombie) => void
  ) {
    super(x, y, { ...hitbox })

    this.lawnRow = lawnRow
    this.hp = hp
    this.remainingHp = hp
    this.onZombieEnd = onZombieEnd
  }

  abstract hit(pea: Pea): void

  abstract kill(p5?: P5): void
}

export default Zombie
