import P5 from 'p5'
import { TILE_HEIGHT, TILE_WIDTH } from '../constants/game'
import { SeedPlaceholder } from '../constants/seedPackets'
import SeedPacket from '../entities/SeedPacket'
import GameState from './GameState'
import PlantFactory from './PlantFactory'
import LawnSystem from './systems/LawnSystem'
import PeasSystem from './systems/PeasSystem'
import SeedsBarSystem from './systems/SeedsBarSystem'
import SunSystem from './systems/SunSystem'

class Player {
  plantFactory: PlantFactory

  gameState: GameState

  lawnSystem: LawnSystem
  peasSystem: PeasSystem
  sunSystem: SunSystem
  seedsBarSystem: SeedsBarSystem

  plantMode: boolean = false
  selectedSeedPacket: SeedPacket | null = null

  lawnCoords: { x: number | null; y: number | null } = { x: null, y: null }
  lawnPosition: { row: number | null; col: number | null } = { row: null, col: null }

  constructor(
    p5: P5,
    gameState: GameState,
    lawnSystem: LawnSystem,
    peasSystem: PeasSystem,
    sunSystem: SunSystem,
    seedsBarSystem: SeedsBarSystem
  ) {
    this.gameState = gameState
    this.lawnSystem = lawnSystem
    this.peasSystem = peasSystem
    this.sunSystem = sunSystem
    this.seedsBarSystem = seedsBarSystem

    this.plantFactory = new PlantFactory(this.peasSystem, this.sunSystem)

    p5.mouseClicked = () => this.onMouseClicked(p5)
  }

  restart() {
    this.plantMode = false
    this.selectedSeedPacket = null
  }

  isMouseInsideLawn(p5: P5) {
    return (
      p5.mouseX >= this.lawnSystem.x &&
      p5.mouseX <= this.lawnSystem.x + this.lawnSystem.w &&
      p5.mouseY >= this.lawnSystem.y &&
      p5.mouseY <= this.lawnSystem.y + this.lawnSystem.h
    )
  }

  resetPlantMode() {
    this.plantMode = false
    this.selectedSeedPacket!.isSelected = false
    this.selectedSeedPacket = null
  }

  onLawnClicked(p5: P5) {
    if (!this.plantMode || !this.selectedSeedPacket) return

    if (!this.isMouseInsideLawn(p5) || this.lawnSystem.getLawnTile(this.lawnPosition.row, this.lawnPosition.col)) {
      this.resetPlantMode()
      return
    }

    const plant = this.plantFactory.createPlant(
      p5,
      this.selectedSeedPacket.plantId,
      this.lawnCoords.x!,
      this.lawnCoords.y!,
      this.lawnPosition.row!
    )

    if (plant) {
      this.sunSystem.collectedSun -= this.selectedSeedPacket.sunCost
      this.lawnSystem.plantTile(plant, this.lawnPosition.row!, this.lawnPosition.col!)
      this.selectedSeedPacket.resetRechargingTime()
    }

    this.resetPlantMode()
  }

  onSeedPacketClicked(p5: P5) {
    for (const seedPacket of this.seedsBarSystem.seedPackets) {
      if (seedPacket.isMouseOnSeeds(p5)) {
        seedPacket.isSelected = true

        this.plantMode = true
        this.selectedSeedPacket = seedPacket
        break
      }
    }
  }

  drawLawnPlaceholder(p5: P5) {
    if (!this.isMouseInsideLawn(p5) || this.lawnSystem.getLawnTile(this.lawnPosition.row, this.lawnPosition.col)) {
      return
    }

    if (this.lawnCoords.x !== null && this.lawnCoords.y !== null) {
      p5.tint(255, 127)
      p5.image(SeedPlaceholder[this.selectedSeedPacket!.plantId](), this.lawnCoords.x, this.lawnCoords.y)
      p5.noTint()
    }
  }

  drawMousePlaceholder(p5: P5) {
    p5.image(SeedPlaceholder[this.selectedSeedPacket!.plantId](), p5.mouseX, p5.mouseY)
  }

  draw(p5: P5) {
    if (!this.selectedSeedPacket || typeof SeedPlaceholder[this.selectedSeedPacket.plantId] !== 'function') return

    p5.imageMode(p5.CENTER)
    this.drawLawnPlaceholder(p5)
    this.drawMousePlaceholder(p5)
  }

  update(p5: P5) {
    if (this.gameState.gameEnded) {
      this.selectedSeedPacket = null
      return
    }

    if (!this.isMouseInsideLawn(p5)) {
      this.lawnPosition = { row: null, col: null }
      this.lawnCoords = { x: null, y: null }
      return
    }

    this.lawnPosition.col = p5.floor((p5.mouseX - this.lawnSystem.x) / TILE_WIDTH)
    this.lawnPosition.row = p5.floor((p5.mouseY - this.lawnSystem.y) / TILE_HEIGHT)
    this.lawnCoords.x = (this.lawnPosition.col + 1) * TILE_WIDTH + this.lawnSystem.x - TILE_WIDTH / 2
    this.lawnCoords.y = (this.lawnPosition.row + 1) * TILE_HEIGHT + this.lawnSystem.y - TILE_HEIGHT / 2
  }

  onMouseClicked(p5: P5) {
    if (this.gameState.gameEnded) return

    this.onLawnClicked(p5)
    this.onSeedPacketClicked(p5)
  }
}

export default Player
