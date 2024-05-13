import P5 from 'p5'
import Entity from './entities/Entity'

export const areColliding = (entity1: Entity, entity2: Entity) => {
  return (
    entity1.hitbox.isActive &&
    entity2.hitbox.isActive &&
    entity1.hitbox.position.x + entity1.hitbox.w >= entity2.hitbox.position.x &&
    entity1.hitbox.position.x <= entity2.hitbox.position.x + entity2.hitbox.w &&
    entity1.hitbox.position.y + entity1.hitbox.h >= entity2.hitbox.position.y &&
    entity1.hitbox.position.y <= entity2.hitbox.position.y + entity2.hitbox.w
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
