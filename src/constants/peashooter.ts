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
  [PeashooterState.SHOOTING]: [8, 9, 10, 9, 8]
}

export const TransformFrame: TransformFrameType = {
  0: { offsetX: -1},
  2: { offsetX: 2 },
  4: { offsetX: -1 },
  5: { offsetX: -2 },
  6: { offsetX: -2 },
  7: { offsetX: -2 }
}

export const PeaFrame = {
  FLYING: 'flying',
  EXPLODING_1: 'exploding-1',
  EXPLODING_2: 'exploding-2'
}

export const PeaKeyframe = {
  [PeaFrame.FLYING]: { originX: 80, originY: 32, w: 10, h: 10, timer: 60 },
  [PeaFrame.EXPLODING_1]: { originX: 91, originY: 32, w: 10, h: 11, timer: 2 },
  [PeaFrame.EXPLODING_2]: { originX: 101, originY: 32, w: 13, h: 15, timer: 2 }
}

export const PeaAnimation = {
  Flying: [PeaKeyframe[PeaFrame.FLYING], PeaKeyframe[PeaFrame.FLYING]],
  OnHit: [PeaKeyframe[PeaFrame.EXPLODING_1], PeaKeyframe[PeaFrame.EXPLODING_2]]
}
