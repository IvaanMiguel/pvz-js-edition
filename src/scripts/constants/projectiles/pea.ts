import { SPEED_MULTIPLIER } from '../game'

export const DRAW_PEA_COORDS_POINT = true
export const DRAW_PEA_SPRITE_BORDERS = true
export const DRAW_PEA_HITBOX = true

export const PEA_SPEED = 80 / SPEED_MULTIPLIER
export const PEA_SIZE = 10
export const PEA_DMG = 20

export const PeaState = {
  FLYING: 'flying',
  ON_HIT: 'on-hit'
}

export const PeaFrame = {
  FLYING_1: 'flying-1',

  ON_HIT_1: 'exploding-1',
  ON_HIT_2: 'exploding-2'
}

export const PeaKeyframe = {
  [PeaFrame.FLYING_1]: { originX: 1, originY: 1, w: PEA_SIZE, h: PEA_SIZE, timer: 0 },

  [PeaFrame.ON_HIT_1]: { originX: 12, originY: 1, w: 10, h: 11, timer: 5 * SPEED_MULTIPLIER },
  [PeaFrame.ON_HIT_2]: { originX: 23, originY: 1, w: 13, h: 15, timer: 5 * SPEED_MULTIPLIER }
}

export const PeaAnimation = {
  [PeaState.FLYING]: [PeaKeyframe[PeaFrame.FLYING_1]],

  [PeaState.ON_HIT]: [
    PeaKeyframe[PeaFrame.ON_HIT_1],
    PeaKeyframe[PeaFrame.ON_HIT_2],
    PeaKeyframe[PeaFrame.ON_HIT_1]
  ]
}
