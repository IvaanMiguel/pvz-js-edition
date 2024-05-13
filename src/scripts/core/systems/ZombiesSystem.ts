import P5 from 'p5'
import { LAWN_HEIGHT, TILE_HEIGHT } from '../../constants/game'
import Entity from '../../entities/Entity'
import BasicZombie from '../../entities/zombies/BasicZombie'

class ZombiesSystem {
  zombies: Entity[][]

  constructor() {
    this.zombies = [...Array(LAWN_HEIGHT / TILE_HEIGHT)].map(() => [])
  }

  onZombieEnd = (zombie: Entity) => {
    const lawnRow = (zombie as BasicZombie).lawnRow
    const index = this.zombies[lawnRow].indexOf(zombie)

    this.zombies[lawnRow].splice(index, 1)
  }

  addZombieToRow(zombie: Entity, lawnRow: number) {
    this.zombies[lawnRow].push(zombie)
  }

  getZombie(row: number, index: number) {
    return this.zombies[row][index]
  }

  update(p5: P5) {
    for (let i = 0; i < this.zombies.length; i++) {
      for (let j = 0; j < this.zombies[i].length; j++) {
        this.zombies[i][j].update(p5)
      }
    }
  }

  /* ZombiesSystem es dibujado dentro de la clase Lawn para
   * evitar que los zombies se dibujen sobre las plantas.
   */
  // draw(p5: P5) { }
}

export default ZombiesSystem
