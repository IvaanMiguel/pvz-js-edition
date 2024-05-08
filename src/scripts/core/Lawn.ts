import P5 from 'p5'
import { TILE_HEIGHT, TILE_WIDTH } from '../constants/game'
import Entity from '../entities/Entity'

class Lawn {
  x: number
  y: number
  w: number
  h: number
  tiles: (Entity | null)[][]
  zombies: Entity[][]

  constructor(x: number, y: number, w: number, h: number) {
    this.x = x
    this.y = y
    this.w = w
    this.h = h

    this.tiles = [...Array(this.h / TILE_HEIGHT)].map(() => Array(this.w / TILE_WIDTH).fill(null)) // ?
    this.zombies = [...Array(this.h / TILE_HEIGHT)].map(() => [])
  }

  getLawnTile(row: number, col: number) {
    return this.tiles[row][col]
  }

  digUpLawnTile(row: number, col: number) {
    this.tiles[col][row] = null
  }

  plantTile(plant: Entity, row: number, col: number) {
    this.tiles[row][col] = plant
  }

  addZombieToRow(zombie: Entity, lawnRow: number) {
    this.zombies[lawnRow].push(zombie)
  }

  update(p5: P5) {
    for (let i = 0; i < this.tiles.length; i++) {
      for (let j = 0; j < this.tiles[i].length; j++) {
        this.tiles[i][j]?.update(p5)
      }

      for (let j = 0; j < this.zombies[i].length; j++) {
        this.zombies[i][j].update(p5)
      }
    }
  }

  draw(p5: P5) {
    for (let i = 0; i < this.tiles.length; i++) {
      for (let j = 0; j < this.tiles[0].length; j++) {
        this.tiles[i][j]?.draw(p5)
      }

      for (let j = this.zombies[i].length - 1; j >= 0; j--) {
        this.zombies[i][j].draw(p5)
      }
    }
  }
}

export default Lawn
