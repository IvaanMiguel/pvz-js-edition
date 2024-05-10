import P5 from 'p5'
import { TILE_HEIGHT } from '../../constants/game'
import { PeaState } from '../../constants/peashooter'
import Entity from '../../entities/Entity'
import Zombie from '../../entities/Zombie'
import Pea from '../../entities/peashooter/Pea'
import LawnSystem from './LawnSystem'
import ZombiesSystem from './ZombiesSystem'

class PeasSystem {
  zombiesSystem: ZombiesSystem
  peas: Pea[][]
  lawnSystem: LawnSystem

  constructor(lawnSystem: LawnSystem, zombiesSystem: ZombiesSystem) {
    this.lawnSystem = lawnSystem
    this.zombiesSystem = zombiesSystem

    this.peas = [...Array(this.lawnSystem.h / TILE_HEIGHT)].map(() => [])
  }

  onPeaEnd = (pea: Pea) => {
    const index = this.peas[pea.lawnRow].indexOf(pea)

    this.peas[pea.lawnRow].splice(index, 1)
  }

  addPea = (x: number, y: number, lawnRow: number) => {
    this.peas[lawnRow].push(new Pea(x, y, lawnRow, this.onPeaEnd))
  }

  isColliding(pea: Entity, zombie: Entity) {
    return (
      pea.hitbox.position.x + pea.hitbox.w >= zombie.hitbox.position.x &&
      pea.hitbox.position.x <= zombie.hitbox.position.x + zombie.hitbox.w &&
      pea.hitbox.position.y + pea.hitbox.h >= zombie.hitbox.position.y &&
      pea.hitbox.position.y <= zombie.hitbox.position.y + zombie.hitbox.w
    )
  }

  updateOnHittingZombie(p5: P5, pea: Pea, zombies: Zombie[]) {
    for (let i = 0; i < zombies.length; i++) {
      const zombie = zombies[i]

      if (!this.isColliding(pea, zombie) || pea.currentState.type === PeaState.ON_HIT || !zombie.hitbox.isActive) {
        continue
      }

      zombie.hit()
      pea.changeState(p5, PeaState.ON_HIT)
    }
  }

  update(p5: P5) {
    for (let i = 0; i < this.peas.length; i++) {
      for (let j = 0; j < this.peas[i].length; j++) {
        const pea = this.peas[i][j]

        this.updateOnHittingZombie(p5, pea, this.zombiesSystem.zombies[i] as Zombie[])

        pea.position.x > p5.width + 10 ? this.onPeaEnd(pea) : pea.update(p5)
      }
    }
  }

  draw(p5: P5) {
    for (let i = 0; i < this.peas.length; i++) {
      for (let j = 0; j < this.peas[i].length; j++) {
        this.peas[i][j].draw(p5)
      }
    }
  }
}

export default PeasSystem
