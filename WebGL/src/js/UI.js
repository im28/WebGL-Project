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
  constructor(controller, title, gui, orTexDif, orTexSpec) {
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
      x: controller.position[0],
      y: controller.position[1],
      z: controller.position[2],
      'rotation x': 0,
      'rotation y': 0,
      'rotation z': 0,
      Scale: 1,
      'Change Texture': () => {
        this.controller.overrideTextureDiffuse = orTexDif
        this.controller.overrideTextureSpecular = orTexSpec
      },
    }
  }

  renderUIPanel() {
    // this.gui.remember(this.panel)

    const f1 = this.gui.addFolder(this.title)
    f1.addColor(this.panel, 'ambient')
    f1.addColor(this.panel, 'diffuse')
    f1.addColor(this.panel, 'specular')
    f1.add(this.panel, 'x', -20, 20, 0.1)
    f1.add(this.panel, 'y', -20, 20, 0.1)
    f1.add(this.panel, 'z', -20, 20, 0.1)
    f1.add(this.panel, 'rotation x', 0, 2, 0.01)
    f1.add(this.panel, 'rotation y', 0, 2, 0.01)
    f1.add(this.panel, 'rotation z', 0, 2, 0.01)
    f1.add(this.panel, 'Scale', 0.5, 5, 0.01).onChange(() => {
      this.controller.setScale(this.panel.Scale)
    })
    f1.add(this.panel, 'Change Texture')
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
    this.controller.setPosition([this.panel.x, this.panel.y, this.panel.z])
    this.controller.rotate([
      this.panel['rotation x'],
      this.panel['rotation y'],
      this.panel['rotation z'],
    ])
  }
}
