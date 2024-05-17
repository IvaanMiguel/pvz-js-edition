import { SPEED_MULTIPLIER } from '../game'

export const DRAW_WALLNUT_COORDS_POINT = true
export const DRAW_WALLNUT_SPRITE_BORDERS = false
export const DRAW_WALLNUT_HITBOX = true
export const SHOW_HP = true

export const WALLNUT_HP = 4000
export const WALLNUT_WIDTH = 26
export const WALLNUT_HEIGHT = 30
export const WALLNUT_HITBOX_WIDTH = WALLNUT_WIDTH + 5
export const WALLNUT_HITBOX_HEIGHT = WALLNUT_HEIGHT

export const WallnutState = {
  FULL: 'full',
  DAMAGED: 'damaged',
  DYING: 'dying'
}

export const WallnutFrame = {
  FULL_1: 'full-1',
  FULL_2: 'full-2',
  FULL_3: 'full-3',
  FULL_4: 'full-4',
  FULL_5: 'full-5',

  DAMAGED_1: 'damaged-1',
  DAMAGED_2: 'damaged-2',
  DAMAGED_3: 'damaged-3',
  DAMAGED_4: 'damaged-4',
  DAMAGED_5: 'damaged-5',

  DYING_1: 'dying-1',
  DYING_2: 'dying-2',
  DYING_3: 'dying-3',
  DYING_4: 'dying-4',
  DYING_5: 'dying-5'
}

const TIMER = 16 * SPEED_MULTIPLIER

export const WallnutKeyframe = {
  [WallnutFrame.FULL_1]: { originX: 1, originY: 1, w: WALLNUT_WIDTH, h: WALLNUT_HEIGHT, timer: TIMER },
  [WallnutFrame.FULL_2]: { originX: 28, originY: 1, w: WALLNUT_WIDTH, h: WALLNUT_HEIGHT, timer: TIMER },
  [WallnutFrame.FULL_3]: { originX: 55, originY: 1, w: WALLNUT_WIDTH, h: WALLNUT_HEIGHT, timer: TIMER },
  [WallnutFrame.FULL_4]: { originX: 82, originY: 1, w: WALLNUT_WIDTH, h: WALLNUT_HEIGHT, timer: TIMER },
  [WallnutFrame.FULL_5]: { originX: 109, originY: 1, w: WALLNUT_WIDTH, h: WALLNUT_HEIGHT, timer: TIMER },

  [WallnutFrame.DAMAGED_1]: { originX: 1, originY: 33, w: WALLNUT_WIDTH, h: WALLNUT_HEIGHT, timer: TIMER },
  [WallnutFrame.DAMAGED_2]: { originX: 28, originY: 33, w: WALLNUT_WIDTH, h: WALLNUT_HEIGHT, timer: TIMER },
  [WallnutFrame.DAMAGED_3]: { originX: 55, originY: 33, w: WALLNUT_WIDTH, h: WALLNUT_HEIGHT, timer: TIMER },
  [WallnutFrame.DAMAGED_4]: { originX: 82, originY: 33, w: WALLNUT_WIDTH, h: WALLNUT_HEIGHT, timer: TIMER },
  [WallnutFrame.DAMAGED_5]: { originX: 109, originY: 33, w: WALLNUT_WIDTH, h: WALLNUT_HEIGHT, timer: TIMER },

  [WallnutFrame.DYING_1]: { originX: 1, originY: 64, w: WALLNUT_WIDTH, h: WALLNUT_HEIGHT, timer: TIMER },
  [WallnutFrame.DYING_2]: { originX: 28, originY: 64, w: WALLNUT_WIDTH, h: WALLNUT_HEIGHT, timer: TIMER },
  [WallnutFrame.DYING_3]: { originX: 55, originY: 64, w: WALLNUT_WIDTH, h: WALLNUT_HEIGHT, timer: TIMER },
  [WallnutFrame.DYING_4]: { originX: 82, originY: 64, w: WALLNUT_WIDTH, h: WALLNUT_HEIGHT, timer: TIMER },
  [WallnutFrame.DYING_5]: { originX: 109, originY: 64, w: WALLNUT_WIDTH, h: WALLNUT_HEIGHT, timer: TIMER }
}

export const WallnutAnimation = {
  [WallnutState.FULL]: [
    WallnutKeyframe[WallnutFrame.FULL_1],
    WallnutKeyframe[WallnutFrame.FULL_2],
    WallnutKeyframe[WallnutFrame.FULL_3],
    WallnutKeyframe[WallnutFrame.FULL_4],
    WallnutKeyframe[WallnutFrame.FULL_5]
  ],

  [WallnutState.DAMAGED]: [
    WallnutKeyframe[WallnutFrame.DAMAGED_1],
    WallnutKeyframe[WallnutFrame.DAMAGED_2],
    WallnutKeyframe[WallnutFrame.DAMAGED_3],
    WallnutKeyframe[WallnutFrame.DAMAGED_4],
    WallnutKeyframe[WallnutFrame.DAMAGED_5]
  ],

  [WallnutState.DYING]: [
    WallnutKeyframe[WallnutFrame.DYING_1],
    WallnutKeyframe[WallnutFrame.DYING_2],
    WallnutKeyframe[WallnutFrame.DYING_3],
    WallnutKeyframe[WallnutFrame.DYING_4],
    WallnutKeyframe[WallnutFrame.DYING_5]
  ],
}
