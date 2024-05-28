import { SCREEN_HEIGHT, SCREEN_WIDTH, SPEED_MULTIPLIER } from './game'

export const SUN_COUNTER_HUD_X = 5
export const SUN_COUNTER_HUD_Y = 0

export const SUN_ORIGIN_X = 0
export const SUN_ORIGIN_Y = 0
export const SUN_HUD_SIZE = 16

export const LERP_AMOUNT = 0.1 / SPEED_MULTIPLIER
export const SUN_DX = SUN_COUNTER_HUD_X + SUN_HUD_SIZE / 2
export const SUN_DY = SUN_COUNTER_HUD_Y + SUN_HUD_SIZE / 2

export const SUN_NUMBER_HUD_MIDDLE_X = SUN_COUNTER_HUD_X + SUN_HUD_SIZE / 2
export const SUN_NUMBER_HUD_Y = SUN_COUNTER_HUD_Y + SUN_HUD_SIZE - 1

export const SUN_NUMBER_WIDTH = 6
export const SUN_NUMBER_HEIGHT = 9
export const SUN_NUMBER_ORIGIN_X = 0
export const SUN_NUMBER_ORIGIN_Y = 27

export const SEEDS_BAR_X = SUN_COUNTER_HUD_X + SUN_HUD_SIZE + 5
export const SEEDS_BAR_Y = 0
export const SEED_PACKET_SIZE = 24

export const PROGRESS_BAR_ORIGIN_X = 0
export const PROGRESS_BAR_ORIGIN_Y = 37
export const PROGRESS_BAR_HEIGHT = 21
export const PROGRESS_BAR_WIDTH = 256
export const PROGRESS_BAR_X = SCREEN_WIDTH - PROGRESS_BAR_WIDTH
export const PROGRESS_BAR_Y = SCREEN_HEIGHT - PROGRESS_BAR_HEIGHT

export const ZOMBIE_HEAD_ORIGIN_X = 71
export const ZOMBIE_HEAD_ORIGIN_Y = 0
export const ZOMBIE_HEAD_WIDTH = 22
export const ZOMBIE_HEAD_HEIGHT = 23

export const PROGRESSION_ORIGIN_X = 115
export const PROGRESSION_ORIGIN_Y = 0
export const PROGRESSION_HEIGHT = 7
export const PROGRESSION_GAP_X = 7
export const PROGRESSION_GAP_Y = 7

export const FLAG_ORIGIN_X = 94
export const FLAG_ORIGIN_Y = 0
export const FLAG_WIDTH = 20
export const FLAG_HEIGHT = 15

export const FLAG_LERP_AMOUNT = 0.02 * SPEED_MULTIPLIER

export const FLAGPOLE_ORIGIN_X = 94
export const FLAGPOLE_ORIGIN_Y = 15
export const FLAGPOLE_WIDTH = 3
export const FLAGPOLE_HEIGHT = 5

export const DEFEAT_ORIGIN_X = 0
export const DEFEAT_ORIGIN_Y = 59
export const DEFEAT_SIZE = 95

export const LevelHud = [
  { originX: 118, originY: 0, w: 40, h: 13 },
  { originX: 159, originY: 0, w: 43, h: 13 },
  { originX: 203, originY: 0, w: 43, h: 13 },
]
