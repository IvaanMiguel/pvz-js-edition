import { Image } from 'p5'

class Entity {
  static spritesheet: Image

  animationFrame: number = 0
  animationTimer: number = 0
  x: number
  y: number

  constructor(x: number, y: number) {
    this.x = x
    this.y = y
  }
}

export default Entity
