import * as dat from 'dat.gui'
import { vec3 } from 'gl-matrix'
import { Model } from './Model'
import { Texture } from './Texture'

export class UI {
  // Actual Constructor which will be use in Window Manager
  /**
   * @param {Model}  controller
   * @param {Texture}  orTexDif
   * @param {Texture}  orTexSpec
   */
  constructor(controller, title, gui) {
    this.controller = controller
    this.title = title + ' Transform'
    this.material = controller.material
    /** @type {dat.GUI} */
    this.gui = gui
    this.panel = {
      ambient: [
        this.material.ambient[0] * 255,
        this.material.ambient[1] * 255,
        this.material.ambient[2] * 255,
      ],
      diffuse: [
        this.material.diffuse[0] * 255,
        this.material.diffuse[1] * 255,
        this.material.diffuse[2] * 255,
      ],
      specular: [
        this.material.specular[0] * 255,
        this.material.specular[1] * 255,
        this.material.specular[2] * 255,
      ],
    }
  }

  multiplyColorValue() {
    for (let i = 0; i < 3; i += 1) {
      this.panel.ambient[i] *= 255
      this.panel.diffuse[i] *= 255
      this.panel.specular[i] *= 255
    }
  }

  divideColorValue() {
    for (let i = 0; i < 3; i += 1) {
      this.panel.ambient[i] /= 255
      this.panel.diffuse[i] /= 255
      this.panel.specular[i] /= 255
    }
  }

  renderUIPanel() {
    // this.gui.remember(this.panel)

    const f1 = this.gui.addFolder(this.title)
    f1.addColor(this.panel, 'ambient')
    f1.addColor(this.panel, 'diffuse')
    f1.addColor(this.panel, 'specular')
    this.divideColorValue()
  }

  updateColor() {
    this.controller.material.ambient = vec3.normalize(
      vec3.create(),
      this.panel.ambient
    )
    this.controller.material.diffuse = vec3.normalize(
      vec3.create(),
      this.panel.diffuse
    )
    this.controller.material.specular = vec3.normalize(
      vec3.create(),
      this.panel.specular
    )
    // this.divideColorValue()
  }
}
