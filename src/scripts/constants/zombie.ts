import { TransformFrame as TransformFrameType } from '../../types'
import { SPEED_MULTIPLIER, TILE_HEIGHT } from './game'

export const DRAW_SPRITE_BORDERS = false
export const DRAW_HITBOX = true

export const HITBOX_WIDTH = 15
export const HITBOX_HEIGHT = TILE_HEIGHT * 0.9

export const ZombieState = {
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

export const ZOMBIE_TIMER = 10 * SPEED_MULTIPLIER
export const ZOMBIE_SPEED = 2 - (2 - 2 / SPEED_MULTIPLIER)

export const TransformFrame: TransformFrameType = {
  [ZombieState.WALKING.FULL]: { offsetY: -9 },
  [ZombieState.WALKING.DAMAGED]: { offsetX: -2, offsetY: -9 },
  [ZombieState.EATING.FULL]: { offsetY: -7 },
  [ZombieState.EATING.DAMAGED]: { offsetY: -7 },
  [ZombieState.LYING_DOWN]: { offsetX: -7, offsetY: -1 }
}

export const ZombieDimensions = {
  [ZombieState.WALKING.FULL]: { originY: 0, width: 42, height: 47 },
  [ZombieState.WALKING.DAMAGED]: { originY: 48, width: 37, height: 47 },
  [ZombieState.EATING.FULL]: { originY: 161, width: 37, height: 44 },
  [ZombieState.EATING.DAMAGED]: { originY: 206, width: 37, height: 44 },
  [ZombieState.LYING_DOWN]: { originY: 129, width: 44, height: 31 }
}

export const FramesIndex = {
  [ZombieState.WALKING.FULL]: [0, 1, 2, 3, 4, 5, 6],
  [ZombieState.WALKING.DAMAGED]: [0, 1, 2, 3, 4, 5, 6],
  [ZombieState.EATING.FULL]: [0, 1, 2, 3, 4, 5, 6],
  [ZombieState.EATING.DAMAGED]: [0, 1, 2, 3, 4, 5, 6],
  [ZombieState.LYING_DOWN]: [0, 1, 2, 3, 4, 5, 6, 7, 8]
}
