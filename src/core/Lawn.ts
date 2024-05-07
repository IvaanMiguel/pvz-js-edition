import P5 from 'p5'
import { TILE_HEIGHT, TILE_WIDTH } from '../constants/game'
import Entity from '../entities/Entity'

class Lawn {
  x: number
  y: number
  w: number
  h: number
  tiles: (Entity | null)[][]

  constructor(x: number, y: number, w: number, h: number) {
    this.x = x
    this.y = y
    this.w = w
    this.h = h

    this.tiles = [...Array(this.h / TILE_HEIGHT)].map(() => Array(this.w / TILE_WIDTH).fill(null)) // ?
  }

  getLawnTile(row: number, col: number) {
    return this.tiles[col][row]
  }

  digUpLawnTile(row: number, col: number) {
    this.tiles[col][row] = null
  }

  plant(plant: Entity, row: number, col: number) {
    this.tiles[col][row] = plant
  }

  update(p5: P5) {
    for (let i = 0; i < this.tiles.length; i++) {
      for (let j = 0; j < this.tiles[0].length; j++) {
        if (this.tiles[i][j]) this.tiles[i][j]?.update(p5)
      }
    }
  }

  draw(p5: P5) {
    for (let i = 0; i < this.tiles.length; i++) {
      for (let j = 0; j < this.tiles[0].length; j++) {
        if (this.tiles[i][j]) this.tiles[i][j]?.draw(p5)
      }
    }
  }
}

export default Lawn
