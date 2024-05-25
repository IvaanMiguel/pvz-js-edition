import P5 from 'p5'
import ZombiesSystem from './systems/ZombiesSystem'

class GameState {
  zombiesSystem: ZombiesSystem
  currentLevel: number = 1
  gameEnded: boolean = false
  onRestart: (p5: P5) => void

  constructor(p5: P5, zombiesSystem: ZombiesSystem, onRestart: (p5: P5) => void) {
    this.zombiesSystem = zombiesSystem
    this.onRestart = onRestart

    p5.keyPressed = (e: KeyboardEvent) => this.onKeyPreseed(p5, e)
  }

  isGameEnded() {
    for (let i = 0; i < this.zombiesSystem.zombies.length; i++) {
      for (let j = 0; j < this.zombiesSystem.zombies[i].length; j++) {
        const zombie = this.zombiesSystem.zombies[i][j]

        if (zombie.position.x > 0) continue

        this.gameEnded = true
      }
    }
  }

  onKeyPreseed(p5: P5, e: KeyboardEvent) {
    if (e.code === 'KeyR' && this.gameEnded) {
      this.gameEnded = false
      this.onRestart(p5)
    }
  }

  update(p5: P5) {
    if (this.gameEnded) return

    this.isGameEnded()
  }
}

export default GameState
