import p5 from 'p5'

const canvas = document.getElementById('canvas') as HTMLCanvasElement

const sketch = (p5: p5) => {
  p5.setup = () => {
    p5.createCanvas(512, 384, 'p2d', canvas)
  }

  p5.draw = () => {
    p5.background('lightgray')
  }
}

new p5(sketch)
