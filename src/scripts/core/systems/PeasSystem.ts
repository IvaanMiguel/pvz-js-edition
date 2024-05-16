import P5 from 'p5'
import { LAWN_HEIGHT, TILE_HEIGHT } from '../../constants/game'
import { PeaState } from '../../constants/projectiles/pea'
import Pea from '../../entities/projectiles/Pea'
import BasicZombie from '../../entities/zombies/BasicZombie'
import { areColliding } from '../../utils'
import ZombiesSystem from './ZombiesSystem'

class PeasSystem {
  zombiesSystem: ZombiesSystem
  peas: Pea[][]

  constructor(zombiesSystem: ZombiesSystem) {
    this.zombiesSystem = zombiesSystem

    this.peas = [...Array(LAWN_HEIGHT / TILE_HEIGHT)].map(() => [])
  }

  onPeaEnd = (pea: Pea) => {
    const index = this.peas[pea.lawnRow].indexOf(pea)

    this.peas[pea.lawnRow].splice(index, 1)
  }

  addPea = (x: number, y: number, lawnRow: number) => {
    this.peas[lawnRow].push(new Pea(x, y, lawnRow, this.onPeaEnd))
  }

  updateOnHittingZombie(p5: P5, pea: Pea, zombies: BasicZombie[]) {
    for (let i = 0; i < zombies.length; i++) {
      const zombie = zombies[i]

      if (!areColliding(pea.hitbox, zombie.hitbox) || pea.currentState.type === PeaState.ON_HIT) {
        continue
      }

      zombie.hit(pea)
      pea.changeState(p5, PeaState.ON_HIT)
    }
  }

  update(p5: P5) {
    for (let i = 0; i < this.peas.length; i++) {
      for (let j = 0; j < this.peas[i].length; j++) {
        const pea = this.peas[i][j]

        this.updateOnHittingZombie(p5, pea, this.zombiesSystem.zombies[i] as BasicZombie[])

        pea.position.x > p5.width + 10 ? this.onPeaEnd(pea) : pea.update(p5)
      }
    }
  }

  draw(p5: P5) {
    for (let i = 0; i < this.peas.length; i++) {
      for (let j = 0; j < this.peas[i].length; j++) {
        this.peas[i][j].draw(p5)
      }
    }
  }
}

export default PeasSystem
