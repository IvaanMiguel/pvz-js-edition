import P5 from 'p5'
import Plant from '../../entities/Plant'
import Zombie from '../../entities/Zombie'
import { areColliding } from '../../utils'
import LawnSystem from './LawnSystem'
import PeasSystem from './PeasSystem'
import ZombiesSystem from './ZombiesSystem'

/* VersusSystem se encarga de manejar todas las interacciones hostiles entre
 * zombis y plantas en el jardín. Maneja en qué momento una planta debe comenzar a
 * atacar y cuando debe dejarlo, en qué momento un zombi debe empezar a comer y cuando
 * no, etc.
 */
class VersusSystem {
  lawnSystem: LawnSystem
  peasSystem: PeasSystem
  zombiesSystem: ZombiesSystem

  constructor(lawnSystem: LawnSystem, peasSystem: PeasSystem, zombiesSystem: ZombiesSystem) {
    this.lawnSystem = lawnSystem
    this.peasSystem = peasSystem
    this.zombiesSystem = zombiesSystem
  }

  updateEatingPlant(p5: P5) {
    for (let i = 0; i < this.zombiesSystem.zombies.length; i++) {
      for (let j = 0; j < this.zombiesSystem.zombies[i].length; j++) {
        const zombie = this.zombiesSystem.getZombie(i, j) as Zombie

        for (let k = this.lawnSystem.tiles[i].length - 1; k >= 0; k--) {
          const lawnTile = this.lawnSystem.getLawnTile(i, k) as Plant

          // Si el zombi ya ha sobrepasado a la planta, simplemente la ignora y sigue caminando.
          if (lawnTile && zombie.hitbox.position.x + zombie.hitbox.w < lawnTile.position.x) continue

          if (lawnTile && areColliding(lawnTile, zombie)) {
            zombie.action = 'EATING'
            lawnTile.remainingHp -= (zombie.dmg / 1000) * p5.deltaTime

            /* Si el zombi ya está colisionando con una planta, se rompe el bucle
             * para continuar con el siguiente zombie, de lo contrario el bucle continuaría
             * haciendo que el zombi infliga daño a la planta, pero sin detenerse en ningún
             * momento.
             */
            break
          } else {
            zombie.action = 'WALKING'
          }
        }
      }
    }
  }

  updateTauntingLawn = () => {
    for (let i = 0; i < this.lawnSystem.tiles.length; i++) {
      for (let j = 0; j < this.lawnSystem.tiles[0].length; j++) {
        const lawnTile = this.lawnSystem.getLawnTile(i, j) as Plant | null

        if (!lawnTile) continue

        for (let k = 0; k < this.zombiesSystem.zombies[i].length; k++) {
          const zombie = this.zombiesSystem.getZombie(i, k) as Zombie

          /* Si el zombi ya ha sobrepasado a la planta, esta no será capaz
           * de golpearlo y simplemente no atacará.
           */
          lawnTile.setIsZombieAhead(
            zombie.hitbox.position.x + zombie.hitbox.w > lawnTile.position.x + lawnTile.hitbox.w
          )
        }

        if (this.zombiesSystem.zombies[i].length <= 0) lawnTile.setIsZombieAhead(false)
      }
    }
  }

  update(p5: P5) {
    this.updateTauntingLawn()
    this.updateEatingPlant(p5)
  }
}

export default VersusSystem
