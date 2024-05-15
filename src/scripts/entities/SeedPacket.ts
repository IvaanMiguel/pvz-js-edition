import P5, { Image } from 'p5'
import { SEED_PACKET_SIZE } from '../constants/hud'
import { NOT_AVAILABLE_TINT, RECHARGING_TINT, SELECTED_TINT, SeedCoords, SeedStats } from '../constants/seedPackets'
import SeedsBarSystem from '../core/systems/SeedsBarSystem'

class SeedPacket {
  static spritesheet: Image

  x: number
  y: number
  plantId: string
  sunCost: number
  rechargingTime: number
  remainingTime: number

  hasEnoughSun: boolean = false
  isAvailable: boolean = true
  isSelected: boolean = false

  constructor(x: number, y: number, plantId: string) {
    this.x = x
    this.y = y
    this.plantId = plantId

    const seedStats = SeedStats[this.plantId]

    this.sunCost = seedStats.sunCost
    this.rechargingTime = seedStats.rechargingTime
    this.remainingTime = seedStats.readyOnStart ? 0 : seedStats.rechargingTime

    SeedPacket.spritesheet = SeedsBarSystem.spritesheet
  }

  resetRechargingTime() {
    this.remainingTime = this.rechargingTime
  }

  setIsAvailable(isAvailable: boolean) {
    this.isAvailable = isAvailable
  }

  isMouseOnSeeds = (p5: P5) => {
    return (
      this.isAvailable &&
      this.hasEnoughSun &&
      p5.mouseX >= this.x &&
      p5.mouseX <= this.x + SEED_PACKET_SIZE &&
      p5.mouseY >= this.y &&
      p5.mouseY <= this.y + SEED_PACKET_SIZE
    )
  }

  updateRechargingTime(p5: P5) {
    if (this.remainingTime <= 0) return

    this.remainingTime -= p5.deltaTime
  }

  update(p5: P5) {
    this.isAvailable = this.remainingTime <= 0

    this.updateRechargingTime(p5)
  }

  drawRechargingAnimation(p5: P5) {
    const { originX, offsetX, w, h } = SeedCoords[this.plantId]
    const offsetY = (h / this.rechargingTime) * this.remainingTime
    const maskHeight = h - offsetY

    p5.tint(RECHARGING_TINT)
    p5.image(SeedPacket.spritesheet, this.x + offsetX, offsetY, w, maskHeight, originX, offsetY + 1, w, maskHeight)
    p5.noTint()
  }

  drawTint(p5: P5) {
    if (!this.isAvailable) {
      p5.tint(NOT_AVAILABLE_TINT)
    } else if (this.isAvailable && !this.hasEnoughSun) {
      p5.tint(RECHARGING_TINT)
    } else if (this.isSelected) {
      p5.tint(SELECTED_TINT)
    }
  }

  draw(p5: P5) {
    this.drawTint(p5)

    const { originX, originY, offsetX, w, h } = SeedCoords[this.plantId]

    p5.rectMode(p5.CORNER)
    p5.image(SeedPacket.spritesheet, this.x + offsetX, this.y, w, h, originX, originY, w, h)

    if (this.remainingTime > 0) this.drawRechargingAnimation(p5)

    p5.noTint()
  }
}

export default SeedPacket
