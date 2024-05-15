import P5 from 'p5'
import { PlantId } from '../constants/plants'
import Peashooter from '../entities/plants/Peashooter'
import Wallnut from '../entities/plants/Wallnut'
import PeasSystem from './systems/PeasSystem'

class PlantFactory {
  peasSystem: PeasSystem

  constructor(peasSystem: PeasSystem) {
    this.peasSystem = peasSystem
  }

  createPlant(p5: P5, plantId: string, x: number, y: number, lawnRow: number) {
    switch (plantId) {
      case PlantId.PEASHOOTER:
        return new Peashooter(p5, x, y, lawnRow, this.peasSystem.addPea)
      case PlantId.WALLNUT:
        return new Wallnut(x, y, lawnRow)
      default:
        return null
    }
  }
}

export default PlantFactory
