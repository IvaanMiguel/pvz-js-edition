import P5, { Vector } from 'p5'
import { ZombieId } from './scripts/constants/zombie/ids'

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
  animation: {
    originX: number
    originY: number
    w: number
    h: number
    timer: number
  }[]
  update: (p5: P5) => void
  draw: (p5: P5) => void
}

export interface ConstructorHitbox {
  x: number
  y: number
  w: number
  h: number
  isActive: boolean
}

export interface Hitbox {
  position: Vector
  w: number
  h: number
  isActive: boolean
}

export type ZombieId = (typeof ZombieId)[keyof typeof ZombieId]

interface WeightedZombie {
  type: ZombieId
  weight: number
}

export interface HordeInfo {
  hordeSize: number
  killsBeforeHorde: number
  zombiesPerSpawn: number[]
  zombies: WeightedZombie[]
  hordeZombies: WeightedZombie[]
}
