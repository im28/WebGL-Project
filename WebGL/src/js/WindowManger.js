import { mat4, vec3 } from 'gl-matrix'
import * as dat from 'dat.gui'
import t1 from '@/../public/container.png'
import t2 from '@/../public/container_specular.png'
import t3 from '@/../public/Floor.png'
import t4 from '@/../public/FloorSpec.png'
import t5 from '@/../public/pusheen.png'
import t6 from '@/../public/pusheen_specular.png'

import { Shader } from './Shader'
import { Camera, DIRECTION } from './Camera'
import { Texture } from './Texture'
import { Material } from './Material'
import { Quad, Pyramid } from './Primitive'
import { Mesh } from './Mesh'
import { Model } from './Model'
import { Light } from './Light'
import { UI } from './UI'

export class WindowManager {
  constructor(gl) {
    // initialize the variables
    /** @type {WebGL2RenderingContext} */
    this.gl = gl

    this.camPosition = vec3.fromValues(0, 0, 10)
    this.worldUp = vec3.fromValues(0.0, 1.0, 0.0)
    this.camFront = vec3.fromValues(0.0, 0.0, -1.0)
    this.camera = new Camera(this.camPosition, this.worldUp)

    this.fov = 90.0
    this.nearPlane = 0.1
    this.farPlane = 1000.0

    this.dt = 0.0
    this.curTime = 0.0
    this.lastTime = 0.0

    this.lastMouseX = 0.0
    this.lastMouseY = 0.0
    this.mouseX = 0.0
    this.mouseY = 0.0
    this.mouseOffsetX = 0.0
    this.mouseOffsetY = 0.0
    this.firstMouse = true

    this.gui = new dat.GUI()
    // this.gui.domElement.addEventListener('mouseover')

    document.addEventListener('keydown', (e) => {
      this.updateKeyboardInput(e)
    })
    const mouseMove = (e) => {
      this.updateMouseInput(e)
    }
    this.gl.canvas.addEventListener('mousedown', (event) => {
      if (event.button === 0) {
        this.gl.canvas.addEventListener('mousemove', mouseMove)
      }
      if (event.button === 2) {
        event.preventDefault()
        this.pointLights[0].position = vec3.clone(this.camera.position)
      }
    })

    this.gl.canvas.addEventListener('mouseup', (event) => {
      if (event.button === 0) {
        this.gl.canvas.removeEventListener('mousemove', mouseMove)
        this.firstMouse = true
      }
    })

    this.initOpenGLOptions()
    this.initMatrices()
    this.initShaders()
    this.initTextures()
    this.initMaterials()
    this.initModels()
    this.initLights()
    this.initUniforms()
  }

  initOpenGLOptions() {
    this.gl.enable(this.gl.DEPTH_TEST)

    this.gl.enable(this.gl.CULL_FACE)
    this.gl.cullFace(this.gl.BACK)
    this.gl.frontFace(this.gl.CCW)

    this.gl.enable(this.gl.BLEND)
    this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA)

    // this.gl.polygonMode(this.gl.FRONT_AND_BACK, this.gl.FILL)
  }

  initMatrices() {
    this.ViewMatrix = mat4.create()
    const out = vec3.add(vec3.create(), this.camPosition, this.camFront)
    mat4.lookAt(this.ViewMatrix, this.camPosition, out, this.worldUp)

    this.ProjectionMatrix = mat4.create()
    mat4.perspective(
      this.ProjectionMatrix,
      Math.radians(this.fov),
      this.framebufferWidth / this.framebufferHeight,
      this.nearPlane,
      this.farPlane
    )
  }

  initShaders() {
    /** @type {Shader[]} */
    this.shaders = []
    this.shaders.push(new Shader(this.gl))
  }

  initTextures() {
    /** @type {Texture[]} */
    this.textures = []
    this.textures.push(new Texture(t1, this.gl.TEXTURE_2D, this.gl))
    this.textures.push(new Texture(t2, this.gl.TEXTURE_2D, this.gl))

    this.textures.push(new Texture(t3, this.gl.TEXTURE_2D, this.gl))
    this.textures.push(new Texture(t4, this.gl.TEXTURE_2D, this.gl))

    this.textures.push(new Texture(t5, this.gl.TEXTURE_2D, this.gl))
    this.textures.push(new Texture(t6, this.gl.TEXTURE_2D, this.gl))
  }

  initMaterials() {
    /** @type {Material[]} */
    this.materials = []

    this.materials.push(
      new Material(
        vec3.fromValues(0.5, 0.5, 0.5),
        vec3.fromValues(1.0, 1.0, 1.0),
        vec3.fromValues(1.0, 1.0, 1.0),
        0,
        1
      )
    )
    this.materials.push(
      new Material(
        vec3.fromValues(0.5, 0.5, 0.5),
        vec3.fromValues(1.0, 1.0, 1.0),
        vec3.fromValues(1.0, 1.0, 1.0),
        0,
        1
      )
    )
    this.materials.push(
      new Material(
        vec3.fromValues(0.5, 0.5, 0.5),
        vec3.fromValues(1.0, 1.0, 1.0),
        vec3.fromValues(1.0, 1.0, 1.0),
        0,
        1
      )
    )
  }

  initModels() {
    /** @type {Mesh[]} */
    const meshes = []
    /** @type {Mesh[]} */
    const meshes2 = []
    /** @type {Mesh[]} */
    const meshes3 = []

    meshes.push(
      Mesh.PrimitiveConstructor(
        new Pyramid(),
        vec3.fromValues(1.0, 0.0, 0.0),
        vec3.fromValues(0.0, 0.0, 0.0),
        vec3.fromValues(0.0, 0.0, 0.0),
        vec3.fromValues(1.0, 1.0, 1.0),
        this.gl,
        this.shaders[0]
      )
    )

    meshes2.push(
      Mesh.PrimitiveConstructor(
        new Quad(),
        vec3.fromValues(0.0, 0.0, 0.0),
        vec3.fromValues(0.0, 0.0, 0.0),
        vec3.fromValues(-90.0, 0.0, 0.0),
        vec3.fromValues(100.0, 100.0, 100.0),
        this.gl,
        this.shaders[0]
      )
    )

    meshes3.push(
      Mesh.PrimitiveConstructor(
        new Quad(),
        vec3.fromValues(1.0, 0.0, 0.0),
        vec3.fromValues(0.0, 0.0, 0.0),
        vec3.fromValues(0.0, 0.0, 0.0),
        vec3.fromValues(1.0, 1.0, 1.0),
        this.gl,
        this.shaders[0]
      )
    )

    /** @type {Model[]} */
    this.models = []
    this.models.push(
      new Model(
        vec3.fromValues(0.0, 0.0, 0.0),
        this.materials[0],
        this.textures[0],
        this.textures[1],
        meshes
      )
    )

    this.models.push(
      new Model(
        vec3.fromValues(2.0, 0, -10),
        this.materials[1],
        this.textures[2],
        this.textures[3],
        meshes2
      )
    )

    this.models.push(
      new Model(
        vec3.fromValues(2.0, 0, 0),
        this.materials[2],
        this.textures[2],
        this.textures[3],
        meshes3
      )
    )

    /** @type {UI[]} */
    this.UI_panels = []
    this.UI_panels.push(
      new UI(
        this.models[2],
        'Quad',
        this.gui,
        this.textures[4],
        this.textures[5]
      )
    )
    this.UI_panels.push(
      new UI(
        this.models[0],
        'Pyramid',
        this.gui,
        this.textures[4],
        this.textures[5]
      )
    )
    this.UI_panels.push(
      new UI(
        this.models[1],
        'Plane',
        this.gui,
        this.textures[4],
        this.textures[5]
      )
    )

    this.UI_panels.forEach((m) => {
      m.renderUIPanel()
    })
  }

  initPointLights() {
    /** @type {Light[]} */
    this.pointLights = []
    this.pointLights.push(new Light(vec3.fromValues(0.0, 0, 0)))
  }

  initLights() {
    this.initPointLights()
  }

  initUniforms() {
    // INIT UNIFORMS
    this.shaders[0].setMat4fv(this.ViewMatrix, 'ViewMatrix')
    this.shaders[0].setMat4fv(this.ProjectionMatrix, 'ProjectionMatrix')

    this.pointLights.forEach((pl) => {
      pl.sendToShader(this.shaders[0])
    })
  }

  updateUniforms() {
    // Update view matrix (camera)
    this.ViewMatrix = this.camera.getViewMatrix()
    // console.log(this.camera.position)
    this.shaders[0].setMat4fv(this.ViewMatrix, 'ViewMatrix')
    this.shaders[0].set3fv(this.camera.getPosition(), 'cameraPos')

    this.pointLights.forEach((pl) => {
      pl.sendToShader(this.shaders[0])
    })

    mat4.perspective(
      this.ProjectionMatrix,
      Math.radians(this.fov),
      this.framebufferWidth / this.framebufferHeight,
      this.nearPlane,
      this.farPlane
    )

    this.shaders[0].setMat4fv(this.ProjectionMatrix, 'ProjectionMatrix')
  }

  resizeWindow() {
    const width = this.gl.canvas.clientWidth
    const height = this.gl.canvas.clientHeight
    if (this.gl.canvas.width !== width || this.gl.canvas.height !== height) {
      this.gl.canvas.width = width
      this.gl.canvas.height = height
    }
    this.framebufferWidth = width
    this.framebufferHeight = height
  }

  updateMouseInput(e) {
    const rect = this.gl.canvas.getBoundingClientRect()
    const x = e.pageX - rect.left
    const y = e.pageY - rect.top
    if (this.firstMouse) {
      this.lastMouseX = x
      this.lastMouseY = y
      this.firstMouse = false
    }

    // Calc offset
    if (x - this.lastMouseX > 1 || x - this.lastMouseX < -1) {
      this.mouseOffsetX = x - this.lastMouseX
    } else {
      this.mouseOffsetX = 0
    }

    if (y - this.lastMouseY > 1 || y - this.lastMouseY < -1) {
      this.mouseOffsetY = y - this.lastMouseY
    } else {
      this.mouseOffsetY = 0
    }

    // Set last X and Y
    this.lastMouseX = x
    this.lastMouseY = y
  }

  updateKeyboardInput(e) {
    if (e.key === 'w') {
      this.camera.move(this.dt, DIRECTION.FORWARD)
    }
    if (e.key === 's') {
      this.camera.move(this.dt, DIRECTION.BACKWARD)
    }
    if (e.key === 'a') {
      this.camera.move(this.dt, DIRECTION.LEFT)
    }
    if (e.key === 'd') {
      this.camera.move(this.dt, DIRECTION.RIGHT)
    }
    if (e.key === 'c') {
      this.camera.move(this.dt, DIRECTION.UP)
    }
    if (e.key === 'v') {
      this.camera.move(this.dt, DIRECTION.DOWN)
    }
  }

  update() {
    // console.log(this.dt)
    this.curTime = performance.now()
    this.dt = this.curTime - this.lastTime
    this.lastTime = this.curTime
    this.camera.updateInput(this.dt * 0.1, this.mouseOffsetX, this.mouseOffsetY)
    this.render()
    requestAnimationFrame((d) => {
      this.update(d)
    })
  }

  render() {
    this.resizeWindow()
    this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height)

    this.gl.clearColor(0.0, 0.0, 0.0, 1.0)
    this.gl.clear(
      this.gl.COLOR_BUFFER_BIT,
      this.gl.DEPTH_BUFFER_BIT,
      this.gl.STENCIL_BUFFER_BIT
    )

    // Update the uniforms
    this.updateUniforms()

    // Use a program
    this.shaders[0].use()

    // Render models
    this.models.forEach((m) => {
      m.render(this.shaders[0])
    })

    // Change models material values according to UIpanel colors
    this.UI_panels.forEach((m) => {
      m.updateColor()
      // console.log(this.models[1].material.ambient)
    })

    // End Draw
    this.gl.flush()

    // glBindVertexArray(0);
    this.gl.bindVertexArray(null)
    this.gl.useProgram(null)
    // this.gl.activeTexture(null)
    this.gl.bindTexture(this.gl.TEXTURE_2D, null)
  }
}
