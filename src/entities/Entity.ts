import { Image, Vector } from 'p5'

class Entity {
  static spritesheet: Image

  animationFrame: number = 0
  animationTimer: number = 0
  vector: Vector

  constructor(x: number, y: number) {
    this.vector = new Vector(x, y)
  }
}

export default Entity
