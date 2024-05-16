import { SPEED_MULTIPLIER } from '../game'

export const DRAW_SUNFLOWER_COORDS_POINT = true
export const DRAW_SUNFLOWER_SPRITE_BORDERS = true
export const DRAW_SUNFLOWER_HITBOX = true
export const SHOW_HP = false

export const SUNFLOWER_SPAWNING_SUN_TIMER = 24000
export const SUNFLOWER_WIDTH = 32
export const SUNFLOWER_HEIGHT = 31
export const SUNFLOWER_HITBOX_WIDTH = SUNFLOWER_WIDTH * 0.5
export const SUNFLOWER_HITBOX_HEIGHT = SUNFLOWER_HEIGHT * 0.8

export const SUNFLOWER_TIMER = 10 * SPEED_MULTIPLIER

export const SunflowerState = {
  IDLE: 'idle',
  SHINING: 'shining'
}

export const SunflowerFrame = {
  IDLE_1: 'idle-1',
  IDLE_2: 'idle-2',
  IDLE_3: 'idle-3',
  IDLE_4: 'idle-4',
  IDLE_5: 'idle-5',
  IDLE_6: 'idle-6',
  SHINING_1: 'shining-1',
  SHINING_2: 'shining-2',
  SHINING_3: 'shining-3',
  SHINING_4: 'shining-4',
  SHINING_5: 'shining-5',
  SHINING_6: 'shining-6'
}

export const SunflowerKeyframe = {
  [SunflowerFrame.IDLE_1]: { originX: 1, originY: 1, w: SUNFLOWER_WIDTH, h: SUNFLOWER_HEIGHT, timer: SUNFLOWER_TIMER },
  [SunflowerFrame.IDLE_2]: { originX: 34, originY: 1, w: SUNFLOWER_WIDTH, h: SUNFLOWER_HEIGHT, timer: SUNFLOWER_TIMER },
  [SunflowerFrame.IDLE_3]: { originX: 67, originY: 1, w: SUNFLOWER_WIDTH, h: SUNFLOWER_HEIGHT, timer: SUNFLOWER_TIMER },
  [SunflowerFrame.IDLE_4]: { originX: 100, originY: 1, w: SUNFLOWER_WIDTH, h: SUNFLOWER_HEIGHT, timer: SUNFLOWER_TIMER },
  [SunflowerFrame.IDLE_5]: { originX: 133, originY: 1, w: SUNFLOWER_WIDTH, h: SUNFLOWER_HEIGHT, timer: SUNFLOWER_TIMER },
  [SunflowerFrame.IDLE_6]: { originX: 166, originY: 1, w: SUNFLOWER_WIDTH, h: SUNFLOWER_HEIGHT, timer: SUNFLOWER_TIMER },
  [SunflowerFrame.SHINING_1]: { originX: 1, originY: 33, w: SUNFLOWER_WIDTH, h: SUNFLOWER_HEIGHT, timer: SUNFLOWER_TIMER },
  [SunflowerFrame.SHINING_2]: { originX: 34, originY: 33, w: SUNFLOWER_WIDTH, h: SUNFLOWER_HEIGHT, timer: SUNFLOWER_TIMER },
  [SunflowerFrame.SHINING_3]: { originX: 67, originY: 33, w: SUNFLOWER_WIDTH, h: SUNFLOWER_HEIGHT, timer: SUNFLOWER_TIMER },
  [SunflowerFrame.SHINING_4]: { originX: 100, originY: 33, w: SUNFLOWER_WIDTH, h: SUNFLOWER_HEIGHT, timer: SUNFLOWER_TIMER },
  [SunflowerFrame.SHINING_5]: { originX: 133, originY: 33, w: SUNFLOWER_WIDTH, h: SUNFLOWER_HEIGHT, timer: SUNFLOWER_TIMER },
  [SunflowerFrame.SHINING_6]: { originX: 166, originY: 33, w: SUNFLOWER_WIDTH, h: SUNFLOWER_HEIGHT, timer: SUNFLOWER_TIMER }

}

export const SunflowerAnimation = {
  [SunflowerState.IDLE]: [
    SunflowerKeyframe[SunflowerFrame.IDLE_1],
    SunflowerKeyframe[SunflowerFrame.IDLE_2],
    SunflowerKeyframe[SunflowerFrame.IDLE_3],
    SunflowerKeyframe[SunflowerFrame.IDLE_4],
    SunflowerKeyframe[SunflowerFrame.IDLE_5],
    SunflowerKeyframe[SunflowerFrame.IDLE_6],
    SunflowerKeyframe[SunflowerFrame.IDLE_5],
    SunflowerKeyframe[SunflowerFrame.IDLE_4],
    SunflowerKeyframe[SunflowerFrame.IDLE_3],
    SunflowerKeyframe[SunflowerFrame.IDLE_2]
  ],
  [SunflowerState.SHINING]: [
    SunflowerKeyframe[SunflowerFrame.SHINING_1],
    SunflowerKeyframe[SunflowerFrame.SHINING_2],
    SunflowerKeyframe[SunflowerFrame.SHINING_3],
    SunflowerKeyframe[SunflowerFrame.SHINING_4],
    SunflowerKeyframe[SunflowerFrame.SHINING_5],
    SunflowerKeyframe[SunflowerFrame.SHINING_6],
    SunflowerKeyframe[SunflowerFrame.SHINING_5],
    SunflowerKeyframe[SunflowerFrame.SHINING_4],
    SunflowerKeyframe[SunflowerFrame.SHINING_3],
    SunflowerKeyframe[SunflowerFrame.SHINING_2]
  ]
}
