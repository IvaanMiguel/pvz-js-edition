import { SPEED_MULTIPLIER } from '../game'

export const DRAW_REPEATER_COORDS_POINT = true
export const DRAW_REPEATER_SPRITE_BORDERS = false
export const DRAW_REPEATER_HITBOX = true
export const SHOW_HP = true

export const REPEATER_WIDTH = 31
export const REPEATER_HEIGHT = 30
export const REPEATER_HITBOX_WIDTH = 18
export const REPEATER_HITBOX_HEIGHT = REPEATER_HEIGHT
export const REPEATER_FIRE_RATE = 1425 * SPEED_MULTIPLIER

export const RepeaterState = {
  IDLE: 'idle',
  SHOOTING: 'shooting'
}

export const RepeaterFrame = {
  IDLE_1: 'idle-1',
  IDLE_2: 'idle-2',
  IDLE_3: 'idle-3',
  IDLE_4: 'idle-4',
  IDLE_5: 'idle-5',
  SHOOTING_1: 'shooting-1',
  SHOOTING_2: 'shooting-2'
}

const REPEATER_TIMER = 10 * SPEED_MULTIPLIER
const SHOOTING_TIMER = 8 * SPEED_MULTIPLIER

export const RepeaterKeyframe = {
  [RepeaterFrame.IDLE_1]: { originX: 1, originY: 1, w: REPEATER_WIDTH, h: REPEATER_HEIGHT, timer: REPEATER_TIMER },
  [RepeaterFrame.IDLE_2]: { originX: 33, originY: 1, w: REPEATER_WIDTH, h: REPEATER_HEIGHT, timer: REPEATER_TIMER },
  [RepeaterFrame.IDLE_3]: { originX: 65, originY: 1, w: REPEATER_WIDTH, h: REPEATER_HEIGHT, timer: REPEATER_TIMER },
  [RepeaterFrame.IDLE_4]: { originX: 97, originY: 1, w: REPEATER_WIDTH, h: REPEATER_HEIGHT, timer: REPEATER_TIMER },
  [RepeaterFrame.IDLE_5]: { originX: 129, originY: 1, w: REPEATER_WIDTH, h: REPEATER_HEIGHT, timer: REPEATER_TIMER },

  [RepeaterFrame.SHOOTING_1]: { originX: 1, originY: 32, w: REPEATER_WIDTH, h: REPEATER_HEIGHT, timer: SHOOTING_TIMER },
  [RepeaterFrame.SHOOTING_2]: { originX: 33, originY: 32, w: REPEATER_WIDTH, h: REPEATER_HEIGHT, timer: SHOOTING_TIMER }
}

export const RepeaterAnimation = {
  [RepeaterState.IDLE]: [
    RepeaterKeyframe[RepeaterFrame.IDLE_1],
    RepeaterKeyframe[RepeaterFrame.IDLE_2],
    RepeaterKeyframe[RepeaterFrame.IDLE_3],
    RepeaterKeyframe[RepeaterFrame.IDLE_4],
    RepeaterKeyframe[RepeaterFrame.IDLE_5],
    RepeaterKeyframe[RepeaterFrame.IDLE_4],
    RepeaterKeyframe[RepeaterFrame.IDLE_3],
    RepeaterKeyframe[RepeaterFrame.IDLE_2]
  ],

  [RepeaterState.SHOOTING]: [
    RepeaterKeyframe[RepeaterFrame.SHOOTING_1],
    RepeaterKeyframe[RepeaterFrame.SHOOTING_2],
    RepeaterKeyframe[RepeaterFrame.SHOOTING_1],
    RepeaterKeyframe[RepeaterFrame.SHOOTING_2]
  ]
}
