import P5 from 'p5'
import { DEBUG } from '../constants/game'
import { SUN_HUD_SIZE } from '../constants/hud'
import {
  DESPAWNING_TIMER,
  DRAW_SUN_COORDS_POINT,
  DRAW_SUN_HITBOX,
  DRAW_SUN_SPRITE_BORDERS,
  FramesIndex,
  SUN_HITBOX_SIZE,
  SUN_SIZE,
  SUN_TIMER,
  SUN_VALUE
} from '../constants/sun'
import SunCounter from '../screen/SunCounter'
import Entity from './Entity'

class Sun extends Entity {
  value: number
  collected: boolean = false
  onSunEnd: (sun: Sun) => void
  despawnTime?: number
  stoppingY?: number

  constructor(
    p5: P5,
    x: number,
    y: number,
    hitbox: { x: number; y: number; w: number; h: number; isActive: boolean },
    onSunEnd: (sun: Sun) => void,
    value: number = SUN_VALUE,
    stoppingY?: number
  ) {
    Sun.spritesheet = SunCounter.spritesheet

    super(x, y, { ...hitbox })

    this.value = value
    this.onSunEnd = onSunEnd
    this.stoppingY = stoppingY
  }

  setDespawningTimer(p5: P5) {
    this.despawnTime = p5.millis() + DESPAWNING_TIMER
  }

  checkMousePosition(p5: P5) {
    if (
      this.hitbox.isActive &&
      p5.mouseX >= this.position.x - SUN_HITBOX_SIZE / 2 &&
      p5.mouseX <= this.position.x + SUN_HITBOX_SIZE / 2 &&
      p5.mouseY >= this.position.y - SUN_HITBOX_SIZE / 2 &&
      p5.mouseY <= this.position.y + SUN_HITBOX_SIZE / 2
    ) {
      this.collected = true
      this.hitbox.isActive = false
      this.despawnTime = undefined
    }
  }

  updateDespawn(p5: P5) {
    if (!this.despawnTime || p5.millis() < this.despawnTime) return

    this.onSunEnd(this)
  }

  updateAnimation(p5: P5) {
    if (p5.millis() < this.animationTimer) return

    this.animationFrame++
    if (this.animationFrame >= FramesIndex.length) this.animationFrame = 0

    this.animationTimer = p5.millis() + SUN_TIMER * p5.deltaTime
  }

  update(p5: P5) {
    if (!this.collected) this.checkMousePosition(p5)

    this.updateDespawn(p5)
    this.updateAnimation(p5)
  }

  draw(p5: P5) {
    p5.imageMode(p5.CENTER)

    p5.tint(255, 250)
    p5.image(
      Sun.spritesheet,
      this.position.x,
      this.position.y,
      SUN_SIZE,
      SUN_SIZE,
      26 * FramesIndex[this.animationFrame] + SUN_HUD_SIZE + this.animationFrame + 1,
      0,
      SUN_SIZE,
      SUN_SIZE
    )
    p5.noTint()

    if (DEBUG) this.debug(p5)
  }

  debug(p5: P5) {
    if (DRAW_SUN_HITBOX) this.drawHitbox(p5)

    if (DRAW_SUN_SPRITE_BORDERS) this.drawSpriteBorders(p5, this.position.x, this.position.y, SUN_SIZE, SUN_SIZE)

    if (DRAW_SUN_COORDS_POINT) this.drawCoordsPoint(p5)
  }
}

export default Sun
