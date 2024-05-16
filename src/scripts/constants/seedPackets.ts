import Peashooter from '../entities/plants/Peashooter'
import PotatoMine from '../entities/plants/PotatoMine'
import Sunflower from '../entities/plants/Sunflower'
import Wallnut from '../entities/plants/Wallnut'
import { PlantId, RechargingTime } from './plants/plants'

export const SeedStats = {
  [PlantId.PEASHOOTER]: { sunCost: 100, rechargingTime: RechargingTime.FAST, readyOnStart: false },
  [PlantId.SUNFLOWER]: { sunCost: 50, rechargingTime: RechargingTime.FAST, readyOnStart: true },
  [PlantId.WALLNUT]: { sunCost: 50, rechargingTime: RechargingTime.SLOW, readyOnStart: false },
  [PlantId.POTATO_MINE]: { sunCost: 25, rechargingTime: RechargingTime.SLOW, readyOnStart: false },
  [PlantId.REPEATER]: { sunCost: 200, rechargingTime: RechargingTime.FAST, readyOnStart: false }
}

export const SeedPlaceholder = {
  [PlantId.PEASHOOTER]: Peashooter.getPlaceholder,
  [PlantId.WALLNUT]: Wallnut.getPlaceholder,
  [PlantId.SUNFLOWER]: Sunflower.getPlaceholder,
  [PlantId.POTATO_MINE]: PotatoMine.getPlaceholder
}

export const SeedCoords = {
  [PlantId.PEASHOOTER]: { originX: 1, originY: 1, offsetX: 0, w: 24, h: 24 },
  [PlantId.SUNFLOWER]: { originX: 26, originY: 1, offsetX: -1, w: 25, h: 24 },
  [PlantId.WALLNUT]: { originX: 52, originY: 1, offsetX: 0, w: 24, h: 24 },
  [PlantId.POTATO_MINE]: { originX: 77, originY: 1, offsetX: 0, w: 24, h: 24 },
  [PlantId.REPEATER]: { originX: 102, originY: 1, offsetX: 0, w: 25, h: 24 }
}

export const NOT_AVAILABLE_TINT = 255 * 0.25
export const RECHARGING_TINT = 255 * 0.5
export const SELECTED_TINT = 255 * 0.75
