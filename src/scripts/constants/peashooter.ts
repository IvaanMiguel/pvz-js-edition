import { TransformFrame as TransformFrameType } from '../types'
import { SPEED_MULTIPLIER } from './game'

export const PeashooterState = {
  IDLE: 'idle',
  SHOOTING: 'shooting'
}

export const PEASHOOTER_TIMER = 8 * SPEED_MULTIPLIER
export const PEASHOOTER_WIDTH = 26
export const PEASHOOTER_HEIGHT = 30

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

export const PeaState = {
  FLYING: 'flying',
  ON_HIT: 'on-hit'
}

export const PeaFrame = {
  FLYING: 'flying',
  EXPLODING_1: 'exploding-1',
  EXPLODING_2: 'exploding-2'
}

export const PeaKeyframe = {
  [PeaFrame.FLYING]: { originX: 80, originY: 31, w: 10, h: 10, timer: 60 },
  [PeaFrame.EXPLODING_1]: { originX: 90, originY: 31, w: 10, h: 11, timer: 5 * SPEED_MULTIPLIER },
  [PeaFrame.EXPLODING_2]: { originX: 100, originY: 31, w: 13, h: 15, timer: 5 * SPEED_MULTIPLIER }
}

export const PeaAnimation = {
  OnHit: [PeaKeyframe[PeaFrame.EXPLODING_1], PeaKeyframe[PeaFrame.EXPLODING_2], PeaKeyframe[PeaFrame.EXPLODING_1]]
}

export const FIRE_RATE = 1500 * SPEED_MULTIPLIER
export const PEA_SPEED = 100
