import P5 from 'p5'
import { TILE_HEIGHT, TILE_WIDTH } from '../constants/game'
import Peashooter from '../entities/peashooter/Peashooter'
import Lawn from './Lawn'

class Player {
  lawnPosition: { x: number; y: number }
  lawn: Lawn

  constructor(lawn: Lawn) {
    this.lawnPosition = { x: -1, y: -1 }
    this.lawn = lawn
  }

  update(p5: P5) {
    this.onMouseMoved(p5)
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

  onMouseMoved(p5: P5) {
    p5.mouseMoved = () => {
      if (!this.isMouseInsideLawn(p5)) {
        this.lawnPosition = { x: -1, y: -1 }
        return
      }

      this.lawnPosition.x = p5.floor((p5.mouseX - this.lawn.x) / TILE_WIDTH)
      this.lawnPosition.y = p5.floor((p5.mouseY - this.lawn.y) / TILE_HEIGHT)
    }
  }

  onMouseClicked(p5: P5) {
    p5.mouseClicked = () => {
      if (this.lawn.getLawnTile(this.lawnPosition.x, this.lawnPosition.y)) return

      const x = (this.lawnPosition.x + 1) * TILE_WIDTH + this.lawn.x - TILE_WIDTH / 2
      const y = (this.lawnPosition.y + 1) * TILE_HEIGHT + this.lawn.y - TILE_HEIGHT / 2

      this.lawn.plant(new Peashooter(p5, x, y), this.lawnPosition.x, this.lawnPosition.y)
    }
  }
}

export default Player
