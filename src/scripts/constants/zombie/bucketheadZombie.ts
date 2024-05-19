import { SPEED_MULTIPLIER, TILE_HEIGHT } from '../game'
import { BASIC_ZOMBIE_HP } from './basicZombie'

export const DRAW_BUCKETHEAD_ZOMBIE_COORDS_POINT = true
export const DRAW_BUCKETHEAD_ZOMBIE_SPRITE_BORDERS = true
export const DRAW_BUCKETHEAD_ZOMBIE_HITBOX = true
export const SHOW_BUCKETHEAD_ZOMBIE_HP = true

const WIDTH = 40
const HEIGHT = 55

export const BUCKETHEAD_ZOMBIE_OFFSET_Y = -(HEIGHT - TILE_HEIGHT) / 2
export const BUCKETHEAD_ZOMBIE_HITBOX_OFFSET_X = 4
export const BUCKETHEAD_ZOMBIE_HITBOX_WIDTH = 15
export const BUCKETHEAD_ZOMBIE_HITBOX_HEIGHT = TILE_HEIGHT * 0.9

const BUCKET_HP = 1100
export const BUCKETHEAD_ZOMBIE_HP = BASIC_ZOMBIE_HP + BUCKET_HP
export const BUCKETHEAD_ZOMBIE_SPEED = 3 / SPEED_MULTIPLIER

export const BUCKET_DAMAGED = BASIC_ZOMBIE_HP + BUCKET_HP * (2 / 3)
export const BUCKET_DESTROYED = BASIC_ZOMBIE_HP + BUCKET_HP * (1 / 3)

export const BucketheadZombieState = {
  WALKING: {
    FULL: 'bucket-walking-full',
    DAMAGED: 'bucket-walking-damaged',
    DESTROYED: 'bucket-walking-destroyed'
  },
  EATING: {
    FULL: 'bucket-eating-full',
    DAMAGED: 'bucket-eating-damaged',
    DESTROYED: 'bucket-eating-destroyed'
  }
}

export const BucketheadZombieFrame = {
  WALKING_FULL_1: 'bucket-walking-full-1',
  WALKING_FULL_2: 'bucket-walking-full-2',
  WALKING_FULL_3: 'bucket-walking-full-3',
  WALKING_FULL_4: 'bucket-walking-full-4',
  WALKING_FULL_5: 'bucket-walking-full-5',
  WALKING_FULL_6: 'bucket-walking-full-6',
  WALKING_FULL_7: 'bucket-walking-full-7',

  WALKING_DAMAGED_1: 'bucket-walking-damaged-1',
  WALKING_DAMAGED_2: 'bucket-walking-damaged-2',
  WALKING_DAMAGED_3: 'bucket-walking-damaged-3',
  WALKING_DAMAGED_4: 'bucket-walking-damaged-4',
  WALKING_DAMAGED_5: 'bucket-walking-damaged-5',
  WALKING_DAMAGED_6: 'bucket-walking-damaged-6',
  WALKING_DAMAGED_7: 'bucket-walking-damaged-7',

  WALKING_DESTROYED_1: 'bucket-walking-destroyed-1',
  WALKING_DESTROYED_2: 'bucket-walking-destroyed-2',
  WALKING_DESTROYED_3: 'bucket-walking-destroyed-3',
  WALKING_DESTROYED_4: 'bucket-walking-destroyed-4',
  WALKING_DESTROYED_5: 'bucket-walking-destroyed-5',
  WALKING_DESTROYED_6: 'bucket-walking-destroyed-6',
  WALKING_DESTROYED_7: 'bucket-walking-destroyed-7',

  EATING_FULL_1: 'bucket-eating-full-1',
  EATING_FULL_2: 'bucket-eating-full-2',
  EATING_FULL_3: 'bucket-eating-full-3',
  EATING_FULL_4: 'bucket-eating-full-4',
  EATING_FULL_5: 'bucket-eating-full-5',
  EATING_FULL_6: 'bucket-eating-full-6',
  EATING_FULL_7: 'bucket-eating-full-7',

  EATING_DAMAGED_1: 'bucket-eating-damaged-1',
  EATING_DAMAGED_2: 'bucket-eating-damaged-2',
  EATING_DAMAGED_3: 'bucket-eating-damaged-3',
  EATING_DAMAGED_4: 'bucket-eating-damaged-4',
  EATING_DAMAGED_5: 'bucket-eating-damaged-5',
  EATING_DAMAGED_6: 'bucket-eating-damaged-6',
  EATING_DAMAGED_7: 'bucket-eating-damaged-7',

  EATING_DESTROYED_1: 'bucket-eating-destroyed-1',
  EATING_DESTROYED_2: 'bucket-eating-destroyed-2',
  EATING_DESTROYED_3: 'bucket-eating-destroyed-3',
  EATING_DESTROYED_4: 'bucket-eating-destroyed-4',
  EATING_DESTROYED_5: 'bucket-eating-destroyed-5',
  EATING_DESTROYED_6: 'bucket-eating-destroyed-6',
  EATING_DESTROYED_7: 'bucket-eating-destroyed-7'
}

const TIMER = 10 * SPEED_MULTIPLIER

export const BucketheadZombieKeyframe = {
  [BucketheadZombieFrame.WALKING_FULL_1]: { originX: 1, originY: 1, w: WIDTH, h: HEIGHT, timer: TIMER },
  [BucketheadZombieFrame.WALKING_FULL_2]: { originX: 42, originY: 1, w: WIDTH, h: HEIGHT, timer: TIMER },
  [BucketheadZombieFrame.WALKING_FULL_3]: { originX: 83, originY: 1, w: WIDTH, h: HEIGHT, timer: TIMER },
  [BucketheadZombieFrame.WALKING_FULL_4]: { originX: 124, originY: 1, w: WIDTH, h: HEIGHT, timer: TIMER },
  [BucketheadZombieFrame.WALKING_FULL_5]: { originX: 165, originY: 1, w: WIDTH, h: HEIGHT, timer: TIMER },
  [BucketheadZombieFrame.WALKING_FULL_6]: { originX: 206, originY: 1, w: WIDTH, h: HEIGHT, timer: TIMER },
  [BucketheadZombieFrame.WALKING_FULL_7]: { originX: 247, originY: 1, w: WIDTH, h: HEIGHT, timer: TIMER },

  [BucketheadZombieFrame.WALKING_DAMAGED_1]: { originX: 1, originY: 113, w: WIDTH, h: HEIGHT, timer: TIMER },
  [BucketheadZombieFrame.WALKING_DAMAGED_2]: { originX: 42, originY: 113, w: WIDTH, h: HEIGHT, timer: TIMER },
  [BucketheadZombieFrame.WALKING_DAMAGED_3]: { originX: 83, originY: 113, w: WIDTH, h: HEIGHT, timer: TIMER },
  [BucketheadZombieFrame.WALKING_DAMAGED_4]: { originX: 124, originY: 113, w: WIDTH, h: HEIGHT, timer: TIMER },
  [BucketheadZombieFrame.WALKING_DAMAGED_5]: { originX: 165, originY: 113, w: WIDTH, h: HEIGHT, timer: TIMER },
  [BucketheadZombieFrame.WALKING_DAMAGED_6]: { originX: 206, originY: 113, w: WIDTH, h: HEIGHT, timer: TIMER },
  [BucketheadZombieFrame.WALKING_DAMAGED_7]: { originX: 247, originY: 113, w: WIDTH, h: HEIGHT, timer: TIMER },

  [BucketheadZombieFrame.WALKING_DESTROYED_1]: { originX: 1, originY: 225, w: WIDTH, h: HEIGHT, timer: TIMER },
  [BucketheadZombieFrame.WALKING_DESTROYED_2]: { originX: 42, originY: 225, w: WIDTH, h: HEIGHT, timer: TIMER },
  [BucketheadZombieFrame.WALKING_DESTROYED_3]: { originX: 83, originY: 225, w: WIDTH, h: HEIGHT, timer: TIMER },
  [BucketheadZombieFrame.WALKING_DESTROYED_4]: { originX: 124, originY: 225, w: WIDTH, h: HEIGHT, timer: TIMER },
  [BucketheadZombieFrame.WALKING_DESTROYED_5]: { originX: 165, originY: 225, w: WIDTH, h: HEIGHT, timer: TIMER },
  [BucketheadZombieFrame.WALKING_DESTROYED_6]: { originX: 206, originY: 225, w: WIDTH, h: HEIGHT, timer: TIMER },
  [BucketheadZombieFrame.WALKING_DESTROYED_7]: { originX: 247, originY: 225, w: WIDTH, h: HEIGHT, timer: TIMER },

  [BucketheadZombieFrame.EATING_FULL_1]: { originX: 1, originY: 57, w: WIDTH, h: HEIGHT, timer: TIMER },
  [BucketheadZombieFrame.EATING_FULL_2]: { originX: 42, originY: 57, w: WIDTH, h: HEIGHT, timer: TIMER },
  [BucketheadZombieFrame.EATING_FULL_3]: { originX: 83, originY: 57, w: WIDTH, h: HEIGHT, timer: TIMER },
  [BucketheadZombieFrame.EATING_FULL_4]: { originX: 124, originY: 57, w: WIDTH, h: HEIGHT, timer: TIMER },
  [BucketheadZombieFrame.EATING_FULL_5]: { originX: 165, originY: 57, w: WIDTH, h: HEIGHT, timer: TIMER },
  [BucketheadZombieFrame.EATING_FULL_6]: { originX: 206, originY: 57, w: WIDTH, h: HEIGHT, timer: TIMER },
  [BucketheadZombieFrame.EATING_FULL_7]: { originX: 247, originY: 57, w: WIDTH, h: HEIGHT, timer: TIMER },

  [BucketheadZombieFrame.EATING_DAMAGED_1]: { originX: 1, originY: 169, w: WIDTH, h: HEIGHT, timer: TIMER },
  [BucketheadZombieFrame.EATING_DAMAGED_2]: { originX: 42, originY: 169, w: WIDTH, h: HEIGHT, timer: TIMER },
  [BucketheadZombieFrame.EATING_DAMAGED_3]: { originX: 83, originY: 169, w: WIDTH, h: HEIGHT, timer: TIMER },
  [BucketheadZombieFrame.EATING_DAMAGED_4]: { originX: 124, originY: 169, w: WIDTH, h: HEIGHT, timer: TIMER },
  [BucketheadZombieFrame.EATING_DAMAGED_5]: { originX: 165, originY: 169, w: WIDTH, h: HEIGHT, timer: TIMER },
  [BucketheadZombieFrame.EATING_DAMAGED_6]: { originX: 206, originY: 169, w: WIDTH, h: HEIGHT, timer: TIMER },
  [BucketheadZombieFrame.EATING_DAMAGED_7]: { originX: 247, originY: 169, w: WIDTH, h: HEIGHT, timer: TIMER },

  [BucketheadZombieFrame.EATING_DESTROYED_1]: { originX: 1, originY: 281, w: WIDTH, h: HEIGHT, timer: TIMER },
  [BucketheadZombieFrame.EATING_DESTROYED_2]: { originX: 42, originY: 281, w: WIDTH, h: HEIGHT, timer: TIMER },
  [BucketheadZombieFrame.EATING_DESTROYED_3]: { originX: 83, originY: 281, w: WIDTH, h: HEIGHT, timer: TIMER },
  [BucketheadZombieFrame.EATING_DESTROYED_4]: { originX: 124, originY: 281, w: WIDTH, h: HEIGHT, timer: TIMER },
  [BucketheadZombieFrame.EATING_DESTROYED_5]: { originX: 165, originY: 281, w: WIDTH, h: HEIGHT, timer: TIMER },
  [BucketheadZombieFrame.EATING_DESTROYED_6]: { originX: 206, originY: 281, w: WIDTH, h: HEIGHT, timer: TIMER },
  [BucketheadZombieFrame.EATING_DESTROYED_7]: { originX: 247, originY: 281, w: WIDTH, h: HEIGHT, timer: TIMER }
}

export const BucketheadZombieAnimation = {
  [BucketheadZombieState.WALKING.FULL]: [
    BucketheadZombieKeyframe[BucketheadZombieFrame.WALKING_FULL_1],
    BucketheadZombieKeyframe[BucketheadZombieFrame.WALKING_FULL_2],
    BucketheadZombieKeyframe[BucketheadZombieFrame.WALKING_FULL_3],
    BucketheadZombieKeyframe[BucketheadZombieFrame.WALKING_FULL_4],
    BucketheadZombieKeyframe[BucketheadZombieFrame.WALKING_FULL_5],
    BucketheadZombieKeyframe[BucketheadZombieFrame.WALKING_FULL_6],
    BucketheadZombieKeyframe[BucketheadZombieFrame.WALKING_FULL_7]
  ],

  [BucketheadZombieState.WALKING.DAMAGED]: [
    BucketheadZombieKeyframe[BucketheadZombieFrame.WALKING_DAMAGED_1],
    BucketheadZombieKeyframe[BucketheadZombieFrame.WALKING_DAMAGED_2],
    BucketheadZombieKeyframe[BucketheadZombieFrame.WALKING_DAMAGED_3],
    BucketheadZombieKeyframe[BucketheadZombieFrame.WALKING_DAMAGED_4],
    BucketheadZombieKeyframe[BucketheadZombieFrame.WALKING_DAMAGED_5],
    BucketheadZombieKeyframe[BucketheadZombieFrame.WALKING_DAMAGED_6],
    BucketheadZombieKeyframe[BucketheadZombieFrame.WALKING_DAMAGED_7]
  ],

  [BucketheadZombieState.WALKING.DESTROYED]: [
    BucketheadZombieKeyframe[BucketheadZombieFrame.WALKING_DESTROYED_1],
    BucketheadZombieKeyframe[BucketheadZombieFrame.WALKING_DESTROYED_2],
    BucketheadZombieKeyframe[BucketheadZombieFrame.WALKING_DESTROYED_3],
    BucketheadZombieKeyframe[BucketheadZombieFrame.WALKING_DESTROYED_4],
    BucketheadZombieKeyframe[BucketheadZombieFrame.WALKING_DESTROYED_5],
    BucketheadZombieKeyframe[BucketheadZombieFrame.WALKING_DESTROYED_6],
    BucketheadZombieKeyframe[BucketheadZombieFrame.WALKING_DESTROYED_7]
  ],

  [BucketheadZombieState.EATING.FULL]: [
    BucketheadZombieKeyframe[BucketheadZombieFrame.EATING_FULL_1],
    BucketheadZombieKeyframe[BucketheadZombieFrame.EATING_FULL_2],
    BucketheadZombieKeyframe[BucketheadZombieFrame.EATING_FULL_3],
    BucketheadZombieKeyframe[BucketheadZombieFrame.EATING_FULL_4],
    BucketheadZombieKeyframe[BucketheadZombieFrame.EATING_FULL_5],
    BucketheadZombieKeyframe[BucketheadZombieFrame.EATING_FULL_6],
    BucketheadZombieKeyframe[BucketheadZombieFrame.EATING_FULL_7]
  ],

  [BucketheadZombieState.EATING.DAMAGED]: [
    BucketheadZombieKeyframe[BucketheadZombieFrame.EATING_DAMAGED_1],
    BucketheadZombieKeyframe[BucketheadZombieFrame.EATING_DAMAGED_2],
    BucketheadZombieKeyframe[BucketheadZombieFrame.EATING_DAMAGED_3],
    BucketheadZombieKeyframe[BucketheadZombieFrame.EATING_DAMAGED_4],
    BucketheadZombieKeyframe[BucketheadZombieFrame.EATING_DAMAGED_5],
    BucketheadZombieKeyframe[BucketheadZombieFrame.EATING_DAMAGED_6],
    BucketheadZombieKeyframe[BucketheadZombieFrame.EATING_DAMAGED_7]
  ],

  [BucketheadZombieState.EATING.DESTROYED]: [
    BucketheadZombieKeyframe[BucketheadZombieFrame.EATING_DESTROYED_1],
    BucketheadZombieKeyframe[BucketheadZombieFrame.EATING_DESTROYED_2],
    BucketheadZombieKeyframe[BucketheadZombieFrame.EATING_DESTROYED_3],
    BucketheadZombieKeyframe[BucketheadZombieFrame.EATING_DESTROYED_4],
    BucketheadZombieKeyframe[BucketheadZombieFrame.EATING_DESTROYED_5],
    BucketheadZombieKeyframe[BucketheadZombieFrame.EATING_DESTROYED_6],
    BucketheadZombieKeyframe[BucketheadZombieFrame.EATING_DESTROYED_7]
  ]
}
