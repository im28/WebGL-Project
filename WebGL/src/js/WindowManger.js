import { mat4, vec3 } from 'gl-matrix'
import t1 from '@/images/container.png'
import t2 from '@/images/container_specular.png'
import t3 from '@/images/Floor.png'
import t4 from '@/images/FloorSpec.png'
import t5 from '@/images/pusheen.png'
import t6 from '@/images/pusheen_specular.png'

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
  constructor(title, WINDOW_WIDTH, WINDOW_HEIGHT, resizable, gl) {
    // initialize the variables
    /** @type {WebGL2RenderingContext} */
    this.gl = gl
    this.window = null
    this.framebufferWidth = WINDOW_WIDTH
    this.framebufferHeight = WINDOW_HEIGHT

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

    document.addEventListener('keydown', (e) => {
      this.updateKeyboardInput(e)
    })

    // document.addEventListener('mousemove', (e) => {
    //   this.updateMouseInput(e)
    // })

    this.initOpenGLOptions()
    // this.initMatrices()
    this.initShaders()
    this.initTextures()
    this.initMaterials()
    this.initModels()
    // this.initLights()
    // this.initUniforms()
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
        vec3.create(),
        vec3.create(),
        0,
        1
      )
    )
    this.materials.push(
      new Material(
        vec3.fromValues(0.5, 0.5, 0.5),
        vec3.create(),
        vec3.create(),
        0,
        1
      )
    )
    this.materials.push(
      new Material(
        vec3.fromValues(0.5, 0.5, 0.5),
        vec3.create(),
        vec3.create(),
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

    meshes.push(
      Mesh.PrimitiveConstructor(
        new Quad(),
        vec3.fromValues(0.0, 0.0, 0.0),
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
        vec3.fromValues(2.0, -50.0, 0.0),
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

    // UI_panels.push(new ui_panel(models[2], 'Quad', textures[4], textures[5]))
    // UI_panels.push(new ui_panel(models[1], 'Ground Plane', textures[4], textures[5]))
    /** @type {UI[]} */
    this.UI_panels = []
    this.UI_panels.push(
      new UI(this.models[2], 'Quad', this.textures[1], this.textures[2])
    )
    this.UI_panels.push(
      new UI(this.models[1], 'Ground Plane', this.textures[1], this.textures[2])
    )

    this.UI_panels.forEach((m) => {
      m.renderUIPanel()
    })
  }

  initPointLights() {
    /** @type {Light[]} */
    this.pointLights = []
    this.pointLights.push(new Light(vec3.fromValues(0.0, -15, -12)))
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
  }

  updateMouseInput(e) {
    var rect = this.gl.canvas.getBoundingClientRect()
    const x = e.pageX - rect.left
    const y = e.pageY - rect.top
    if (this.firstMouse) {
      this.lastMouseX = x
      this.lastMouseY = y
      this.firstMouse = false
    }

    // Calc offset
    this.mouseOffsetX = x - this.lastMouseX
    this.mouseOffsetY = this.lastMouseY - y

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

  update(dt) {
    // console.log(this.dt)
    this.curTime = dt
    this.dt = this.curTime - this.lastTime
    this.lastTime = this.curTime
    this.camera.updateInput(dt, this.mouseOffsetX, this.mouseOffsetY)
    this.render()
    requestAnimationFrame((d) => {
      this.update(d)
    })
  }

  render() {
    this.resizeWindow()

    this.gl.clearColor(0.0, 0.0, 0.0, 1.0)
    this.gl.clear(
      this.gl.COLOR_BUFFER_BIT,
      this.gl.DEPTH_BUFFER_BIT,
      this.gl.STENCIL_BUFFER_BIT
    )

    // Update the uniforms
    //this.updateUniforms()

    // Use a program
    this.shaders[0].use()

    // Render models
    this.models.forEach((m) => {
      m.render(this.shaders[0])
    })

    //Change models material values according to UIpanel colors
    this.UI_panels.forEach((m) => {
      m.updateColor()
      console.log(this.models[1].material.ambient)
    })

    // End Draw
    this.gl.flush()

    // glBindVertexArray(0);
    this.gl.bindVertexArray(null)
    this.gl.useProgram(null)
    // this.gl.activeTexture(null)
    this.gl.bindTexture(this.gl.TEXTURE_2D, null)
  }

  framebuffer_resize_callback(fbW, fbH) {
    this.gl.Viewport(0, 0, fbW, fbH)
  }
}
