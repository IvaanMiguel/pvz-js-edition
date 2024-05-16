import P5 from 'p5'
import { Hitbox } from '../types'

export const areColliding = (hitbox1: Hitbox, hitbox2: Hitbox) => {
  return (
    hitbox1.isActive &&
    hitbox2.isActive &&
    hitbox1.position.x + hitbox1.w >= hitbox2.position.x &&
    hitbox1.position.x <= hitbox2.position.x + hitbox2.w &&
    hitbox1.position.y + hitbox1.h >= hitbox2.position.y &&
    hitbox1.position.y <= hitbox2.position.y + hitbox2.w
  )
}

export const drawHp = (p5: P5, x: number, y: number, maxHp: number, remainingHp: number) => {
  p5.textAlign(p5.CENTER)
  p5.strokeWeight(1)
  p5.stroke('white')
  p5.fill('black')
  p5.textSize(6)
  p5.text(`${p5.round(remainingHp, 0)}/${maxHp}`, x, y)
}
