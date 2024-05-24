import { SPEED_MULTIPLIER, TILE_HEIGHT } from '../game'

export const DRAW_FLAG_ZOMBIE_COORDS_POINT = true
export const DRAW_FLAG_ZOMBIE_SPRITE_BORDERS = true
export const DRAW_FLAG_ZOMBIE_HITBOX = true
export const SHOW_FLAG_ZOMBIE_HP = true

const ZOMBIE_HEIGHT = 55

export const FLAG_ZOMBIE_OFFSET_Y = -(ZOMBIE_HEIGHT - TILE_HEIGHT) / 2
export const FLAG_ZOMBIE_HITBOX_OFFSET_X = 4
export const FLAG_ZOMBIE_HITBOX_WIDTH = 15
export const FLAG_ZOMBIE_HITBOX_HEIGHT = TILE_HEIGHT * 0.9

export const FLAG_ZOMBIE_HP = 181
export const FLAG_ZOMBIE_DMG = 100
export const FLAG_ZOMBIE_SPEED = 4 / SPEED_MULTIPLIER

export const FlagZombieState = {
  WALKING: {
    FULL: 'walking-full',
    DAMAGED: 'walking-damaged'
  },
  EATING: {
    FULL: 'eating-full',
    DAMAGED: 'eating-damaged'
  },
  LYING_DOWN: 'lying-down'
}

export const FlagZombieFrame = {
  WALKING_FULL_1: 'walking-full-1',
  WALKING_FULL_2: 'walking-full-2',
  WALKING_FULL_3: 'walking-full-3',
  WALKING_FULL_4: 'walking-full-4',
  WALKING_FULL_5: 'walking-full-5',
  WALKING_FULL_6: 'walking-full-6',
  WALKING_FULL_7: 'walking-full-7',

  WALKING_DAMAGED_1: 'walking-damaged-1',
  WALKING_DAMAGED_2: 'walking-damaged-2',
  WALKING_DAMAGED_3: 'walking-damaged-3',
  WALKING_DAMAGED_4: 'walking-damaged-4',
  WALKING_DAMAGED_5: 'walking-damaged-5',
  WALKING_DAMAGED_6: 'walking-damaged-6',
  WALKING_DAMAGED_7: 'walking-damaged-7',

  EATING_FULL_1: 'eating-full-1',
  EATING_FULL_2: 'eating-full-2',
  EATING_FULL_3: 'eating-full-3',
  EATING_FULL_4: 'eating-full-4',
  EATING_FULL_5: 'eating-full-5',
  EATING_FULL_6: 'eating-full-6',
  EATING_FULL_7: 'eating-full-7',

  EATING_DAMAGED_1: 'eating-damaged-1',
  EATING_DAMAGED_2: 'eating-damaged-2',
  EATING_DAMAGED_3: 'eating-damaged-3',
  EATING_DAMAGED_4: 'eating-damaged-4',
  EATING_DAMAGED_5: 'eating-damaged-5',
  EATING_DAMAGED_6: 'eating-damaged-6',
  EATING_DAMAGED_7: 'eating-damaged-7',
}

const TIMER = 10 * SPEED_MULTIPLIER

export const BasicZombeKeyframe = {
  [FlagZombieFrame.WALKING_FULL_1]: { originX: 1, originY: 1, w: 52, h: ZOMBIE_HEIGHT, timer: TIMER },
  [FlagZombieFrame.WALKING_FULL_2]: { originX: 54, originY: 1, w: 52, h: ZOMBIE_HEIGHT, timer: TIMER },
  [FlagZombieFrame.WALKING_FULL_3]: { originX: 107, originY: 1, w: 52, h: ZOMBIE_HEIGHT, timer: TIMER },
  [FlagZombieFrame.WALKING_FULL_4]: { originX: 160, originY: 1, w: 52, h: ZOMBIE_HEIGHT, timer: TIMER },
  [FlagZombieFrame.WALKING_FULL_5]: { originX: 213, originY: 1, w: 52, h: ZOMBIE_HEIGHT, timer: TIMER },
  [FlagZombieFrame.WALKING_FULL_6]: { originX: 266, originY: 1, w: 52, h: ZOMBIE_HEIGHT, timer: TIMER },
  [FlagZombieFrame.WALKING_FULL_7]: { originX: 319, originY: 1, w: 52, h: ZOMBIE_HEIGHT, timer: TIMER },

  [FlagZombieFrame.EATING_FULL_1]: { originX: 1, originY: 113, w: 54, h: ZOMBIE_HEIGHT, timer: TIMER },
  [FlagZombieFrame.EATING_FULL_2]: { originX: 56, originY: 113, w: 54, h: ZOMBIE_HEIGHT, timer: TIMER },
  [FlagZombieFrame.EATING_FULL_3]: { originX: 111, originY: 113, w: 54, h: ZOMBIE_HEIGHT, timer: TIMER },
  [FlagZombieFrame.EATING_FULL_4]: { originX: 166, originY: 113, w: 54, h: ZOMBIE_HEIGHT, timer: TIMER },
  [FlagZombieFrame.EATING_FULL_5]: { originX: 221, originY: 113, w: 54, h: ZOMBIE_HEIGHT, timer: TIMER },
  [FlagZombieFrame.EATING_FULL_6]: { originX: 276, originY: 113, w: 54, h: ZOMBIE_HEIGHT, timer: TIMER },
  [FlagZombieFrame.EATING_FULL_7]: { originX: 331, originY: 113, w: 54, h: ZOMBIE_HEIGHT, timer: TIMER },

  [FlagZombieFrame.WALKING_DAMAGED_1]: { originX: 1, originY: 57, w: 52, h: ZOMBIE_HEIGHT, timer: TIMER },
  [FlagZombieFrame.WALKING_DAMAGED_2]: { originX: 54, originY: 57, w: 52, h: ZOMBIE_HEIGHT, timer: TIMER },
  [FlagZombieFrame.WALKING_DAMAGED_3]: { originX: 107, originY: 57, w: 52, h: ZOMBIE_HEIGHT, timer: TIMER },
  [FlagZombieFrame.WALKING_DAMAGED_4]: { originX: 160, originY: 57, w: 52, h: ZOMBIE_HEIGHT, timer: TIMER },
  [FlagZombieFrame.WALKING_DAMAGED_5]: { originX: 213, originY: 57, w: 52, h: ZOMBIE_HEIGHT, timer: TIMER },
  [FlagZombieFrame.WALKING_DAMAGED_6]: { originX: 266, originY: 57, w: 52, h: ZOMBIE_HEIGHT, timer: TIMER },
  [FlagZombieFrame.WALKING_DAMAGED_7]: { originX: 319, originY: 57, w: 52, h: ZOMBIE_HEIGHT, timer: TIMER },

  [FlagZombieFrame.EATING_DAMAGED_1]: { originX: 1, originY: 169, w: 54, h: ZOMBIE_HEIGHT, timer: TIMER },
  [FlagZombieFrame.EATING_DAMAGED_2]: { originX: 56, originY: 169, w: 54, h: ZOMBIE_HEIGHT, timer: TIMER },
  [FlagZombieFrame.EATING_DAMAGED_3]: { originX: 111, originY: 169, w: 54, h: ZOMBIE_HEIGHT, timer: TIMER },
  [FlagZombieFrame.EATING_DAMAGED_4]: { originX: 166, originY: 169, w: 54, h: ZOMBIE_HEIGHT, timer: TIMER },
  [FlagZombieFrame.EATING_DAMAGED_5]: { originX: 221, originY: 169, w: 54, h: ZOMBIE_HEIGHT, timer: TIMER },
  [FlagZombieFrame.EATING_DAMAGED_6]: { originX: 276, originY: 169, w: 54, h: ZOMBIE_HEIGHT, timer: TIMER },
  [FlagZombieFrame.EATING_DAMAGED_7]: { originX: 331, originY: 169, w: 54, h: ZOMBIE_HEIGHT, timer: TIMER },
}

export const FlagZombieAnimation = {
  [FlagZombieState.WALKING.FULL]: [
    BasicZombeKeyframe[FlagZombieFrame.WALKING_FULL_1],
    BasicZombeKeyframe[FlagZombieFrame.WALKING_FULL_2],
    BasicZombeKeyframe[FlagZombieFrame.WALKING_FULL_3],
    BasicZombeKeyframe[FlagZombieFrame.WALKING_FULL_4],
    BasicZombeKeyframe[FlagZombieFrame.WALKING_FULL_5],
    BasicZombeKeyframe[FlagZombieFrame.WALKING_FULL_6],
    BasicZombeKeyframe[FlagZombieFrame.WALKING_FULL_7]
  ],

  [FlagZombieState.WALKING.DAMAGED]: [
    BasicZombeKeyframe[FlagZombieFrame.WALKING_DAMAGED_1],
    BasicZombeKeyframe[FlagZombieFrame.WALKING_DAMAGED_2],
    BasicZombeKeyframe[FlagZombieFrame.WALKING_DAMAGED_3],
    BasicZombeKeyframe[FlagZombieFrame.WALKING_DAMAGED_4],
    BasicZombeKeyframe[FlagZombieFrame.WALKING_DAMAGED_5],
    BasicZombeKeyframe[FlagZombieFrame.WALKING_DAMAGED_6],
    BasicZombeKeyframe[FlagZombieFrame.WALKING_DAMAGED_7]
  ],

  [FlagZombieState.EATING.FULL]: [
    BasicZombeKeyframe[FlagZombieFrame.EATING_FULL_1],
    BasicZombeKeyframe[FlagZombieFrame.EATING_FULL_2],
    BasicZombeKeyframe[FlagZombieFrame.EATING_FULL_3],
    BasicZombeKeyframe[FlagZombieFrame.EATING_FULL_4],
    BasicZombeKeyframe[FlagZombieFrame.EATING_FULL_5],
    BasicZombeKeyframe[FlagZombieFrame.EATING_FULL_6],
    BasicZombeKeyframe[FlagZombieFrame.EATING_FULL_7]
  ],

  [FlagZombieState.EATING.DAMAGED]: [
    BasicZombeKeyframe[FlagZombieFrame.EATING_DAMAGED_1],
    BasicZombeKeyframe[FlagZombieFrame.EATING_DAMAGED_2],
    BasicZombeKeyframe[FlagZombieFrame.EATING_DAMAGED_3],
    BasicZombeKeyframe[FlagZombieFrame.EATING_DAMAGED_4],
    BasicZombeKeyframe[FlagZombieFrame.EATING_DAMAGED_5],
    BasicZombeKeyframe[FlagZombieFrame.EATING_DAMAGED_6],
    BasicZombeKeyframe[FlagZombieFrame.EATING_DAMAGED_7]
  ],
}
