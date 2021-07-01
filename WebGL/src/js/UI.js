import * as dat from 'dat.gui'
import { Model } from './Model'

export class UI {
  // Actual Constructor which will be use in Window Manager
  /*
  constructor(controller, title, orTexDif, orTexSpec) {
    this.controller = controller
    this.title = title + ' Transform'
    this.altTex = orTexDif
    this.altTexSpec = orTexSpec
    this.material = controller.material

    this.panel = {
      ambient: this.material.ambient,
      diffuse: this.material.diffuse,
      specular: this.material.specular,
      ChangeTexture: function () {
        controller.setTexture(this.altTex, this.altTexSpec)
      },
    }
  }
	*/
  // Temporary Constructor use to display the panel using index.js
  constructor() {
    this.title = 'Transform'

    this.panel = {
      ambient: [0, 128, 255],
      diffuse: [0, 128, 255],
      specular: [0, 128, 255],
      ChangeTexture: function () {
        alert('Texture changed')
        // controller.setTexture(altTex, altTexSpec);
      },
    }
  }

  Display() {
    var gui = new dat.gui.GUI()
    gui.remember(this.panel)

    const f1 = gui.addFolder(this.title)
    f1.addColor(this.panel, 'ambient')
    f1.addColor(this.panel, 'diffuse')
    f1.addColor(this.panel, 'specular')
    f1.add(this.panel, 'ChangeTexture')

    /*
	controller.material.ambient = this.panel.ambient
	controller.material.diffuse = this.panel.diffuse
	controller.material.specular = this.panel.specular
	*/
  }
}
