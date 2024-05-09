import P5 from 'p5'
import { TILE_HEIGHT } from '../../constants/game'
import Pea from '../../entities/peashooter/Pea'
import Lawn from '../Lawn'

class PeasSystem {
  peas: Pea[][]
  lawn: Lawn

  constructor(lawn: Lawn) {
    this.lawn = lawn

    this.peas = [...Array(this.lawn.h / TILE_HEIGHT)].map(() => [])
  }

  onPeaEnd = (pea: Pea) => {
    const index = this.peas[pea.lawnRow].indexOf(pea)

    this.peas[pea.lawnRow].splice(index, 1)
  }

  addPea = (x: number, y: number, lawnRow: number) => {
    this.peas[lawnRow].push(new Pea(x, y, lawnRow, this.onPeaEnd))
  }

  update(p5: P5) {
    for (let i = 0; i < this.peas.length; i++) {
      for (let j = 0; j < this.peas[i].length; j++) {
        const pea = this.peas[i][j]
        pea.vector.x > p5.width + 10 ? this.onPeaEnd(pea) : pea.update(p5)
      }
    }
  }

  draw(p5: P5) {
    for (let i = 0; i < this.peas.length; i++) {
      for (let j = 0; j < this.peas[i].length; j++) {
        this.peas[i][j].draw(p5)
      }
    }
  }
}

export default PeasSystem
