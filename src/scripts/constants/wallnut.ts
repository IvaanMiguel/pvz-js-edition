import { SPEED_MULTIPLIER } from './game'

export const DRAW_WALLNUT_COORDS_POINT = true
export const DRAW_WALLNUT_SPRITE_BORDERS = false
export const DRAW_WALLNUT_HITBOX = true
export const SHOW_HP = true

export const WallnutState = {
  FULL: 'full',
  DAMAGED: 'damaged',
  DYING: 'dying'
}

export const WALLNUT_WIDTH = 26
export const WALLNUT_HEIGHT = 30
export const WALLNUT_HITBOX_WIDTH = WALLNUT_WIDTH + 5
export const WALLNUT_HITBOX_HEIGHT = WALLNUT_HEIGHT

export const WALLNUT_TIMER = 16 * SPEED_MULTIPLIER

export const FramesIndex = [0, 1, 2, 3, 4]
export const WallnutKeyframe = {
  [WallnutState.FULL]: { originX: 1 },
  [WallnutState.DAMAGED]: { originX: 33 },
  [WallnutState.DYING]: { originX: 64 }
}

export const WALLNUT_HP = 4000
