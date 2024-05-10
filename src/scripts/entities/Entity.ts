import P5, { Image, Vector } from 'p5'
import { Hitbox } from '../../types'

abstract class Entity {
  static spritesheet: Image

  animationFrame: number = 0
  animationTimer: number = 0
  position: Vector
  hitbox: Hitbox

  constructor(x: number, y: number, hitbox: { x: number; y: number; w: number; h: number; isActive: boolean }) {
    this.position = new Vector(x, y)

    this.hitbox = {
      position: new Vector(hitbox.x, hitbox.y),
      w: hitbox.w,
      h: hitbox.h,
      isActive: hitbox.isActive
    }
  }

  abstract update(p5?: P5): void

  abstract draw(p5?: P5): void

  drawCoordsPoint(p5: P5) {
    p5.strokeWeight(2)
    p5.stroke('white')
    p5.fill('white')
    p5.point(this.position.x, this.position.y)
  }

  drawSpriteBorders(p5: P5, x: number, y: number, w: number, h: number) {
    p5.strokeWeight(1)
    p5.noFill()
    p5.stroke('red')
    p5.rectMode(p5.CENTER)
    p5.rect(x, y, w, h)
  }

  drawHitbox(p5: P5) {
    p5.strokeWeight(1)
    p5.noFill()
    p5.noTint()

    p5.stroke('blue')
    p5.rectMode(p5.CORNER)
    p5.rect(this.hitbox.position.x, this.hitbox.position.y, this.hitbox.w, this.hitbox.h)

    p5.stroke('yellow')
    p5.point(this.hitbox.position.x, this.hitbox.position.y)
  }
}

export default Entity
