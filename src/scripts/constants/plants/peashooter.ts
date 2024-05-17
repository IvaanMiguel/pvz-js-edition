import { SPEED_MULTIPLIER } from '../game'

export const DRAW_PEASHOOTER_COORDS_POINT = true
export const DRAW_PEASHOOTER_SPRITE_BORDERS = false
export const DRAW_PEASHOOTER_HITBOX = true
export const SHOW_PEASHOOTER_HP = true

export const PEASHOOTER_WIDTH = 30
export const PEASHOOTER_HEIGHT = 30
export const PEASHOOTER_HITBOX_WIDTH = PEASHOOTER_WIDTH * 0.7
export const PEASHOOTER_HITBOX_HEIGHT = PEASHOOTER_HEIGHT * 0.9
export const PEASHOOTER_FIRE_RATE = 1425 * SPEED_MULTIPLIER

export const PeashooterState = {
  IDLE: 'idle',
  SHOOTING: 'shooting'
}

export const PeashooterFrame = {
  IDLE_1: 'idle-1',
  IDLE_2: 'idle-2',
  IDLE_3: 'idle-3',
  IDLE_4: 'idle-4',
  IDLE_5: 'idle-5',
  IDLE_6: 'idle-6',
  IDLE_7: 'idle-7',
  IDLE_8: 'idle-8',

  SHOOTING_1: 'shooting-1',
  SHOOTING_2: 'shooting-2',
  SHOOTING_3: 'shooting-3'
}

const TIMER = 8 * SPEED_MULTIPLIER

export const PeashooterKeyframe = {
  [PeashooterFrame.IDLE_1]: { originX: 1, originY: 1, w: PEASHOOTER_WIDTH, h: PEASHOOTER_HEIGHT, timer: TIMER },
  [PeashooterFrame.IDLE_2]: { originX: 31, originY: 1, w: PEASHOOTER_WIDTH, h: PEASHOOTER_HEIGHT, timer: TIMER },
  [PeashooterFrame.IDLE_3]: { originX: 61, originY: 1, w: PEASHOOTER_WIDTH, h: PEASHOOTER_HEIGHT, timer: TIMER },
  [PeashooterFrame.IDLE_4]: { originX: 91, originY: 1, w: PEASHOOTER_WIDTH, h: PEASHOOTER_HEIGHT, timer: TIMER },
  [PeashooterFrame.IDLE_5]: { originX: 121, originY: 1, w: PEASHOOTER_WIDTH, h: PEASHOOTER_HEIGHT, timer: TIMER },
  [PeashooterFrame.IDLE_6]: { originX: 151, originY: 1, w: PEASHOOTER_WIDTH, h: PEASHOOTER_HEIGHT, timer: TIMER },
  [PeashooterFrame.IDLE_7]: { originX: 181, originY: 1, w: PEASHOOTER_WIDTH, h: PEASHOOTER_HEIGHT, timer: TIMER },
  [PeashooterFrame.IDLE_8]: { originX: 211, originY: 1, w: PEASHOOTER_WIDTH, h: PEASHOOTER_HEIGHT, timer: TIMER },

  [PeashooterFrame.SHOOTING_1]: { originX: 1, originY: 32, w: PEASHOOTER_WIDTH, h: PEASHOOTER_HEIGHT, timer: TIMER },
  [PeashooterFrame.SHOOTING_2]: { originX: 31, originY: 32, w: PEASHOOTER_WIDTH, h: PEASHOOTER_HEIGHT, timer: TIMER },
  [PeashooterFrame.SHOOTING_3]: { originX: 61, originY: 32, w: PEASHOOTER_WIDTH, h: PEASHOOTER_HEIGHT, timer: TIMER }
}

export const PeashooterAnimation = {
  [PeashooterState.IDLE]: [
    PeashooterKeyframe[PeashooterFrame.IDLE_1],
    PeashooterKeyframe[PeashooterFrame.IDLE_2],
    PeashooterKeyframe[PeashooterFrame.IDLE_3],
    PeashooterKeyframe[PeashooterFrame.IDLE_4],
    PeashooterKeyframe[PeashooterFrame.IDLE_5],
    PeashooterKeyframe[PeashooterFrame.IDLE_6],
    PeashooterKeyframe[PeashooterFrame.IDLE_7],
    PeashooterKeyframe[PeashooterFrame.IDLE_8]
  ],

  [PeashooterState.SHOOTING]: [
    PeashooterKeyframe[PeashooterFrame.SHOOTING_1],
    PeashooterKeyframe[PeashooterFrame.SHOOTING_2],
    PeashooterKeyframe[PeashooterFrame.SHOOTING_3]
  ]
}
