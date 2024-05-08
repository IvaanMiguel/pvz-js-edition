import { TransformFrame as TransformFrameType } from '../../types'
import { SPEED_MULTIPLIER } from './game'

export const ZombieState = {
  WALKING: {
    FULL: 'walking-full',
    DAMAGED: 'walking-damaged',
  },
  EATING: {
    FULL: 'eating-full',
    DAMAGED: 'eating-damaged'
  },
  LYING_DOWN: 'lying-down'
}

export const ZOMBIE_TIMER = 8 * SPEED_MULTIPLIER
export const ZOMBIE_SPEED = 4

export const TransformFrame: TransformFrameType = {
  [ZombieState.WALKING.FULL]: { offsetY: 0 },
  [ZombieState.WALKING.DAMAGED]: { offsetX: -2, offsetY: 0 },
  [ZombieState.EATING.FULL]: { offsetY: 2 },
  [ZombieState.EATING.DAMAGED]: { offsetX: 0, offsetY: 2 }
}

export const ZombieDimensions = {
  [ZombieState.WALKING.FULL]: { originY: 0, width: 42, height: 54 },
  [ZombieState.WALKING.DAMAGED]: { originY: 54, width: 37, height: 54 },
  [ZombieState.EATING.FULL]: { originY: 175, width: 37, height: 51 },
  [ZombieState.EATING.DAMAGED]: { originY: 226, width: 37, height: 51 },
  [ZombieState.LYING_DOWN]: { originY: 141, width: 44, height: 34 }
}

export const FramesIndex = {
  [ZombieState.WALKING.FULL]: [0, 1, 2, 3, 4, 5, 6],
  [ZombieState.WALKING.DAMAGED]: [0, 1, 2, 3, 4, 5, 6],
  [ZombieState.EATING.FULL]: [0, 1, 2, 3, 4, 5, 6],
  [ZombieState.EATING.DAMAGED]: [0, 1, 2, 3, 4, 5, 6],
  [ZombieState.LYING_DOWN]: [0, 1, 2, 3, 4, 5, 6, 7, 8]
}
