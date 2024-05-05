import P5 from 'p5'
import { LAWN_HEIGHT, LAWN_OFFSET_X, LAWN_OFFSET_Y, LAWN_WIDTH, TILE_HEIGHT, TILE_WIDTH } from '../constants/game'
import Peashooter from '../entities/peashooter/Peashooter'

class Player {
  lawnPosition: { x: number; y: number }
  peashooters: Peashooter[] = []

  constructor(peashooters: Peashooter[]) {
    this.lawnPosition = { x: -1, y: -1 }
    this.peashooters = peashooters
  }

  update(p5: P5) {
    this.onMouseMoved(p5)
    this.onMouseClicked(p5)
  }

  isMouseInsideLawn(p5: P5) {
    return (
      p5.mouseX >= LAWN_OFFSET_X &&
      p5.mouseX <= LAWN_OFFSET_X + LAWN_WIDTH &&
      p5.mouseY >= LAWN_OFFSET_Y &&
      p5.mouseY <= LAWN_OFFSET_Y + LAWN_HEIGHT
    )
  }

  onMouseMoved(p5: P5) {
    p5.mouseMoved = () => {
      if (!this.isMouseInsideLawn(p5)) {
        this.lawnPosition = { x: -1, y: -1 }
        return
      }

      this.lawnPosition.x = p5.floor((p5.mouseX - LAWN_OFFSET_X) / TILE_WIDTH) + 1
      this.lawnPosition.y = p5.floor((p5.mouseY - LAWN_OFFSET_Y) / TILE_HEIGHT) + 1
    }
  }

  onMouseClicked(p5: P5) {
    p5.mouseClicked = () => {
      const x = this.lawnPosition.x * TILE_WIDTH + LAWN_OFFSET_X - TILE_WIDTH / 2
      const y = this.lawnPosition.y * TILE_HEIGHT + LAWN_OFFSET_Y - TILE_HEIGHT / 2

      this.peashooters.push(new Peashooter(p5, x, y))
    }
  }
}

export default Player
