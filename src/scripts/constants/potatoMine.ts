import { SPEED_MULTIPLIER, TILE_HEIGHT, TILE_WIDTH } from './game'

export const DRAW_POTATO_MINE_COORDS_POINT = true
export const DRAW_POTATO_MINE_SPRITE_BORDERS = true
export const DRAW_POTATO_MINE_HITBOX = true
export const DRAW_SPUDOW_HITBOX = true
export const SHOW_HP = false

export const POTATO_MINE_DNG = 1800
export const ARMING_TIMER = 14000
export const POTATO_MINE_WIDTH = 28
export const POTATO_MINE_HEIGHT = 30
export const POTATO_MINE_HITBOX_WIDTH = POTATO_MINE_WIDTH * 0.4
export const POTATO_MINE_HITBOX_HEIGHT = POTATO_MINE_HEIGHT * 0.4
export const SPUDOW_WIDTH = 76
export const SPUDOW_HEIGHT = 58
export const SPUDOW_HITBOX_WIDTH = TILE_WIDTH * 0.9
export const SPUDOW_HITBOX_HEIGHT = TILE_HEIGHT / 2

export const PotatoMineState = {
  SLEEPING: 'sleeping',
  ARMING: 'arming',
  IDLE: 'idle',
  SPUDOW: 'spudow'
}

export const PotatoMineFrame = {
  SLEEPING_1: 'sleeping-1',
  SLEEPING_2: 'sleeping-2',
  ARMING_1: 'arming-1',
  ARMING_2: 'arming-2',
  ARMING_3: 'arming-3',
  ARMING_4: 'arming-4',
  IDLE_1: 'idle-1',
  IDLE_2: 'idle-2',
  IDLE_3: 'idle-3',
  SPUDOW_1: 'spudow-1',
  SPUDOW_2: 'spudow-2',
  SPUDOW_3: 'spudow-3',
  SPUDOW_4: 'spudow-4',
  SPUDOW_5: 'spudow-5',
  SPUDOW_6: 'spudow-6',
  SPUDOW_7: 'spudow-7',
  SPUDOW_8: 'spudow-8'
}

const POTATO_MINE_ARMING_TIMER = 8 * SPEED_MULTIPLIER
const POTATO_MINE_TIMER = 14 * SPEED_MULTIPLIER
const SPUDOW_TIMER = 12 * SPEED_MULTIPLIER

export const PotatoMineKeyframe = {
  [PotatoMineFrame.SLEEPING_1]: {
    originX: 1,
    originY: 1,
    w: POTATO_MINE_WIDTH,
    h: POTATO_MINE_HEIGHT,
    timer: 120 * SPEED_MULTIPLIER
  },
  [PotatoMineFrame.SLEEPING_2]: {
    originX: 30,
    originY: 1,
    w: POTATO_MINE_WIDTH,
    h: POTATO_MINE_HEIGHT,
    timer: 12 * SPEED_MULTIPLIER
  },

  [PotatoMineFrame.ARMING_1]: {
    originX: 1,
    originY: 32,
    w: POTATO_MINE_WIDTH,
    h: POTATO_MINE_HEIGHT,
    timer: POTATO_MINE_ARMING_TIMER
  },
  [PotatoMineFrame.ARMING_2]: {
    originX: 30,
    originY: 32,
    w: POTATO_MINE_WIDTH,
    h: POTATO_MINE_HEIGHT,
    timer: POTATO_MINE_ARMING_TIMER
  },
  [PotatoMineFrame.ARMING_3]: {
    originX: 59,
    originY: 32,
    w: POTATO_MINE_WIDTH,
    h: POTATO_MINE_HEIGHT,
    timer: POTATO_MINE_ARMING_TIMER
  },
  [PotatoMineFrame.ARMING_4]: {
    originX: 88,
    originY: 32,
    w: POTATO_MINE_WIDTH,
    h: POTATO_MINE_HEIGHT,
    timer: POTATO_MINE_ARMING_TIMER
  },

  [PotatoMineFrame.IDLE_1]: {
    originX: 1,
    originY: 63,
    w: POTATO_MINE_WIDTH,
    h: POTATO_MINE_HEIGHT,
    timer: POTATO_MINE_TIMER
  },
  [PotatoMineFrame.IDLE_2]: {
    originX: 30,
    originY: 63,
    w: POTATO_MINE_WIDTH,
    h: POTATO_MINE_HEIGHT,
    timer: POTATO_MINE_TIMER
  },
  [PotatoMineFrame.IDLE_3]: {
    originX: 59,
    originY: 63,
    w: POTATO_MINE_WIDTH,
    h: POTATO_MINE_HEIGHT,
    timer: POTATO_MINE_TIMER
  },

  [PotatoMineFrame.SPUDOW_1]: { originX: 1, originY: 94, w: SPUDOW_WIDTH, h: SPUDOW_HEIGHT, timer: SPUDOW_TIMER },
  [PotatoMineFrame.SPUDOW_2]: { originX: 78, originY: 94, w: SPUDOW_WIDTH, h: SPUDOW_HEIGHT, timer: SPUDOW_TIMER },
  [PotatoMineFrame.SPUDOW_3]: { originX: 155, originY: 94, w: SPUDOW_WIDTH, h: SPUDOW_HEIGHT, timer: SPUDOW_TIMER },
  [PotatoMineFrame.SPUDOW_4]: { originX: 232, originY: 94, w: SPUDOW_WIDTH, h: SPUDOW_HEIGHT, timer: SPUDOW_TIMER },
  [PotatoMineFrame.SPUDOW_5]: { originX: 309, originY: 94, w: SPUDOW_WIDTH, h: SPUDOW_HEIGHT, timer: SPUDOW_TIMER },
  [PotatoMineFrame.SPUDOW_6]: { originX: 386, originY: 94, w: SPUDOW_WIDTH, h: SPUDOW_HEIGHT, timer: SPUDOW_TIMER },
  [PotatoMineFrame.SPUDOW_7]: { originX: 463, originY: 94, w: SPUDOW_WIDTH, h: SPUDOW_HEIGHT, timer: SPUDOW_TIMER },
  [PotatoMineFrame.SPUDOW_8]: { originX: 540, originY: 94, w: SPUDOW_WIDTH, h: SPUDOW_HEIGHT, timer: SPUDOW_TIMER }
}

export const PotatoMineAnimation = {
  [PotatoMineState.SLEEPING]: [
    PotatoMineKeyframe[PotatoMineFrame.SLEEPING_1],
    PotatoMineKeyframe[PotatoMineFrame.SLEEPING_2]
  ],
  [PotatoMineState.ARMING]: [
    PotatoMineKeyframe[PotatoMineFrame.ARMING_1],
    PotatoMineKeyframe[PotatoMineFrame.ARMING_2],
    PotatoMineKeyframe[PotatoMineFrame.ARMING_3],
    PotatoMineKeyframe[PotatoMineFrame.ARMING_4]
  ],
  [PotatoMineState.IDLE]: [
    PotatoMineKeyframe[PotatoMineFrame.IDLE_1],
    PotatoMineKeyframe[PotatoMineFrame.IDLE_2],
    PotatoMineKeyframe[PotatoMineFrame.IDLE_3],
    PotatoMineKeyframe[PotatoMineFrame.IDLE_2]
  ],
  [PotatoMineState.SPUDOW]: [
    PotatoMineKeyframe[PotatoMineFrame.SPUDOW_1],
    PotatoMineKeyframe[PotatoMineFrame.SPUDOW_2],
    PotatoMineKeyframe[PotatoMineFrame.SPUDOW_3],
    PotatoMineKeyframe[PotatoMineFrame.SPUDOW_4],
    PotatoMineKeyframe[PotatoMineFrame.SPUDOW_5],
    PotatoMineKeyframe[PotatoMineFrame.SPUDOW_6],
    PotatoMineKeyframe[PotatoMineFrame.SPUDOW_7],
    PotatoMineKeyframe[PotatoMineFrame.SPUDOW_8]
  ]
}
