import { TransformFrame as TransformFrameType } from '../../../types'
import { SPEED_MULTIPLIER } from '../game'

export const DRAW_PEASHOOTER_COORDS_POINT = true
export const DRAW_PEASHOOTER_SPRITE_BORDERS = false
export const DRAW_PEASHOOTER_HITBOX = true
export const SHOW_HP = true

export const PeashooterState = {
  IDLE: 'idle',
  SHOOTING: 'shooting'
}

export const PEASHOOTER_WIDTH = 26
export const PEASHOOTER_HEIGHT = 30
export const PEASHOOTER_HITBOX_WIDTH = PEASHOOTER_WIDTH * 0.7
export const PEASHOOTER_HITBOX_HEIGHT = PEASHOOTER_HEIGHT * 0.9
export const FIRE_RATE = 1425 * SPEED_MULTIPLIER

export const PEASHOOTER_TIMER = 8 * SPEED_MULTIPLIER

export const FramesIndex = {
  [PeashooterState.IDLE]: [0, 1, 2, 3, 4, 5, 6, 7],
  [PeashooterState.SHOOTING]: [1, 2]
}

export const TransformFrame: TransformFrameType = {
  0: { offsetX: -1 },
  2: { offsetX: 2 },
  4: { offsetX: -1 },
  5: { offsetX: -2 },
  6: { offsetX: -2 },
  7: { offsetX: -2 }
}
