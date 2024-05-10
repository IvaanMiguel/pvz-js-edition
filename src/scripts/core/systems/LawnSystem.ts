import P5 from 'p5'
import { TILE_HEIGHT, TILE_WIDTH } from '../../constants/game'
import Entity from '../../entities/Entity'
import Plant from '../../entities/Plant'
import ZombiesSystem from './ZombiesSystem'

class LawnSystem {
  x: number
  y: number
  w: number
  h: number
  tiles: (Entity | null)[][]

  // Solo para ser dibujado correctamente respecto a las plantas.
  zombiesSystem: ZombiesSystem

  constructor(x: number, y: number, w: number, h: number, zombiesSystem: ZombiesSystem) {
    this.x = x
    this.y = y
    this.w = w
    this.h = h
    this.zombiesSystem = zombiesSystem

    this.tiles = [...Array(this.h / TILE_HEIGHT)].map(() => Array(this.w / TILE_WIDTH).fill(null)) // ?
  }

  getLawnTile(row: number, col: number) {
    return this.tiles[row][col]
  }

  digUpLawnTile(row: number, col: number) {
    this.tiles[row][col] = null
  }

  plantTile(plant: Entity, row: number, col: number) {
    this.tiles[row][col] = plant
  }

  update(p5: P5) {
    for (let i = 0; i < this.tiles.length; i++) {
      for (let j = 0; j < this.tiles[i].length; j++) {
        const plant = this.tiles[i][j] as Plant | null

        if (!plant) continue

        plant.remainingHp <= 0 ? this.digUpLawnTile(i, j) : plant.update(p5)
      }
    }
  }

  draw(p5: P5) {
    for (let i = 0; i < this.tiles.length; i++) {
      for (let j = 0; j < this.tiles[0].length; j++) {
        this.tiles[i][j]?.draw(p5)
      }

      for (let j = this.zombiesSystem.zombies[i].length - 1; j >= 0; j--) {
        this.zombiesSystem.zombies[i][j].draw(p5)
      }
    }
  }
}

export default LawnSystem
