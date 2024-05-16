import P5 from 'p5'
import { PlantId } from '../constants/plants/plants'
import Peashooter from '../entities/plants/Peashooter'
import PotatoMine from '../entities/plants/PotatoMine'
import Sunflower from '../entities/plants/Sunflower'
import Wallnut from '../entities/plants/Wallnut'
import PeasSystem from './systems/PeasSystem'
import SunSystem from './systems/SunSystem'

class PlantFactory {
  peasSystem: PeasSystem
  sunSystem: SunSystem

  constructor(peasSystem: PeasSystem, sunSystem: SunSystem) {
    this.peasSystem = peasSystem
    this.sunSystem = sunSystem
  }

  createPlant(p5: P5, plantId: string, x: number, y: number, lawnRow: number) {
    switch (plantId) {
      case PlantId.PEASHOOTER:
        return new Peashooter(p5, x, y, lawnRow, this.peasSystem.addPea)
      case PlantId.WALLNUT:
        return new Wallnut(x, y, lawnRow)
      case PlantId.SUNFLOWER:
        return new Sunflower(p5, x, y, this.sunSystem.addSun)
      case PlantId.POTATO_MINE:
        return new PotatoMine(p5, x, y, lawnRow)
      default:
        return null
    }
  }
}

export default PlantFactory
