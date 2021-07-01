import { mat4, vec3 } from 'gl-matrix'
import { Shader } from './Shader'
import { Texture } from './Texture'
import { Material } from './Material'
import { Triangle, Quad, Pyramid, Cube, Cylinder, Vase } from './Primitive'
import { Mesh } from './Mesh'
import { Model } from './Model'
import { Light } from './Light'
import { UI } from './UI'

export class WindowManager {
  constructor(title, WINDOW_WIDTH, WINDOW_HEIGHT, resizable, gl) {
    // initialize the variables
    this.gl = gl
    this.window = null
    this.framebufferWidth = WINDOW_WIDTH
    this.framebufferHeight = WINDOW_HEIGHT

    this.camPosition = vec3.fromValues(0.0, 0.0, 10.0)
    this.worldUp = vec3.fromValues(0.0, 1.0, 0.0)
    this.camFront = vec3.fromValues(0.0, 0.0, -1.0)

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

    //  s = ExePath();
    // const std::string path(s.begin(), s.end());

    this.sourcePath = '\\..\\OpenGLTransform\\Src\\'
    this.initOpenGLOptions()
    // this.initMatrices()
    this.initShaders()
    // this.initTextures()
    // this.initMaterials()
    // this.initOBJModels()
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
    this.ViewMatrix = mat4(1.0)
    this.ViewMatrix = mat4.lookAt(
      this.camPosition,
      this.camPosition + this.camFront,
      this.worldUp
    )

    this.ProjectionMatrix = mat4(1.0)
    this.ProjectionMatrix = mat4.perspective(
      this.fov * (Math.PI / 180),
      this.framebufferWidth / this.framebufferHeight,
      this.nearPlane,
      this.farPlane
    )
  }

  initShaders() {
    /** @type {Shader[]} */
    this.shaders = []
    this.shaders.push(new Shader(this.gl))

    this.UI_panels = []
    this.UI_panels.push(new UI())
    this.UI_panels.push(new UI())

    this.UI_panels.forEach((m) => {
      m.Display()
    })
  }

  initTextures() {
    const t1 = this.sourcePath + 'Images/container.png'
    const t2 = this.sourcePath + 'Images/container_specular.png'
    const t3 = this.sourcePath + 'Images/Floor.png'
    const t4 = this.sourcePath + 'Images/FloorSpec.png'
    const t5 = this.sourcePath + 'Images/pusheen.png'
    const t6 = this.sourcePath + 'Images/pusheen_specular.png'

    /** @type {Texture[]} */
    this.textures = []
    this.textures.push(new Texture(t1, this.gl.TEXTURE_2D))
    this.textures.push(new Texture(t2, this.gl.TEXTURE_2D))

    this.textures.push(new Texture(t3, this.gl.TEXTURE_2D))
    this.textures.push(new Texture(t4, this.gl.TEXTURE_2D))

    this.textures.push(new Texture(t5, this.gl.TEXTURE_2D))
    this.textures.push(new Texture(t6, this.gl.TEXTURE_2D))
  }

  initMaterials() {
    /** @type {Material[]} */
    this.materials = []

    this.materials.push(new Material(0.5, vec3(1.0), vec3(1.0), 0.0, 1.0))
    this.materials.push(new Material(0.5, vec3(1.0), vec3(1.0), 0.0, 1.0))
    this.materials.push(new Material(0.5, vec3(1.0), vec3(1.0), 0.0, 1.0))
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
        vec3.fromValues(1.0, 1.0, 1.0)
      )
    )

    meshes.push(
      Mesh.PrimitiveConstructor(
        new Quad(),
        vec3.fromValues(0.0, 0.0, 0.0),
        vec3.fromValues(0.0, 0.0, 0.0),
        vec3.fromValues(0.0, 0.0, 0.0),
        vec3.fromValues(1.0, 1.0, 1.0)
      )
    )

    meshes2.push(
      Mesh.PrimitiveConstructor(
        new Quad(),
        vec3.fromValues(0.0, 0.0, 0.0),
        vec3.fromValues(0.0, 0.0, 0.0),
        vec3.fromValues(-90.0, 0.0, 0.0),
        vec3.fromValues(100.0, 100.0, 100.0)
      )
    )

    meshes3.push(
      Mesh.PrimitiveConstructor(
        new Quad(),
        vec3.fromValues(1.0, 0.0, 0.0),
        vec3.fromValues(0.0, 0.0, 0.0),
        vec3.fromValues(0.0, 0.0, 0.0),
        vec3.fromValues(1.0, 1.0, 1.0)
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
        vec3.fromValues(2.0, -5.0, 2.0),
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
    this.UI_panels.push(new UI(models[2], 'Quad', textures[4], textures[5]))
    this.UI_panels.push(
      new UI(models[1], 'Ground Plane', textures[4], textures[5])
    )
  }

  initPointLights() {
    /** @type {Light[]} */
    this.pointLights = []
    this.pointLights.push(new Light(vec3(0.0)))
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
    //Update view matrix (camera)
    this.ViewMatrix = this.camera.getViewMatrix()

    this.shaders[0].setMat4fv(this.ViewMatrix, 'ViewMatrix')
    this.shaders[0].setVec3f(this.camera.getPosition(), 'cameraPos')

    this.pointLights.forEach((pl) => {
      pl.sendToShader(this.shaders[0])
    })

    this.ProjectionMatrix = mat4.perspective(
      this.fov * (Math.PI / 180),
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
  render() {
    this.resizeWindow()

    /** @type {WebGL2RenderingContext} */
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

    // End Draw
    this.gl.flush()

    // glBindVertexArray(0);
    this.gl.bindVertexArray(null)
    this.gl.useProgram(null)
    this.gl.activeTexture(null)
    this.gl.bindTexture(this.gl.TEXTURE_2D, null)
  }

  framebuffer_resize_callback(fbW, fbH) {
    this.gl.Viewport(0, 0, fbW, fbH)
  }
}
