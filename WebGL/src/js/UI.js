import * as dat from 'dat.gui'
import { Model } from './Model'
import { Texture } from './Texture'
import { vec3 } from 'gl-matrix'

export class UI {
  // Actual Constructor which will be use in Window Manager
  /**
   * @param {Model}  controller
   * @param {Texture}  orTexDif
   * @param {Texture}  orTexSpec
   */
  constructor(controller, title, orTexDif, orTexSpec) {
    this.controller = controller
    this.title = title + ' Transform'
    this.altTex = orTexDif
    this.altTexSpec = orTexSpec
    this.material = controller.material
    this.panel = {
      ambient: [
        this.material.ambient[0],
        this.material.ambient[1],
        this.material.ambient[2],
      ],
      diffuse: [
        parseInt(this.material.diffuse[0] * 255),
        parseInt(this.material.diffuse[1] * 255),
        parseInt(this.material.diffuse[2] * 255),
      ],
      specular: [
        parseInt(this.material.specular[0] * 255),
        parseInt(this.material.specular[1] * 255),
        parseInt(this.material.specular[2] * 255),
      ],
      ChangeTexture: function () {
        /*
        this.controller.overrideTextureDiffuse = orTexDif
        this.controller.overrideTextureSpecular = orTexSpec
		*/
      },
    }
  }

  multiplyColorValue() {
    for (let i = 0; i < 3; i++) {
      this.panel.ambient[i] = parseInt(this.panel.ambient[i] * 255)
      this.panel.diffuse[i] = parseInt(this.panel.diffuse[i] * 255)
      this.panel.specular[i] = parseInt(this.panel.specular[i] * 255)
    }
  }

  divideColorValue() {
    for (let i = 0; i < 3; i++) {
      this.panel.ambient[i] = (this.panel.ambient[i] / 255).toFixed(2)
      this.panel.diffuse[i] = (this.panel.diffuse[i] / 255).toFixed(2)
      this.panel.specular[i] = (this.panel.specular[i] / 255).toFixed(2)
    }
  }

  renderUIPanel() {
    this.gui = new dat.gui.GUI()
    this.gui.remember(this.panel)

    this.multiplyColorValue()
    const f1 = this.gui.addFolder(this.title)
    f1.addColor(this.panel, 'ambient')
    f1.addColor(this.panel, 'diffuse')
    f1.addColor(this.panel, 'specular')
    f1.add(this.panel, 'ChangeTexture')
    this.divideColorValue()
  }

  updateColor() {
    this.multiplyColorValue()
    this.divideColorValue()
    this.controller.material.ambient = this.panel.ambient
    this.controller.material.diffuse = this.panel.diffuse
    this.controller.material.specular = this.panel.specular
  }
}
