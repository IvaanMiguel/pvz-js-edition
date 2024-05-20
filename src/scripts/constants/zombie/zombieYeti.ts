import { SPEED_MULTIPLIER, TILE_HEIGHT } from '../game'

export const DRAW_ZOMBIE_YETI_COORDS_POINT = true
export const DRAW_ZOMBIE_YETI_SPRITE_BORDERS = true
export const DRAW_ZOMBIE_YETI_HITBOX = true
export const SHOW_ZOMBIE_YETI_HP = true

const ZOMBIE_WIDTH = 47
const ZOMBIE_HEIGHT = 67

export const ZOMBIE_YETI_OFFSET_Y = -(ZOMBIE_HEIGHT - TILE_HEIGHT) / 2
export const ZOMBIE_YETI_HITBOX_OFFSET_X = 4
export const ZOMBIE_YETI_HITBOX_WIDTH = 15
export const ZOMBIE_YETI_HITBOX_HEIGHT = TILE_HEIGHT * 0.9

export const ZOMBIE_YETI_HP = 3000
export const ZOMBIE_YETI_DMG = 300
export const ZOMBIE_YETI_SPEED = 2 / SPEED_MULTIPLIER

export const ZombieYetiState = {
  WALKING: {
    FULL: 'walking-full',
    DAMAGED: 'walking-damaged'
  },
  EATING: {
    FULL: 'eating-full',
    DAMAGED: 'eating-damaged'
  },
  DYING: 'dying'
}

export const ZombieYetiFrame = {
  WALKING_FULL_1: 'walking-full-1',
  WALKING_FULL_2: 'walking-full-2',
  WALKING_FULL_3: 'walking-full-3',
  WALKING_FULL_4: 'walking-full-4',
  WALKING_FULL_5: 'walking-full-5',
  WALKING_FULL_6: 'walking-full-6',

  WALKING_DAMAGED_1: 'walking-damaged-1',
  WALKING_DAMAGED_2: 'walking-damaged-2',
  WALKING_DAMAGED_3: 'walking-damaged-3',
  WALKING_DAMAGED_4: 'walking-damaged-4',
  WALKING_DAMAGED_5: 'walking-damaged-5',
  WALKING_DAMAGED_6: 'walking-damaged-6',

  EATING_FULL_1: 'eating-full-1',
  EATING_FULL_2: 'eating-full-2',
  EATING_FULL_3: 'eating-full-3',
  EATING_FULL_4: 'eating-full-4',

  EATING_DAMAGED_1: 'eating-damaged-1',
  EATING_DAMAGED_2: 'eating-damaged-2',
  EATING_DAMAGED_3: 'eating-damaged-3',
  EATING_DAMAGED_4: 'eating-damaged-4',

  DYING_1: 'dying-1',
  DYING_2: 'dying-2',
  DYING_3: 'dying-3',
  DYING_4: 'dying-4',
  DYING_5: 'dying-5',
  DYING_6: 'dying-6',
  DYING_7: 'dying-7'
}

const TIMER = 12 * SPEED_MULTIPLIER
const DYING_WIDTH = 65
const DYING_HEIGHT = 73

export const ZombieYetiKeyframe = {
  [ZombieYetiFrame.WALKING_FULL_1]: { originX: 1, originY: 1, w: ZOMBIE_WIDTH, h: ZOMBIE_HEIGHT, timer: TIMER },
  [ZombieYetiFrame.WALKING_FULL_2]: { originX: 49, originY: 1, w: ZOMBIE_WIDTH, h: ZOMBIE_HEIGHT, timer: TIMER },
  [ZombieYetiFrame.WALKING_FULL_3]: { originX: 97, originY: 1, w: ZOMBIE_WIDTH, h: ZOMBIE_HEIGHT, timer: TIMER },
  [ZombieYetiFrame.WALKING_FULL_4]: { originX: 145, originY: 1, w: ZOMBIE_WIDTH, h: ZOMBIE_HEIGHT, timer: TIMER },
  [ZombieYetiFrame.WALKING_FULL_5]: { originX: 193, originY: 1, w: ZOMBIE_WIDTH, h: ZOMBIE_HEIGHT, timer: TIMER },
  [ZombieYetiFrame.WALKING_FULL_6]: { originX: 241, originY: 1, w: ZOMBIE_WIDTH, h: ZOMBIE_HEIGHT, timer: TIMER },

  [ZombieYetiFrame.WALKING_DAMAGED_1]: { originX: 1, originY: 137, w: ZOMBIE_WIDTH, h: ZOMBIE_HEIGHT, timer: TIMER },
  [ZombieYetiFrame.WALKING_DAMAGED_2]: { originX: 49, originY: 137, w: ZOMBIE_WIDTH, h: ZOMBIE_HEIGHT, timer: TIMER },
  [ZombieYetiFrame.WALKING_DAMAGED_3]: { originX: 97, originY: 137, w: ZOMBIE_WIDTH, h: ZOMBIE_HEIGHT, timer: TIMER },
  [ZombieYetiFrame.WALKING_DAMAGED_4]: { originX: 145, originY: 137, w: ZOMBIE_WIDTH, h: ZOMBIE_HEIGHT, timer: TIMER },
  [ZombieYetiFrame.WALKING_DAMAGED_5]: { originX: 193, originY: 137, w: ZOMBIE_WIDTH, h: ZOMBIE_HEIGHT, timer: TIMER },
  [ZombieYetiFrame.WALKING_DAMAGED_6]: { originX: 241, originY: 137, w: ZOMBIE_WIDTH, h: ZOMBIE_HEIGHT, timer: TIMER },

  [ZombieYetiFrame.EATING_FULL_1]: { originX: 1, originY: 69, w: ZOMBIE_WIDTH, h: ZOMBIE_HEIGHT, timer: TIMER },
  [ZombieYetiFrame.EATING_FULL_2]: { originX: 49, originY: 69, w: ZOMBIE_WIDTH, h: ZOMBIE_HEIGHT, timer: TIMER },
  [ZombieYetiFrame.EATING_FULL_3]: { originX: 97, originY: 69, w: ZOMBIE_WIDTH, h: ZOMBIE_HEIGHT, timer: TIMER },
  [ZombieYetiFrame.EATING_FULL_4]: { originX: 145, originY: 69, w: ZOMBIE_WIDTH, h: ZOMBIE_HEIGHT, timer: TIMER },

  [ZombieYetiFrame.EATING_DAMAGED_1]: { originX: 1, originY: 205, w: ZOMBIE_WIDTH, h: ZOMBIE_HEIGHT, timer: TIMER },
  [ZombieYetiFrame.EATING_DAMAGED_2]: { originX: 49, originY: 205, w: ZOMBIE_WIDTH, h: ZOMBIE_HEIGHT, timer: TIMER },
  [ZombieYetiFrame.EATING_DAMAGED_3]: { originX: 97, originY: 205, w: ZOMBIE_WIDTH, h: ZOMBIE_HEIGHT, timer: TIMER },
  [ZombieYetiFrame.EATING_DAMAGED_4]: { originX: 145, originY: 205, w: ZOMBIE_WIDTH, h: ZOMBIE_HEIGHT, timer: TIMER },

  [ZombieYetiFrame.DYING_1]: { originX: 1, originY: 273, w: DYING_WIDTH, h: DYING_HEIGHT, timer: TIMER },
  [ZombieYetiFrame.DYING_2]: { originX: 67, originY: 273, w: DYING_WIDTH, h: DYING_HEIGHT, timer: TIMER },
  [ZombieYetiFrame.DYING_3]: { originX: 133, originY: 273, w: DYING_WIDTH, h: DYING_HEIGHT, timer: TIMER },
  [ZombieYetiFrame.DYING_4]: { originX: 199, originY: 273, w: DYING_WIDTH, h: DYING_HEIGHT, timer: TIMER },
  [ZombieYetiFrame.DYING_5]: { originX: 265, originY: 273, w: DYING_WIDTH, h: DYING_HEIGHT, timer: TIMER },
  [ZombieYetiFrame.DYING_6]: { originX: 331, originY: 273, w: DYING_WIDTH, h: DYING_HEIGHT, timer: TIMER },
  [ZombieYetiFrame.DYING_7]: { originX: 397, originY: 273, w: DYING_WIDTH, h: DYING_HEIGHT, timer: TIMER }
}

export const ZombieYetiAnimation = {
  [ZombieYetiState.WALKING.FULL]: [
    ZombieYetiKeyframe[ZombieYetiFrame.WALKING_FULL_1],
    ZombieYetiKeyframe[ZombieYetiFrame.WALKING_FULL_2],
    ZombieYetiKeyframe[ZombieYetiFrame.WALKING_FULL_3],
    ZombieYetiKeyframe[ZombieYetiFrame.WALKING_FULL_4],
    ZombieYetiKeyframe[ZombieYetiFrame.WALKING_FULL_5],
    ZombieYetiKeyframe[ZombieYetiFrame.WALKING_FULL_6]
  ],

  [ZombieYetiState.WALKING.DAMAGED]: [
    ZombieYetiKeyframe[ZombieYetiFrame.WALKING_DAMAGED_1],
    ZombieYetiKeyframe[ZombieYetiFrame.WALKING_DAMAGED_2],
    ZombieYetiKeyframe[ZombieYetiFrame.WALKING_DAMAGED_3],
    ZombieYetiKeyframe[ZombieYetiFrame.WALKING_DAMAGED_4],
    ZombieYetiKeyframe[ZombieYetiFrame.WALKING_DAMAGED_5],
    ZombieYetiKeyframe[ZombieYetiFrame.WALKING_DAMAGED_6]
  ],

  [ZombieYetiState.EATING.FULL]: [
    ZombieYetiKeyframe[ZombieYetiFrame.EATING_FULL_1],
    ZombieYetiKeyframe[ZombieYetiFrame.EATING_FULL_2],
    ZombieYetiKeyframe[ZombieYetiFrame.EATING_FULL_3],
    ZombieYetiKeyframe[ZombieYetiFrame.EATING_FULL_4]
  ],

  [ZombieYetiState.EATING.DAMAGED]: [
    ZombieYetiKeyframe[ZombieYetiFrame.EATING_DAMAGED_1],
    ZombieYetiKeyframe[ZombieYetiFrame.EATING_DAMAGED_2],
    ZombieYetiKeyframe[ZombieYetiFrame.EATING_DAMAGED_3],
    ZombieYetiKeyframe[ZombieYetiFrame.EATING_DAMAGED_4]
  ],

  [ZombieYetiState.DYING]: [
    ZombieYetiKeyframe[ZombieYetiFrame.DYING_1],
    ZombieYetiKeyframe[ZombieYetiFrame.DYING_2],
    ZombieYetiKeyframe[ZombieYetiFrame.DYING_3],
    ZombieYetiKeyframe[ZombieYetiFrame.DYING_4],
    ZombieYetiKeyframe[ZombieYetiFrame.DYING_5],
    ZombieYetiKeyframe[ZombieYetiFrame.DYING_6],
    ZombieYetiKeyframe[ZombieYetiFrame.DYING_7]
  ]
}
