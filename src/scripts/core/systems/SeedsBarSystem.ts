import P5, { Image } from 'p5'
import { SEED_PACKET_SIZE } from '../../constants/hud'
import SeedPacket from '../../entities/SeedPacket'
import SunSystem from './SunSystem'
import seedsSpritesheet from '/sprites/seeds.png'

class SeedsBarSystem {
  static spritesheet: Image

  x: number
  y: number
  selectedSeeds: Set<string> = new Set()
  seedPackets: SeedPacket[] = []
  sunSystem: SunSystem

  constructor(x: number, y: number, selectedSeeds: Set<string>, sunSystem: SunSystem) {
    this.x = x
    this.y = y
    this.selectedSeeds = selectedSeeds
    this.sunSystem = sunSystem

    const selectedSeedsArray = Array.from(this.selectedSeeds)

    for (let i = 0; i < this.selectedSeeds.size; i++) {
      this.seedPackets.push(new SeedPacket(this.x + SEED_PACKET_SIZE * i + i, this.y, selectedSeedsArray[i]))
    }
  }

  static preload(p5: P5) {
    SeedsBarSystem.spritesheet = p5.loadImage(seedsSpritesheet)
  }

  update(p5: P5) {
    for (const seedPacket of this.seedPackets) {
      seedPacket.hasEnoughSun = this.sunSystem.collectedSun >= seedPacket.sunCost
      seedPacket.update(p5)
    }
  }

  draw(p5: P5) {
    for (const seedPacket of this.seedPackets) {
      seedPacket.draw(p5)
    }
  }
}

export default SeedsBarSystem
