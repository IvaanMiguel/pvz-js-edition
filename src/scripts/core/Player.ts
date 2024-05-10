import P5 from 'p5'
import { TILE_HEIGHT, TILE_WIDTH } from '../constants/game'
import Peashooter from '../entities/peashooter/Peashooter'
import LawnSystem from './systems/LawnSystem'
import PeasSystem from './systems/PeasSystem'

class Player {
  lawnSystem: LawnSystem
  peasSystem: PeasSystem

  constructor(lawnSystem: LawnSystem, peasSystem: PeasSystem) {
    this.lawnSystem = lawnSystem
    this.peasSystem = peasSystem
  }

  update(p5: P5) {
    this.onMouseClicked(p5)
  }

  isMouseInsideLawn(p5: P5) {
    return (
      p5.mouseX >= this.lawnSystem.x &&
      p5.mouseX <= this.lawnSystem.x + this.lawnSystem.w &&
      p5.mouseY >= this.lawnSystem.y &&
      p5.mouseY <= this.lawnSystem.y + this.lawnSystem.h
    )
  }

  onMouseClicked(p5: P5) {
    p5.mouseClicked = () => {
      const lawnTileCol = p5.floor((p5.mouseX - this.lawnSystem.x) / TILE_WIDTH)
      const lawnTileRow = p5.floor((p5.mouseY - this.lawnSystem.y) / TILE_HEIGHT)

      if (!this.isMouseInsideLawn(p5) || this.lawnSystem.getLawnTile(lawnTileRow, lawnTileCol)) return

      const x = (lawnTileCol + 1) * TILE_WIDTH + this.lawnSystem.x - TILE_WIDTH / 2
      const y = (lawnTileRow + 1) * TILE_HEIGHT + this.lawnSystem.y - TILE_HEIGHT / 2

      this.lawnSystem.plantTile(new Peashooter(p5, x, y, lawnTileRow, this.peasSystem.addPea), lawnTileRow, lawnTileCol)
    }
  }
}

export default Player
