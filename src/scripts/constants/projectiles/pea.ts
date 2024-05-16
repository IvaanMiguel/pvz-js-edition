import { SPEED_MULTIPLIER } from '../game'

export const DRAW_PEA_COORDS_POINT = false
export const DRAW_PEA_SPRITE_BORDERS = false
export const DRAW_PEA_HITBOX = true

export const PEA_SIZE = 10
export const PEA_DMG = 20

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
  [PeaFrame.FLYING]: { originX: 1, originY: 1, w: PEA_SIZE, h: PEA_SIZE, timer: 60 },
  [PeaFrame.EXPLODING_1]: { originX: 12, originY: 1, w: 10, h: 11, timer: 5 * SPEED_MULTIPLIER },
  [PeaFrame.EXPLODING_2]: { originX: 23, originY: 1, w: 13, h: 15, timer: 5 * SPEED_MULTIPLIER }
}

export const PeaAnimation = {
  OnHit: [PeaKeyframe[PeaFrame.EXPLODING_1], PeaKeyframe[PeaFrame.EXPLODING_2], PeaKeyframe[PeaFrame.EXPLODING_1]]
}

export const PEA_SPEED = 70 / SPEED_MULTIPLIER
