import P5, { Image } from 'p5'
import { HordeInfo } from '../../types'
import {
  FLAGPOLE_HEIGHT,
  FLAGPOLE_ORIGIN_X,
  FLAGPOLE_ORIGIN_Y,
  FLAGPOLE_WIDTH,
  FLAG_HEIGHT,
  FLAG_LERP_AMOUNT,
  FLAG_ORIGIN_X,
  FLAG_ORIGIN_Y,
  FLAG_WIDTH,
  PROGRESSION_GAP_X,
  PROGRESSION_GAP_Y,
  PROGRESSION_HEIGHT,
  PROGRESSION_ORIGIN_X,
  PROGRESSION_ORIGIN_Y,
  PROGRESS_BAR_HEIGHT,
  PROGRESS_BAR_ORIGIN_X,
  PROGRESS_BAR_ORIGIN_Y,
  PROGRESS_BAR_WIDTH,
  PROGRESS_BAR_Y,
  ZOMBIE_HEAD_HEIGHT,
  ZOMBIE_HEAD_ORIGIN_X,
  ZOMBIE_HEAD_ORIGIN_Y,
  ZOMBIE_HEAD_WIDTH
} from '../constants/hud'
import Scene from '../core/Scene'

class ProgressBar {
  static spritesheet: Image

  x: number
  y: number
  hordes: HordeInfo[]
  flags: { x: number; y: number; raise: boolean }[] = []
  progressionLength: number[] = [0, 0]
  progressionGaps: number[] = []
  progressing: boolean = false

  constructor(x: number, y: number, hordes: HordeInfo[]) {
    this.x = x
    this.y = y
    this.hordes = hordes

    this.initFlags()
    this.setProgressionGaps()
  }

  static preload() {
    ProgressBar.spritesheet = Scene.hudSpritesheet
  }

  setProgressionGaps() {
    const width = (PROGRESS_BAR_WIDTH - PROGRESSION_GAP_X * 2) / this.hordes.length

    for (let i = 0; i < this.hordes.length; i++) {
      const currentHorde = this.hordes[i]

      if (i === 0) {
        this.progressionGaps.push(width / currentHorde.killsBeforeHorde)
        continue
      }

      const previousHorde = this.hordes[i - 1]
      this.progressionGaps.push(
        width / (currentHorde.killsBeforeHorde - (previousHorde.hordeSize + previousHorde.killsBeforeHorde))
      )
    }
  }

  initFlags() {
    const flagsGap = (PROGRESS_BAR_WIDTH - PROGRESSION_GAP_X * 2) / this.hordes.length

    for (let i = 0; i < this.hordes.length; i++) {
      this.flags.push({
        x: i * flagsGap + PROGRESSION_GAP_X + FLAG_WIDTH / 2,
        y: PROGRESS_BAR_Y + PROGRESS_BAR_HEIGHT / 2,
        raise: false
      })
    }
  }

  progress(currentHorde: number) {
    this.progressing = true
    this.progressionLength[1] += this.progressionGaps[currentHorde]
  }

  raiseFlag(index: number) {
    const i = this.flags.length - 1 - index

    this.flags[i].raise = true
  }

  updateRaisingFlag(p5: P5) {
    for (const flag of this.flags) {
      if (p5.round(flag.y) === this.y + 2.5 || !flag.raise) continue

      flag.y = p5.lerp(flag.y, this.y + 2.5, FLAG_LERP_AMOUNT)

      if (p5.round(flag.y) === this.y + 2.5) flag.y = p5.round(flag.y)
    }
  }

  updateProgression(p5: P5) {
    if (!this.progressing) return

    this.progressionLength[0] = p5.lerp(this.progressionLength[0], this.progressionLength[1], 0.01)

    if (p5.round(this.progressionLength[0]) !== this.progressionLength[1]) return

    this.progressionLength[0] = p5.round(this.progressionLength[0])
    this.progressing = false
  }

  update(p5: P5) {
    this.updateRaisingFlag(p5)
    this.updateProgression(p5)
  }

  drawBar(p5: P5) {
    p5.imageMode(p5.CORNER)
    p5.image(
      ProgressBar.spritesheet,
      this.x,
      this.y,
      PROGRESS_BAR_WIDTH,
      PROGRESS_BAR_HEIGHT,
      PROGRESS_BAR_ORIGIN_X,
      PROGRESS_BAR_ORIGIN_Y,
      PROGRESS_BAR_WIDTH,
      PROGRESS_BAR_HEIGHT
    )
  }

  drawProgression(p5: P5) {
    if (this.progressionLength[0] <= 0) return

    p5.imageMode(p5.CORNER)
    p5.image(
      ProgressBar.spritesheet,
      this.x + PROGRESS_BAR_WIDTH - PROGRESSION_GAP_X - this.progressionLength[0],
      this.y + PROGRESSION_GAP_Y,
      this.progressionLength[0],
      PROGRESSION_HEIGHT,
      PROGRESSION_ORIGIN_X,
      PROGRESSION_ORIGIN_Y,
      1,
      PROGRESSION_HEIGHT
    )
  }

  drawFlags(p5: P5) {
    for (const flag of this.flags) {
      p5.imageMode(p5.CORNER)
      p5.image(
        ProgressBar.spritesheet,
        flag.x - FLAG_WIDTH / 2,
        PROGRESS_BAR_Y + PROGRESS_BAR_HEIGHT / 2 - 0.5,
        FLAGPOLE_WIDTH,
        FLAGPOLE_HEIGHT,
        FLAGPOLE_ORIGIN_X,
        FLAGPOLE_ORIGIN_Y,
        FLAGPOLE_WIDTH,
        FLAGPOLE_HEIGHT
      )

      p5.imageMode(p5.CENTER)
      p5.image(
        ProgressBar.spritesheet,
        flag.x,
        flag.y,
        FLAG_WIDTH,
        FLAG_HEIGHT,
        FLAG_ORIGIN_X,
        FLAG_ORIGIN_Y,
        FLAG_WIDTH,
        FLAG_HEIGHT
      )
    }
  }

  drawZombieHead(p5: P5) {
    p5.imageMode(p5.CENTER)

    const x = p5.min(
      this.x + PROGRESS_BAR_WIDTH - PROGRESSION_GAP_X - this.progressionLength[0] + ZOMBIE_HEAD_WIDTH / 2 - 1,
      this.x + PROGRESS_BAR_WIDTH - ZOMBIE_HEAD_WIDTH / 2
    )

    p5.image(
      ProgressBar.spritesheet,
      x,
      this.y + PROGRESSION_GAP_Y + 3,
      ZOMBIE_HEAD_WIDTH,
      ZOMBIE_HEAD_HEIGHT,
      ZOMBIE_HEAD_ORIGIN_X,
      ZOMBIE_HEAD_ORIGIN_Y,
      ZOMBIE_HEAD_WIDTH,
      ZOMBIE_HEAD_HEIGHT
    )
  }

  draw(p5: P5) {
    this.drawBar(p5)
    this.drawProgression(p5)
    this.drawFlags(p5)
    this.drawZombieHead(p5)
  }
}

export default ProgressBar
