import P5, { Image, Vector } from 'p5'

abstract class Entity {
  static spritesheet: Image

  animationFrame: number = 0
  animationTimer: number = 0
  vector: Vector

  constructor(x: number, y: number) {
    this.vector = new Vector(x, y)
  }

  abstract update(p5?: P5): void

  abstract draw(p5?: P5): void
}

export default Entity
