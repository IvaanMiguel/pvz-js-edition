import P5 from 'p5'
import { TILE_HEIGHT, TILE_WIDTH } from '../constants/game'
import Peashooter from '../entities/peashooter/Peashooter'
import Lawn from './Lawn'
import PeasSystem from './systems/PeasSystem'

class Player {
  lawn: Lawn
  peasSystem: PeasSystem

  constructor(lawn: Lawn, peasSystem: PeasSystem) {
    this.lawn = lawn
    this.peasSystem = peasSystem
  }

  update(p5: P5) {
    this.onMouseClicked(p5)
  }

  isMouseInsideLawn(p5: P5) {
    return (
      p5.mouseX >= this.lawn.x &&
      p5.mouseX <= this.lawn.x + this.lawn.w &&
      p5.mouseY >= this.lawn.y &&
      p5.mouseY <= this.lawn.y + this.lawn.h
    )
  }

  onMouseClicked(p5: P5) {
    p5.mouseClicked = () => {
      const lawnTileCol = p5.floor((p5.mouseX - this.lawn.x) / TILE_WIDTH)
      const lawnTileRow = p5.floor((p5.mouseY - this.lawn.y) / TILE_HEIGHT)

      if (!this.isMouseInsideLawn(p5) || this.lawn.getLawnTile(lawnTileRow, lawnTileCol)) return

      const x = (lawnTileCol + 1) * TILE_WIDTH + this.lawn.x - TILE_WIDTH / 2
      const y = (lawnTileRow + 1) * TILE_HEIGHT + this.lawn.y - TILE_HEIGHT / 2

      this.lawn.plantTile(new Peashooter(p5, x, y, lawnTileRow, this.peasSystem.addPea), lawnTileRow, lawnTileCol)
    }
  }
}

export default Player
