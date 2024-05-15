import P5 from 'p5'
import {
  INITIAL_SUN_AMOUNT,
  LAWN_HEIGHT,
  LAWN_OFFSET_X,
  LAWN_OFFSET_Y,
  LAWN_WIDTH,
  MAX_SUN_AMOUNT,
  SPAWNING_SUN_TIMER
} from '../../constants/game'
import { LERP_AMOUNT, SUN_DX, SUN_DY } from '../../constants/hud'
import { FALLING_SPEED, SUN_HITBOX_SIZE, SUN_SIZE, SUN_VALUE } from '../../constants/sun'
import Sun from '../../entities/Sun'

class SunSystem {
  suns: Sun[] = []
  spawningTimer: number
  collectedSun: number = INITIAL_SUN_AMOUNT

  constructor(p5: P5) {
    this.spawningTimer = p5.millis() + SPAWNING_SUN_TIMER / 4
  }

  onSunEnd = (sun: Sun) => {
    const index = this.suns.indexOf(sun)
    this.suns.splice(index, 1)
  }

  addSun = (x: number, y: number, stoppingY: number) => {
    this.suns.push(
      new Sun(
        x,
        y,
        {
          x: x - SUN_HITBOX_SIZE / 2,
          y: y - SUN_HITBOX_SIZE / 2,
          w: SUN_HITBOX_SIZE,
          h: SUN_HITBOX_SIZE,
          isActive: true
        },
        this.onSunEnd,
        SUN_VALUE,
        stoppingY
      )
    )
  }

  spawnSun(p5: P5) {
    const x = p5.random(LAWN_OFFSET_X + SUN_SIZE / 2, LAWN_OFFSET_X + LAWN_WIDTH - SUN_SIZE / 2)
    const y = SUN_SIZE / 2
    const stoppingY = p5.random(LAWN_OFFSET_Y + SUN_SIZE / 2, LAWN_OFFSET_Y + LAWN_HEIGHT - SUN_SIZE / 2)

    this.addSun(x, y, stoppingY)
  }

  updateSpawningTimer(p5: P5) {
    if (p5.millis() < this.spawningTimer) return

    this.spawningTimer = p5.millis() + SPAWNING_SUN_TIMER
    this.spawnSun(p5)
  }

  updateCollectedPosition(p5: P5, sun: Sun) {
    if (p5.round(sun.position.x) === SUN_DX && p5.round(sun.position.y) === SUN_DY) {
      this.collectedSun + sun.value < MAX_SUN_AMOUNT
        ? (this.collectedSun += sun.value)
        : (this.collectedSun = MAX_SUN_AMOUNT)

      this.onSunEnd(sun)
      return
    }

    sun.position.x = p5.lerp(sun.position.x, SUN_DX, LERP_AMOUNT)
    sun.position.y = p5.lerp(sun.position.y, SUN_DY, LERP_AMOUNT)
  }

  updateFallingPosition(p5: P5, sun: Sun) {
    const yVelocity = FALLING_SPEED * (p5.deltaTime / 1000)

    sun.position.add(0, yVelocity)
    sun.hitbox.position.add(0, yVelocity)
  }

  updateSunPosition(p5: P5, sun: Sun) {
    if (sun.collected) {
      this.updateCollectedPosition(p5, sun)
      return
    }

    if (!sun.stoppingY) return

    if (sun.position.y < sun.stoppingY) this.updateFallingPosition(p5, sun)

    if (sun.position.y >= sun.stoppingY && !sun.despawnTime) sun.setDespawningTimer(p5)
  }

  updateSuns(p5: P5) {
    for (const sun of this.suns) {
      sun.update(p5)
      this.updateSunPosition(p5, sun)
    }
  }

  update(p5: P5) {
    this.updateSpawningTimer(p5)
    this.updateSuns(p5)
  }

  draw(p5: P5) {
    for (const sun of this.suns) {
      sun.draw(p5)
    }
  }
}

export default SunSystem
