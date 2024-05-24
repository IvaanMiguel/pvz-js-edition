import P5 from 'p5'
import { HordeInfo } from '../../../types'
import { DECREMENT_PER_SPAWN, SPAWNING_HORDE_TIMER, SPAWNING_ZOMBIE_TIMER_TRESHOLD } from '../../constants/hordeSystem'
import { ZombieId } from '../../constants/zombie/ids'
import ProgressBar from '../../screen/ProgressBar'
import ZombiesSystem from './ZombiesSystem'

class HordeSystem {
  zombiesSystem: ZombiesSystem
  progressBar: ProgressBar

  nextSpawningTime: number
  currentHorde: number = 0
  isHordeTime: boolean = false
  hordes: HordeInfo[]
  zombieTimer: number = SPAWNING_ZOMBIE_TIMER_TRESHOLD[1]
  hordeZombiesSpawned: number = 0
  killedZombies: number = 0

  constructor(p5: P5, zombiesSystem: ZombiesSystem, progressBar: ProgressBar, hordes: HordeInfo[]) {
    this.zombiesSystem = zombiesSystem
    this.progressBar = progressBar

    this.nextSpawningTime = p5.millis() + this.zombieTimer
    this.hordes = hordes
  }

  shouldSpawnZombie(p5: P5) {
    /*
     * Si el tiempo ya ha superado el próximo tiempo de spawn y la cantidad de zombis spawneada
     * sigue siendo menor a la cantidad de zombis permitida antes de la oleada o en caso de ya haber
     * eliminado a todos los zombis presentes en el jardín y solo si ya se ha spawneado el primer zombi
     * del nivel, es entonces cuando se spawneará un zombi nuevo.
     * Es necesario comprobar si ya se ha spawneado el primer zombi del nivel para no iniciar directamente
     * con un zombi en el jardín sin tener tiempo a plantar nada, ya que al no haber ningún zombi al iniciar
     * un nivel, la función se validará como verdadera.
     */
    return (
      this.zombiesSystem.spawnedZombies < this.hordes[this.currentHorde].killsBeforeHorde &&
      (p5.millis() >= this.nextSpawningTime ||
        (this.zombiesSystem.zombiesOnYourLawn <= 0 && this.zombiesSystem.firstZombieSpawned))
    )
  }

  shouldHordeStart(p5: P5) {
    return (
      this.currentHorde < this.hordes.length &&
      (this.zombiesSystem.killedZombies >= this.hordes[this.currentHorde].killsBeforeHorde ||
        p5.millis() >= this.nextSpawningTime) &&
      !this.isHordeTime
    )
  }

  spawnRandomWeightedZombie(p5: P5) {
    const zombies = this.isHordeTime
      ? this.hordes[this.currentHorde].hordeZombies
      : this.hordes[this.currentHorde].zombies
    const totalWeight = zombies.reduce((acc, v) => acc + v.weight, 0)
    const randomNum = p5.random(totalWeight)
    let cumulativeWeight = 0

    for (let i = 0; i < zombies.length; i++) {
      cumulativeWeight += zombies[i].weight

      if (randomNum >= cumulativeWeight) continue

      this.zombiesSystem.spawnZombie(p5, zombies[i].type)
      break
    }
  }

  updateZombieTimer(p5: P5) {
    if (this.killedZombies === this.zombiesSystem.killedZombies) return
    this.killedZombies++

    const [minTreshold] = SPAWNING_ZOMBIE_TIMER_TRESHOLD

    if (this.zombieTimer <= minTreshold) return

    this.zombieTimer = p5.max(minTreshold, this.zombieTimer - DECREMENT_PER_SPAWN)
    this.nextSpawningTime -= DECREMENT_PER_SPAWN
  }

  updateZombiesSpawning(p5: P5) {
    if (!this.shouldSpawnZombie(p5)) return

    const zombiesPerSpawn = p5.random(this.hordes[this.currentHorde].zombiesPerSpawn)
    for (let i = 0; i < zombiesPerSpawn; i++) {
      if (this.zombiesSystem.spawnedZombies >= this.hordes[this.currentHorde].killsBeforeHorde) break

      this.spawnRandomWeightedZombie(p5)
      this.progressBar.progress(this.currentHorde)
    }

    this.nextSpawningTime = p5.millis() + this.zombieTimer
  }

  updateHordeZombiesSpawning(p5: P5) {
    if (this.hordeZombiesSpawned < this.hordes[this.currentHorde].hordeSize) {
      if (p5.millis() < this.nextSpawningTime) return

      const zombiesPerSpawn = p5.random(this.hordes[this.currentHorde].zombiesPerSpawn)
      for (let i = 0; i < zombiesPerSpawn; i++) {
        if (this.hordeZombiesSpawned >= this.hordes[this.currentHorde].hordeSize) break

        this.spawnRandomWeightedZombie(p5)
        this.hordeZombiesSpawned++
      }

      this.nextSpawningTime = p5.millis() + SPAWNING_HORDE_TIMER
    } else {
      // Horda terminada.
      this.isHordeTime = false
      this.hordeZombiesSpawned = 0
      this.nextSpawningTime = p5.millis() + this.zombieTimer
      this.currentHorde++
    }
  }

  updateHorde(p5: P5) {
    if (this.currentHorde >= this.hordes.length) return

    this.isHordeTime ? this.updateHordeZombiesSpawning(p5) : this.updateZombiesSpawning(p5)

    if (!this.shouldHordeStart(p5)) return

    // Horda iniciada.
    this.zombiesSystem.spawnZombie(p5, ZombieId.FLAG_ZOMBIE)
    this.zombiesSystem.spawnedZombies--
    this.progressBar.raiseFlag(this.currentHorde)
    this.isHordeTime = true
    this.nextSpawningTime = p5.millis() + SPAWNING_HORDE_TIMER
  }

  update(p5: P5) {
    this.updateZombieTimer(p5)
    this.updateHorde(p5)

    this.zombiesSystem.update(p5)
  }

  draw(p5: P5) {
    this.zombiesSystem.draw(p5)
  }
}

export default HordeSystem
