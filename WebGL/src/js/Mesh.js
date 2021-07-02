import { mat4, vec3 } from 'gl-matrix'
import { Vertex } from './Vertex'
import { Primitive } from './Primitive'
import { Shader } from './Shader'
import { Primitive } from './Primitive'

export class Mesh {
  // @param {Object.<string, array|object|typedarray>} vertexArray
  /**
   * @param {Vertex[]} vertexArray
   * @param {Array} indexArray
   * @param {vec3} position
   * @param {vec3} origin
   * @param {vec3} rotation
   * @param {vec3} scale
   * @param {Shader} shader
   */
  constructor(
    vertexArray,
    indexArray,
    position,
    origin,
    rotation,
    scale,
    gl,
    shader
  ) {
    this.ModelMatrix = mat4.create()
    this.position = position
    this.origin = origin
    this.rotation = rotation
    this.scale = scale

    this.vertexArray = vertexArray
    this.indexArray = indexArray
    /** @type {WebGL2RenderingContext} */
    this.gl = gl
    this.initVAO(shader)
  }

  /**
   * @param {Primitive} primitive
   * @param {vec3} position
   * @param {vec3} origin
   * @param {vec3} rotation
   * @param {vec3} scale
   * @param {Shader} shader
   */
  static PrimitiveConstructor(
    primitive,
    position,
    origin,
    rotation,
    scale,
    gl,
    shader
  ) {
    const vertexArray = new Float32Array(
      primitive.vertices.flatMap((v) => [
        ...v.position,
        ...v.color,
        ...v.texcoord,
        ...v.normal,
      ])
    )
    return new Mesh(
      vertexArray,
      new Uint16Array(primitive.indices),
      position,
      origin,
      rotation,
      scale,
      gl,
      shader
    )
  }

  /**
   * @param {Shader} shader
   */
  initVAO(shader) {
    this.vao = this.gl.createVertexArray()
    this.gl.bindVertexArray(this.vao)

    this.vbo = this.gl.createBuffer()
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vbo)
    this.gl.bufferData(
      this.gl.ARRAY_BUFFER,
      this.vertexArray,
      this.gl.STATIC_DRAW
    )
    if (this.indexArray.length > 0) {
      this.ebo = this.gl.createBuffer()
      this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.ebo)
      this.gl.bufferData(
        this.gl.ELEMENT_ARRAY_BUFFER,
        this.indexArray,
        this.gl.STATIC_DRAW
      )
    }
    // Position
    const positionLoc = this.gl.getAttribLocation(
      shader.program,
      'vertex_position'
    )
    this.gl.vertexAttribPointer(positionLoc, 3, this.gl.FLOAT, false, 44, 0)
    this.gl.enableVertexAttribArray(positionLoc)
    // Color
    const colorLoc = this.gl.getAttribLocation(shader.program, 'vertex_color')
    this.gl.vertexAttribPointer(colorLoc, 3, this.gl.FLOAT, false, 44, 12)
    this.gl.enableVertexAttribArray(colorLoc)
    // Texcoord
    const TextureLoc = this.gl.getAttribLocation(
      shader.program,
      'vertex_texcoord'
    )
    this.gl.vertexAttribPointer(TextureLoc, 2, this.gl.FLOAT, false, 44, 24)
    this.gl.enableVertexAttribArray(TextureLoc)
    // Normal
    const NormalLoc = this.gl.getAttribLocation(shader.program, 'vertex_normal')
    this.gl.vertexAttribPointer(NormalLoc, 3, this.gl.FLOAT, false, 44, 32)
    this.gl.enableVertexAttribArray(NormalLoc)

    this.gl.bindAttribLocation(shader.program, 0, 'vertex_position')
    this.gl.bindAttribLocation(shader.program, 1, 'vertex_color')
    this.gl.bindAttribLocation(shader.program, 2, 'vertex_texcoord')
    this.gl.bindAttribLocation(shader.program, 3, 'vertex_normal')
    // BIND VAO 0
    this.gl.bindVertexArray(null)
  }

  /**
   * @param {Shader} shader
   */
  updateUniforms(shader) {
    shader.setMat4fv(this.ModelMatrix, 'ModelMatrix')
  }

  /**
   * @param {vec3} position
   */
  move(position) {
    vec3.add(this.position, this.position, position)
  }

  updateModelMatrix() {
    this.ModelMatrix = mat4.create()
    mat4.translate(this.ModelMatrix, this.ModelMatrix, this.origin)
    mat4.rotateX(
      this.ModelMatrix,
      this.ModelMatrix,
      Math.radians(this.rotation[0])
    )
    mat4.rotateY(
      this.ModelMatrix,
      this.ModelMatrix,
      Math.radians(this.rotation[1])
    )
    mat4.rotateZ(
      this.ModelMatrix,
      this.ModelMatrix,
      Math.radians(this.rotation[2])
    )
    const newPos = vec3.sub(vec3.create(), this.position, this.origin)
    mat4.translate(this.ModelMatrix, this.ModelMatrix, newPos)
    mat4.scale(this.ModelMatrix, this.ModelMatrix, this.scale)
  }

  /**
   * @param {Shader} shader
   */
  render(shader) {
    this.updateModelMatrix()
    this.updateUniforms(shader)

    shader.use()

    this.gl.bindVertexArray(this.vao)

    if (this.indexArray.length === 0) {
      this.gl.drawArrays(this.gl.TRIANGLE_STRIP, 0, this.vertexArray.length)
    } else {
      this.gl.drawElements(
        this.gl.TRIANGLES,
        this.indexArray.length,
        this.gl.UNSIGNED_SHORT,
        0
      )
    }

    this.gl.bindVertexArray(null)
    this.gl.useProgram(null)
    // this.gl.activeTexture(0)
    this.gl.bindTexture(this.gl.TEXTURE_2D, null)
  }
}
