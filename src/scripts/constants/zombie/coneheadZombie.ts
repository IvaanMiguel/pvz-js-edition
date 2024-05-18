import { SPEED_MULTIPLIER, TILE_HEIGHT } from '../game'
import { BASIC_ZOMBIE_HP } from './basicZombie'

export const DRAW_CONEHEAD_ZOMBIE_COORDS_POINT = true
export const DRAW_CONEHEAD_ZOMBIE_SPRITE_BORDERS = true
export const DRAW_CONEHEAD_ZOMBIE_HITBOX = true
export const SHOW_CONEHEAD_ZOMBIE_HP = false

const WIDTH = 36
const HEIGHT = 55

export const CONEHEAD_ZOMBIE_OFFSET_Y = -(HEIGHT - TILE_HEIGHT) / 2
export const CONEHEAD_ZOMBIE_HITBOX_OFFSET_X = 4
export const CONEHEAD_ZOMBIE_HITBOX_WIDTH = 15
export const CONEHEAD_ZOMBIE_HITBOX_HEIGHT = TILE_HEIGHT * 0.9

const ROADCONE_HP = 370
export const CONEHEAD_ZOMBIE_HP = BASIC_ZOMBIE_HP + ROADCONE_HP
export const CONEHEAD_ZOMBIE_SPEED = 3 / SPEED_MULTIPLIER

export const ROADCONE_DAMAGED = BASIC_ZOMBIE_HP + ROADCONE_HP * (2 / 3)
export const ROADCONE_DESTROYED = BASIC_ZOMBIE_HP + ROADCONE_HP * (1 / 3)

export const ConeheadZombieState = {
  WALKING: {
    FULL: 'roadcone-walking-full',
    DAMAGED: 'roadcone-walking-damaged',
    DESTROYED: 'roadcone-walking-destroyed'
  },
  EATING: {
    FULL: 'roadcone-eating-full',
    DAMAGED: 'roadcone-eating-damaged',
    DESTROYED: 'roadcone-eating-destroyed'
  }
}

export const ConeheadZombieFrame = {
  WALKING_FULL_1: 'roadcone-walking-full-1',
  WALKING_FULL_2: 'roadcone-walking-full-2',
  WALKING_FULL_3: 'roadcone-walking-full-3',
  WALKING_FULL_4: 'roadcone-walking-full-4',
  WALKING_FULL_5: 'roadcone-walking-full-5',
  WALKING_FULL_6: 'roadcone-walking-full-6',
  WALKING_FULL_7: 'roadcone-walking-full-7',

  WALKING_DAMAGED_1: 'roadcone-walking-damaged-1',
  WALKING_DAMAGED_2: 'roadcone-walking-damaged-2',
  WALKING_DAMAGED_3: 'roadcone-walking-damaged-3',
  WALKING_DAMAGED_4: 'roadcone-walking-damaged-4',
  WALKING_DAMAGED_5: 'roadcone-walking-damaged-5',
  WALKING_DAMAGED_6: 'roadcone-walking-damaged-6',
  WALKING_DAMAGED_7: 'roadcone-walking-damaged-7',

  WALKING_DESTROYED_1: 'roadcone-walking-destroyed-1',
  WALKING_DESTROYED_2: 'roadcone-walking-destroyed-2',
  WALKING_DESTROYED_3: 'roadcone-walking-destroyed-3',
  WALKING_DESTROYED_4: 'roadcone-walking-destroyed-4',
  WALKING_DESTROYED_5: 'roadcone-walking-destroyed-5',
  WALKING_DESTROYED_6: 'roadcone-walking-destroyed-6',
  WALKING_DESTROYED_7: 'roadcone-walking-destroyed-7',

  EATING_FULL_1: 'roadcone-eating-full-1',
  EATING_FULL_2: 'roadcone-eating-full-2',
  EATING_FULL_3: 'roadcone-eating-full-3',
  EATING_FULL_4: 'roadcone-eating-full-4',
  EATING_FULL_5: 'roadcone-eating-full-5',
  EATING_FULL_6: 'roadcone-eating-full-6',
  EATING_FULL_7: 'roadcone-eating-full-7',

  EATING_DAMAGED_1: 'roadcone-eating-damaged-1',
  EATING_DAMAGED_2: 'roadcone-eating-damaged-2',
  EATING_DAMAGED_3: 'roadcone-eating-damaged-3',
  EATING_DAMAGED_4: 'roadcone-eating-damaged-4',
  EATING_DAMAGED_5: 'roadcone-eating-damaged-5',
  EATING_DAMAGED_6: 'roadcone-eating-damaged-6',
  EATING_DAMAGED_7: 'roadcone-eating-damaged-7',

  EATING_DESTROYED_1: 'roadcone-eating-destroyed-1',
  EATING_DESTROYED_2: 'roadcone-eating-destroyed-2',
  EATING_DESTROYED_3: 'roadcone-eating-destroyed-3',
  EATING_DESTROYED_4: 'roadcone-eating-destroyed-4',
  EATING_DESTROYED_5: 'roadcone-eating-destroyed-5',
  EATING_DESTROYED_6: 'roadcone-eating-destroyed-6',
  EATING_DESTROYED_7: 'roadcone-eating-destroyed-7'
}

const TIMER = 10 * SPEED_MULTIPLIER

export const ConeheadZombieKeyframe = {
  [ConeheadZombieFrame.WALKING_FULL_1]: { originX: 1, originY: 1, w: WIDTH, h: HEIGHT, timer: TIMER },
  [ConeheadZombieFrame.WALKING_FULL_2]: { originX: 38, originY: 1, w: WIDTH, h: HEIGHT, timer: TIMER },
  [ConeheadZombieFrame.WALKING_FULL_3]: { originX: 75, originY: 1, w: WIDTH, h: HEIGHT, timer: TIMER },
  [ConeheadZombieFrame.WALKING_FULL_4]: { originX: 112, originY: 1, w: WIDTH, h: HEIGHT, timer: TIMER },
  [ConeheadZombieFrame.WALKING_FULL_5]: { originX: 149, originY: 1, w: WIDTH, h: HEIGHT, timer: TIMER },
  [ConeheadZombieFrame.WALKING_FULL_6]: { originX: 186, originY: 1, w: WIDTH, h: HEIGHT, timer: TIMER },
  [ConeheadZombieFrame.WALKING_FULL_7]: { originX: 223, originY: 1, w: WIDTH, h: HEIGHT, timer: TIMER },

  [ConeheadZombieFrame.WALKING_DAMAGED_1]: { originX: 1, originY: 113, w: WIDTH, h: HEIGHT, timer: TIMER },
  [ConeheadZombieFrame.WALKING_DAMAGED_2]: { originX: 38, originY: 113, w: WIDTH, h: HEIGHT, timer: TIMER },
  [ConeheadZombieFrame.WALKING_DAMAGED_3]: { originX: 75, originY: 113, w: WIDTH, h: HEIGHT, timer: TIMER },
  [ConeheadZombieFrame.WALKING_DAMAGED_4]: { originX: 112, originY: 113, w: WIDTH, h: HEIGHT, timer: TIMER },
  [ConeheadZombieFrame.WALKING_DAMAGED_5]: { originX: 149, originY: 113, w: WIDTH, h: HEIGHT, timer: TIMER },
  [ConeheadZombieFrame.WALKING_DAMAGED_6]: { originX: 186, originY: 113, w: WIDTH, h: HEIGHT, timer: TIMER },
  [ConeheadZombieFrame.WALKING_DAMAGED_7]: { originX: 223, originY: 113, w: WIDTH, h: HEIGHT, timer: TIMER },

  [ConeheadZombieFrame.WALKING_DESTROYED_1]: { originX: 1, originY: 225, w: WIDTH, h: HEIGHT, timer: TIMER },
  [ConeheadZombieFrame.WALKING_DESTROYED_2]: { originX: 38, originY: 225, w: WIDTH, h: HEIGHT, timer: TIMER },
  [ConeheadZombieFrame.WALKING_DESTROYED_3]: { originX: 75, originY: 225, w: WIDTH, h: HEIGHT, timer: TIMER },
  [ConeheadZombieFrame.WALKING_DESTROYED_4]: { originX: 112, originY: 225, w: WIDTH, h: HEIGHT, timer: TIMER },
  [ConeheadZombieFrame.WALKING_DESTROYED_5]: { originX: 149, originY: 225, w: WIDTH, h: HEIGHT, timer: TIMER },
  [ConeheadZombieFrame.WALKING_DESTROYED_6]: { originX: 186, originY: 225, w: WIDTH, h: HEIGHT, timer: TIMER },
  [ConeheadZombieFrame.WALKING_DESTROYED_7]: { originX: 223, originY: 225, w: WIDTH, h: HEIGHT, timer: TIMER },

  [ConeheadZombieFrame.EATING_FULL_1]: { originX: 1, originY: 57, w: WIDTH, h: HEIGHT, timer: TIMER },
  [ConeheadZombieFrame.EATING_FULL_2]: { originX: 38, originY: 57, w: WIDTH, h: HEIGHT, timer: TIMER },
  [ConeheadZombieFrame.EATING_FULL_3]: { originX: 75, originY: 57, w: WIDTH, h: HEIGHT, timer: TIMER },
  [ConeheadZombieFrame.EATING_FULL_4]: { originX: 112, originY: 57, w: WIDTH, h: HEIGHT, timer: TIMER },
  [ConeheadZombieFrame.EATING_FULL_5]: { originX: 149, originY: 57, w: WIDTH, h: HEIGHT, timer: TIMER },
  [ConeheadZombieFrame.EATING_FULL_6]: { originX: 186, originY: 57, w: WIDTH, h: HEIGHT, timer: TIMER },
  [ConeheadZombieFrame.EATING_FULL_7]: { originX: 223, originY: 57, w: WIDTH, h: HEIGHT, timer: TIMER },

  [ConeheadZombieFrame.EATING_DAMAGED_1]: { originX: 1, originY: 169, w: WIDTH, h: HEIGHT, timer: TIMER },
  [ConeheadZombieFrame.EATING_DAMAGED_2]: { originX: 38, originY: 169, w: WIDTH, h: HEIGHT, timer: TIMER },
  [ConeheadZombieFrame.EATING_DAMAGED_3]: { originX: 75, originY: 169, w: WIDTH, h: HEIGHT, timer: TIMER },
  [ConeheadZombieFrame.EATING_DAMAGED_4]: { originX: 112, originY: 169, w: WIDTH, h: HEIGHT, timer: TIMER },
  [ConeheadZombieFrame.EATING_DAMAGED_5]: { originX: 149, originY: 169, w: WIDTH, h: HEIGHT, timer: TIMER },
  [ConeheadZombieFrame.EATING_DAMAGED_6]: { originX: 186, originY: 169, w: WIDTH, h: HEIGHT, timer: TIMER },
  [ConeheadZombieFrame.EATING_DAMAGED_7]: { originX: 223, originY: 169, w: WIDTH, h: HEIGHT, timer: TIMER },

  [ConeheadZombieFrame.EATING_DESTROYED_1]: { originX: 1, originY: 281, w: WIDTH, h: HEIGHT, timer: TIMER },
  [ConeheadZombieFrame.EATING_DESTROYED_2]: { originX: 38, originY: 281, w: WIDTH, h: HEIGHT, timer: TIMER },
  [ConeheadZombieFrame.EATING_DESTROYED_3]: { originX: 75, originY: 281, w: WIDTH, h: HEIGHT, timer: TIMER },
  [ConeheadZombieFrame.EATING_DESTROYED_4]: { originX: 112, originY: 281, w: WIDTH, h: HEIGHT, timer: TIMER },
  [ConeheadZombieFrame.EATING_DESTROYED_5]: { originX: 149, originY: 281, w: WIDTH, h: HEIGHT, timer: TIMER },
  [ConeheadZombieFrame.EATING_DESTROYED_6]: { originX: 186, originY: 281, w: WIDTH, h: HEIGHT, timer: TIMER },
  [ConeheadZombieFrame.EATING_DESTROYED_7]: { originX: 223, originY: 281, w: WIDTH, h: HEIGHT, timer: TIMER }
}

export const ConeheadZombieAnimation = {
  [ConeheadZombieState.WALKING.FULL]: [
    ConeheadZombieKeyframe[ConeheadZombieFrame.WALKING_FULL_1],
    ConeheadZombieKeyframe[ConeheadZombieFrame.WALKING_FULL_2],
    ConeheadZombieKeyframe[ConeheadZombieFrame.WALKING_FULL_3],
    ConeheadZombieKeyframe[ConeheadZombieFrame.WALKING_FULL_4],
    ConeheadZombieKeyframe[ConeheadZombieFrame.WALKING_FULL_5],
    ConeheadZombieKeyframe[ConeheadZombieFrame.WALKING_FULL_6],
    ConeheadZombieKeyframe[ConeheadZombieFrame.WALKING_FULL_7]
  ],

  [ConeheadZombieState.WALKING.DAMAGED]: [
    ConeheadZombieKeyframe[ConeheadZombieFrame.WALKING_DAMAGED_1],
    ConeheadZombieKeyframe[ConeheadZombieFrame.WALKING_DAMAGED_2],
    ConeheadZombieKeyframe[ConeheadZombieFrame.WALKING_DAMAGED_3],
    ConeheadZombieKeyframe[ConeheadZombieFrame.WALKING_DAMAGED_4],
    ConeheadZombieKeyframe[ConeheadZombieFrame.WALKING_DAMAGED_5],
    ConeheadZombieKeyframe[ConeheadZombieFrame.WALKING_DAMAGED_6],
    ConeheadZombieKeyframe[ConeheadZombieFrame.WALKING_DAMAGED_7]
  ],

  [ConeheadZombieState.WALKING.DESTROYED]: [
    ConeheadZombieKeyframe[ConeheadZombieFrame.WALKING_DESTROYED_1],
    ConeheadZombieKeyframe[ConeheadZombieFrame.WALKING_DESTROYED_2],
    ConeheadZombieKeyframe[ConeheadZombieFrame.WALKING_DESTROYED_3],
    ConeheadZombieKeyframe[ConeheadZombieFrame.WALKING_DESTROYED_4],
    ConeheadZombieKeyframe[ConeheadZombieFrame.WALKING_DESTROYED_5],
    ConeheadZombieKeyframe[ConeheadZombieFrame.WALKING_DESTROYED_6],
    ConeheadZombieKeyframe[ConeheadZombieFrame.WALKING_DESTROYED_7]
  ],

  [ConeheadZombieState.EATING.FULL]: [
    ConeheadZombieKeyframe[ConeheadZombieFrame.EATING_FULL_1],
    ConeheadZombieKeyframe[ConeheadZombieFrame.EATING_FULL_2],
    ConeheadZombieKeyframe[ConeheadZombieFrame.EATING_FULL_3],
    ConeheadZombieKeyframe[ConeheadZombieFrame.EATING_FULL_4],
    ConeheadZombieKeyframe[ConeheadZombieFrame.EATING_FULL_5],
    ConeheadZombieKeyframe[ConeheadZombieFrame.EATING_FULL_6],
    ConeheadZombieKeyframe[ConeheadZombieFrame.EATING_FULL_7]
  ],

  [ConeheadZombieState.EATING.DAMAGED]: [
    ConeheadZombieKeyframe[ConeheadZombieFrame.EATING_DAMAGED_1],
    ConeheadZombieKeyframe[ConeheadZombieFrame.EATING_DAMAGED_2],
    ConeheadZombieKeyframe[ConeheadZombieFrame.EATING_DAMAGED_3],
    ConeheadZombieKeyframe[ConeheadZombieFrame.EATING_DAMAGED_4],
    ConeheadZombieKeyframe[ConeheadZombieFrame.EATING_DAMAGED_5],
    ConeheadZombieKeyframe[ConeheadZombieFrame.EATING_DAMAGED_6],
    ConeheadZombieKeyframe[ConeheadZombieFrame.EATING_DAMAGED_7]
  ],

  [ConeheadZombieState.EATING.DESTROYED]: [
    ConeheadZombieKeyframe[ConeheadZombieFrame.EATING_DESTROYED_1],
    ConeheadZombieKeyframe[ConeheadZombieFrame.EATING_DESTROYED_2],
    ConeheadZombieKeyframe[ConeheadZombieFrame.EATING_DESTROYED_3],
    ConeheadZombieKeyframe[ConeheadZombieFrame.EATING_DESTROYED_4],
    ConeheadZombieKeyframe[ConeheadZombieFrame.EATING_DESTROYED_5],
    ConeheadZombieKeyframe[ConeheadZombieFrame.EATING_DESTROYED_6],
    ConeheadZombieKeyframe[ConeheadZombieFrame.EATING_DESTROYED_7]
  ]
}
