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
