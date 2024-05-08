import P5 from 'p5'
import Pea from '../../entities/peashooter/Pea'

class PeasSystem {
  peas: Pea[] = []

  constructor() {}

  onPeaEnd = (pea: Pea) => {
    const index = this.peas.indexOf(pea)

    this.peas.splice(index, 1)
  }

  addPea = (x: number, y: number) => {
    this.peas.push(new Pea(x, y, this.onPeaEnd))
  }

  update(p5: P5) {
    this.peas.forEach((pea) => {
      pea.vector.x > p5.width + 10 ? this.onPeaEnd(pea) : pea.update(p5)
    })
  }

  draw(p5: P5) {
    this.peas.forEach((pea) => pea.draw(p5))
  }
}

export default PeasSystem
