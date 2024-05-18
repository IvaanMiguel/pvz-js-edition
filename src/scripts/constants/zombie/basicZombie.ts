import { SPEED_MULTIPLIER, TILE_HEIGHT } from '../game'

export const DRAW_BASIC_ZOMBIE_COORDS_POINT = true
export const DRAW_BASIC_ZOMBIE_SPRITE_BORDERS = true
export const DRAW_BASIC_ZOMBIE_HITBOX = true
export const SHOW_BASIC_ZOMBIE_HP = true

const ZOMBIE_WIDTH = 36
const ZOMBIE_HEIGHT = 55

export const BASIC_ZOMBIE_OFFSET_Y = -(ZOMBIE_HEIGHT - TILE_HEIGHT) / 2
export const BASIC_ZOMBIE_HITBOX_OFFSET_X = 4
export const BASIC_ZOMBIE_HITBOX_WIDTH = 15
export const BASIC_ZOMBIE_HITBOX_HEIGHT = TILE_HEIGHT * 0.9

export const BASIC_ZOMBIE_HP = 181
export const BASIC_ZOMBIE_DMG = 100
export const ZOMBIE_SPEED = 3 / SPEED_MULTIPLIER

export const BasicZombieState = {
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

export const BasicZombieFrame = {
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

  LYING_DOWN_1: 'lying-down-1',
  LYING_DOWN_2: 'lying-down-2',
  LYING_DOWN_3: 'lying-down-3',
  LYING_DOWN_4: 'lying-down-4',
  LYING_DOWN_5: 'lying-down-5',
  LYING_DOWN_6: 'lying-down-6',
  LYING_DOWN_7: 'lying-down-7',
  LYING_DOWN_8: 'lying-down-8',
  LYING_DOWN_9: 'lying-down-9'
}

const TIMER = 10 * SPEED_MULTIPLIER
const LYING_DOWN_WIDTH = 62
const LYING_DOWN_HEIGHT = 57

export const BasicZombeKeyframe = {
  [BasicZombieFrame.WALKING_FULL_1]: { originX: 1, originY: 1, w: ZOMBIE_WIDTH, h: ZOMBIE_HEIGHT, timer: TIMER },
  [BasicZombieFrame.WALKING_FULL_2]: { originX: 38, originY: 1, w: ZOMBIE_WIDTH, h: ZOMBIE_HEIGHT, timer: TIMER },
  [BasicZombieFrame.WALKING_FULL_3]: { originX: 75, originY: 1, w: ZOMBIE_WIDTH, h: ZOMBIE_HEIGHT, timer: TIMER },
  [BasicZombieFrame.WALKING_FULL_4]: { originX: 112, originY: 1, w: ZOMBIE_WIDTH, h: ZOMBIE_HEIGHT, timer: TIMER },
  [BasicZombieFrame.WALKING_FULL_5]: { originX: 149, originY: 1, w: ZOMBIE_WIDTH, h: ZOMBIE_HEIGHT, timer: TIMER },
  [BasicZombieFrame.WALKING_FULL_6]: { originX: 186, originY: 1, w: ZOMBIE_WIDTH, h: ZOMBIE_HEIGHT, timer: TIMER },
  [BasicZombieFrame.WALKING_FULL_7]: { originX: 223, originY: 1, w: ZOMBIE_WIDTH, h: ZOMBIE_HEIGHT, timer: TIMER },

  [BasicZombieFrame.EATING_FULL_1]: { originX: 1, originY: 57, w: ZOMBIE_WIDTH, h: ZOMBIE_HEIGHT, timer: TIMER },
  [BasicZombieFrame.EATING_FULL_2]: { originX: 38, originY: 57, w: ZOMBIE_WIDTH, h: ZOMBIE_HEIGHT, timer: TIMER },
  [BasicZombieFrame.EATING_FULL_3]: { originX: 75, originY: 57, w: ZOMBIE_WIDTH, h: ZOMBIE_HEIGHT, timer: TIMER },
  [BasicZombieFrame.EATING_FULL_4]: { originX: 112, originY: 57, w: ZOMBIE_WIDTH, h: ZOMBIE_HEIGHT, timer: TIMER },
  [BasicZombieFrame.EATING_FULL_5]: { originX: 149, originY: 57, w: ZOMBIE_WIDTH, h: ZOMBIE_HEIGHT, timer: TIMER },
  [BasicZombieFrame.EATING_FULL_6]: { originX: 186, originY: 57, w: ZOMBIE_WIDTH, h: ZOMBIE_HEIGHT, timer: TIMER },
  [BasicZombieFrame.EATING_FULL_7]: { originX: 223, originY: 57, w: ZOMBIE_WIDTH, h: ZOMBIE_HEIGHT, timer: TIMER },

  [BasicZombieFrame.WALKING_DAMAGED_1]: { originX: 1, originY: 113, w: ZOMBIE_WIDTH, h: ZOMBIE_HEIGHT, timer: TIMER },
  [BasicZombieFrame.WALKING_DAMAGED_2]: { originX: 38, originY: 113, w: ZOMBIE_WIDTH, h: ZOMBIE_HEIGHT, timer: TIMER },
  [BasicZombieFrame.WALKING_DAMAGED_3]: { originX: 75, originY: 113, w: ZOMBIE_WIDTH, h: ZOMBIE_HEIGHT, timer: TIMER },
  [BasicZombieFrame.WALKING_DAMAGED_4]: { originX: 112, originY: 113, w: ZOMBIE_WIDTH, h: ZOMBIE_HEIGHT, timer: TIMER },
  [BasicZombieFrame.WALKING_DAMAGED_5]: { originX: 149, originY: 113, w: ZOMBIE_WIDTH, h: ZOMBIE_HEIGHT, timer: TIMER },
  [BasicZombieFrame.WALKING_DAMAGED_6]: { originX: 186, originY: 113, w: ZOMBIE_WIDTH, h: ZOMBIE_HEIGHT, timer: TIMER },
  [BasicZombieFrame.WALKING_DAMAGED_7]: { originX: 223, originY: 113, w: ZOMBIE_WIDTH, h: ZOMBIE_HEIGHT, timer: TIMER },

  [BasicZombieFrame.EATING_DAMAGED_1]: { originX: 1, originY: 169, w: ZOMBIE_WIDTH, h: ZOMBIE_HEIGHT, timer: TIMER },
  [BasicZombieFrame.EATING_DAMAGED_2]: { originX: 38, originY: 169, w: ZOMBIE_WIDTH, h: ZOMBIE_HEIGHT, timer: TIMER },
  [BasicZombieFrame.EATING_DAMAGED_3]: { originX: 75, originY: 169, w: ZOMBIE_WIDTH, h: ZOMBIE_HEIGHT, timer: TIMER },
  [BasicZombieFrame.EATING_DAMAGED_4]: { originX: 112, originY: 169, w: ZOMBIE_WIDTH, h: ZOMBIE_HEIGHT, timer: TIMER },
  [BasicZombieFrame.EATING_DAMAGED_5]: { originX: 149, originY: 169, w: ZOMBIE_WIDTH, h: ZOMBIE_HEIGHT, timer: TIMER },
  [BasicZombieFrame.EATING_DAMAGED_6]: { originX: 186, originY: 169, w: ZOMBIE_WIDTH, h: ZOMBIE_HEIGHT, timer: TIMER },
  [BasicZombieFrame.EATING_DAMAGED_7]: { originX: 223, originY: 169, w: ZOMBIE_WIDTH, h: ZOMBIE_HEIGHT, timer: TIMER },

  [BasicZombieFrame.LYING_DOWN_1]: { originX: 1, originY: 225, w: LYING_DOWN_WIDTH, h: LYING_DOWN_HEIGHT, timer: TIMER },
  [BasicZombieFrame.LYING_DOWN_2]: { originX: 64, originY: 225, w: LYING_DOWN_WIDTH, h: LYING_DOWN_HEIGHT, timer: TIMER },
  [BasicZombieFrame.LYING_DOWN_3]: { originX: 127, originY: 225, w: LYING_DOWN_WIDTH, h: LYING_DOWN_HEIGHT, timer: TIMER },
  [BasicZombieFrame.LYING_DOWN_4]: { originX: 190, originY: 225, w: LYING_DOWN_WIDTH, h: LYING_DOWN_HEIGHT, timer: TIMER },
  [BasicZombieFrame.LYING_DOWN_5]: { originX: 253, originY: 225, w: LYING_DOWN_WIDTH, h: LYING_DOWN_HEIGHT, timer: TIMER },
  [BasicZombieFrame.LYING_DOWN_6]: { originX: 316, originY: 225, w: LYING_DOWN_WIDTH, h: LYING_DOWN_HEIGHT, timer: TIMER },
  [BasicZombieFrame.LYING_DOWN_7]: { originX: 379, originY: 225, w: LYING_DOWN_WIDTH, h: LYING_DOWN_HEIGHT, timer: TIMER },
  [BasicZombieFrame.LYING_DOWN_8]: { originX: 442, originY: 225, w: LYING_DOWN_WIDTH, h: LYING_DOWN_HEIGHT, timer: TIMER },
  [BasicZombieFrame.LYING_DOWN_9]: { originX: 505, originY: 225, w: LYING_DOWN_WIDTH, h: LYING_DOWN_HEIGHT, timer: TIMER },
}

export const BasicZombieAnimation = {
  [BasicZombieState.WALKING.FULL]: [
    BasicZombeKeyframe[BasicZombieFrame.WALKING_FULL_1],
    BasicZombeKeyframe[BasicZombieFrame.WALKING_FULL_2],
    BasicZombeKeyframe[BasicZombieFrame.WALKING_FULL_3],
    BasicZombeKeyframe[BasicZombieFrame.WALKING_FULL_4],
    BasicZombeKeyframe[BasicZombieFrame.WALKING_FULL_5],
    BasicZombeKeyframe[BasicZombieFrame.WALKING_FULL_6],
    BasicZombeKeyframe[BasicZombieFrame.WALKING_FULL_7]
  ],

  [BasicZombieState.WALKING.DAMAGED]: [
    BasicZombeKeyframe[BasicZombieFrame.WALKING_DAMAGED_1],
    BasicZombeKeyframe[BasicZombieFrame.WALKING_DAMAGED_2],
    BasicZombeKeyframe[BasicZombieFrame.WALKING_DAMAGED_3],
    BasicZombeKeyframe[BasicZombieFrame.WALKING_DAMAGED_4],
    BasicZombeKeyframe[BasicZombieFrame.WALKING_DAMAGED_5],
    BasicZombeKeyframe[BasicZombieFrame.WALKING_DAMAGED_6],
    BasicZombeKeyframe[BasicZombieFrame.WALKING_DAMAGED_7]
  ],

  [BasicZombieState.EATING.FULL]: [
    BasicZombeKeyframe[BasicZombieFrame.EATING_FULL_1],
    BasicZombeKeyframe[BasicZombieFrame.EATING_FULL_2],
    BasicZombeKeyframe[BasicZombieFrame.EATING_FULL_3],
    BasicZombeKeyframe[BasicZombieFrame.EATING_FULL_4],
    BasicZombeKeyframe[BasicZombieFrame.EATING_FULL_5],
    BasicZombeKeyframe[BasicZombieFrame.EATING_FULL_6],
    BasicZombeKeyframe[BasicZombieFrame.EATING_FULL_7]
  ],

  [BasicZombieState.EATING.DAMAGED]: [
    BasicZombeKeyframe[BasicZombieFrame.EATING_DAMAGED_1],
    BasicZombeKeyframe[BasicZombieFrame.EATING_DAMAGED_2],
    BasicZombeKeyframe[BasicZombieFrame.EATING_DAMAGED_3],
    BasicZombeKeyframe[BasicZombieFrame.EATING_DAMAGED_4],
    BasicZombeKeyframe[BasicZombieFrame.EATING_DAMAGED_5],
    BasicZombeKeyframe[BasicZombieFrame.EATING_DAMAGED_6],
    BasicZombeKeyframe[BasicZombieFrame.EATING_DAMAGED_7]
  ],

  [BasicZombieState.LYING_DOWN]: [
    BasicZombeKeyframe[BasicZombieFrame.LYING_DOWN_1],
    BasicZombeKeyframe[BasicZombieFrame.LYING_DOWN_2],
    BasicZombeKeyframe[BasicZombieFrame.LYING_DOWN_3],
    BasicZombeKeyframe[BasicZombieFrame.LYING_DOWN_4],
    BasicZombeKeyframe[BasicZombieFrame.LYING_DOWN_5],
    BasicZombeKeyframe[BasicZombieFrame.LYING_DOWN_6],
    BasicZombeKeyframe[BasicZombieFrame.LYING_DOWN_7],
    BasicZombeKeyframe[BasicZombieFrame.LYING_DOWN_8],
    BasicZombeKeyframe[BasicZombieFrame.LYING_DOWN_9]
  ]
}
