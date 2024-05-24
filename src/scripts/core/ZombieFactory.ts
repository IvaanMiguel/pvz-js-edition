import { ZombieId as ZombieIdType } from '../../types'
import { ZombieId } from '../constants/zombie/ids'
import BasicZombie from '../entities/zombies/BasicZombie'
import BucketheadZombie from '../entities/zombies/BucketheadZombie'
import ConeheadZombie from '../entities/zombies/ConeheadZombie'
import FlagZombie from '../entities/zombies/FlagZombie'
import ZombieYeti from '../entities/zombies/ZombieYeti'
import ZombiesSystem from './systems/ZombiesSystem'

class ZombieFactory {
  zombiesSystem: ZombiesSystem

  constructor(zombiesSystem: ZombiesSystem) {
    this.zombiesSystem = zombiesSystem
  }

  createZombie(zombieId: ZombieIdType, x: number, y: number, lawnRow: number) {
    switch (zombieId) {
      case ZombieId.BASIC_ZOMBIE:
        return new BasicZombie(x, y, lawnRow, this.zombiesSystem.onZombieEnd)
      case ZombieId.CONEHEAD_ZOMBIE:
        return new ConeheadZombie(x, y, lawnRow, this.zombiesSystem.onZombieEnd)
      case ZombieId.BUCKETHEAD_ZOMBIE:
        return new BucketheadZombie(x, y, lawnRow, this.zombiesSystem.onZombieEnd)
      case ZombieId.ZOMBIE_YETI:
        return new ZombieYeti(x, y, lawnRow, this.zombiesSystem.onZombieEnd)
      case ZombieId.FLAG_ZOMBIE:
        return new FlagZombie(x, y, lawnRow, this.zombiesSystem.onZombieEnd)
    }
  }
}

export default ZombieFactory
