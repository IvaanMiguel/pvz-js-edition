import P5 from 'p5'
import { CANVAS_ELEMENT, PIXEL_DENSITY, SCREEN_HEIGHT, SCREEN_WIDTH } from './constants/game'
import Scene from './core/Scene'

const sketch = (p5: P5): void => {
  let scene: Scene
  let canvasHeight: number

  p5.preload = () => {
    Scene.preload(p5)
  }

  p5.setup = () => {
    p5.pixelDensity(PIXEL_DENSITY)
    p5.createCanvas(SCREEN_WIDTH, SCREEN_HEIGHT, p5.P2D, CANVAS_ELEMENT)

    canvasHeight = (CANVAS_ELEMENT.clientWidth / p5.width) * p5.height
    CANVAS_ELEMENT.style.setProperty('height', `${canvasHeight}px`, 'important')

    scene = new Scene(p5)
  }

  p5.draw = () => {
    p5.noSmooth()

    scene.draw(p5)
    scene.update(p5)
  }

  p5.windowResized = () => {
    CANVAS_ELEMENT.style.removeProperty('height')

    canvasHeight = (CANVAS_ELEMENT.clientWidth / p5.width) * p5.height
    CANVAS_ELEMENT.style.setProperty('height', `${canvasHeight}px`, 'important')
  }

  p5.mouseMoved = () => {
    console.log(p5.mouseX, p5.mouseY)
  }
}

new P5(sketch, document.body)
