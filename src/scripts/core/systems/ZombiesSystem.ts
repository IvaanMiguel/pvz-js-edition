import P5 from 'p5'
import { ZombieId as ZombieIdType } from '../../../types'
import { DEBUG, LAWN_HEIGHT, LAWN_OFFSET_X, LAWN_OFFSET_Y, TILE_HEIGHT } from '../../constants/game'
import { SHOW_WEIGHTS, WEIGHT_ROW_DECREMENT_FACTOR, WEIGHT_ROW_INCREMENT } from '../../constants/hordeSystem'
import Zombie from '../../entities/zombies/Zombie'
import ZombieFactory from '../ZombieFactory'

class ZombiesSystem {
  zombies: Zombie[][] = [...Array(LAWN_HEIGHT / TILE_HEIGHT)].map(() => [])
  rowsWeights: number[] = [...Array(LAWN_HEIGHT / TILE_HEIGHT)].map(() => 1)
  zombieFactory: ZombieFactory
  zombiesOnYourLawn: number = 0
  spawnedZombies: number = 0
  killedZombies: number = 0
  firstZombieSpawned: boolean = false

  constructor() {
    this.zombieFactory = new ZombieFactory(this)
  }

  onZombieEnd = (zombie: Zombie) => {
    const lawnRow = zombie.lawnRow
    const index = this.zombies[lawnRow].indexOf(zombie)

    this.zombies[lawnRow].splice(index, 1)
    this.killedZombies++
    this.zombiesOnYourLawn--
  }

  addZombieToRow(zombie: Zombie, lawnRow: number) {
    this.zombies[lawnRow].push(zombie)
  }

  getZombie(row: number, index: number) {
    return this.zombies[row][index]
  }

  getSpawningRow(p5: P5) {
    const totalWeight = this.rowsWeights.reduce((acc, v) => acc + v, 0)
    const randomNum = p5.random(0, totalWeight)
    let cumulativeWeight = 0
    let selectedRow = -1

    for (let i = 0; i < this.rowsWeights.length; i++) {
      cumulativeWeight += this.rowsWeights[i]

      if (randomNum < cumulativeWeight && selectedRow === -1) {
        selectedRow = i
        this.rowsWeights[i] *= WEIGHT_ROW_DECREMENT_FACTOR
      } else {
        this.rowsWeights[i] += WEIGHT_ROW_INCREMENT
      }
    }

    return selectedRow
  }

  spawnZombie(p5: P5, zombieId: ZombieIdType) {
    const spawningRow = this.getSpawningRow(p5)
    const x = p5.width + 15
    const y = (spawningRow + 1) * TILE_HEIGHT + LAWN_OFFSET_Y - TILE_HEIGHT / 2

    this.addZombieToRow(this.zombieFactory.createZombie(zombieId, x, y, spawningRow), spawningRow)
    this.spawnedZombies++
    this.zombiesOnYourLawn++

    if (!this.firstZombieSpawned) this.firstZombieSpawned = true
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
  draw(p5: P5) {
    if (DEBUG) this.debug(p5)
  }

  debug(p5: P5) {
    if (SHOW_WEIGHTS) {
      for (let i = 0; i < this.rowsWeights.length; i++) {
        p5.strokeWeight(1)
        p5.stroke('white')
        p5.fill('black')
        p5.textSize(6 + this.rowsWeights[i] * 2)
        p5.textAlign(p5.LEFT, p5.BOTTOM)
        p5.text(`wt. ${this.rowsWeights[i]}`, LAWN_OFFSET_X, LAWN_OFFSET_Y + (i + 1) * TILE_HEIGHT)
      }
    }
  }
}

export default ZombiesSystem
