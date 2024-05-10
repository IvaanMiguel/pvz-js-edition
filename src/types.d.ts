import P5, { Vector } from 'p5'

export interface TransformFrame {
  [x: string]: {
    offsetX?: number
    offsetY?: number
  }
}

export interface EntityState {
  [x: string]: HandleState
}

export interface HandleState {
  type: string
  update: (p5: P5) => void
  draw: (p5: P5) => void
}

export interface Hitbox {
  position: Vector
  w: number
  h: number
  isActive: boolean
}
