export const DEBUG = false
export const SHOW_GRID = false
export const SHOW_FPS = false

export const CANVAS_ELEMENT = document.getElementById('canvas') as HTMLCanvasElement
export const PIXEL_DENSITY = 4
export const SCREEN_WIDTH = 256
export const SCREEN_HEIGHT = 210

export const SPEED_MULTIPLIER = 1
export const FRAME_RATE_FRECUENCY = 1000

export const TILE_WIDTH = 26
export const TILE_HEIGHT = 32

export const LAWN_WIDTH = TILE_WIDTH * 9
export const LAWN_HEIGHT = TILE_HEIGHT * 5

export const LAWN_OFFSET_X = 8
export const LAWN_OFFSET_Y = 25

export const INITIAL_SUN_AMOUNT = 1000
export const MAX_SUN_AMOUNT = 9990
export const SPAWNING_SUN_TIMER = 10000 * SPEED_MULTIPLIER
