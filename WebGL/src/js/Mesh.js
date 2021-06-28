import { Vertex } from './Vertex'
import { Primitive } from './Primitive'
import { Shader } from './Shader'
import { mat4, vec3 } from 'gl-matrix'
export class Mesh {
  ModelMatrix = mat4.create()
  // @param {Object.<string, array|object|typedarray>} vertexArray
  /**
   * @param {Vertex[]} vertexArray
   * @param {Array} indexArray
   * @param {vec3} position
   * @param {vec3} origin
   * @param {vec3} rotation
   * @param {vec3} scale
   */
  constructor(vertexArray, indexArray, position, origin, rotation, scale, gl) {
    this.position = position
    this.origin = origin
    this.rotation = rotation
    this.scale = scale

    this.vertexArray = vertexArray
    this.indexArray = indexArray
    /** @type {WebGL2RenderingContext} */
    this.gl = gl
    this.initVAO()
  }
  /**
   * @param {Primitive} primitive
   * @param {vec3} position
   * @param {vec3} origin
   * @param {vec3} rotation
   * @param {vec3} scale
   */
  static PrimitiveConstructor(primitive, position, origin, rotation, scale, gl){
    return new Mesh(primitive.vertices,position, origin, rotation, scale, gl);
  }
  initVAO() {
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
        this.ebo,
        this.gl.STATIC_DRAW
      )
    }
    //Position
    this.gl.vertexAttribPointer(0, 3, this.gl.MEDIUM_FLOAT, false, 0, 0)
    this.gl.enableVertexAttribArray(0)
    //Color
    this.gl.vertexAttribPointer(1, 3, this.gl.MEDIUM_FLOAT, false, 0, 0)
    this.gl.enableVertexAttribArray(1)
    //Texcoord
    this.gl.vertexAttribPointer(2, 2, this.gl.MEDIUM_FLOAT, false, 0, 0)
    this.gl.enableVertexAttribArray(2)
    //Normal
    this.gl.vertexAttribPointer(3, 3, this.gl.MEDIUM_FLOAT, false, 0, 0)
    this.gl.enableVertexAttribArray(3)
    //BIND VAO 0
    this.gl.bindVertexArray(null)
  }

  /**
   * @param {Shader} shader
   */
  updateUniforms(shader) {
    shader.setMat4fv(this.ModelMatrix, 'ModelMatrix')
  }

  updateModelMatrix() {
    this.ModelMatrix = mat4.create()
    mat4.translate(this.ModelMatrix, this.ModelMatrix, this.origin)
    mat4.rotateX(this.ModelMatrix, this.ModelMatrix, this.rotation[0])
    mat4.rotateY(this.ModelMatrix, this.ModelMatrix, this.rotation[1])
    mat4.rotateZ(this.ModelMatrix, this.ModelMatrix, this.rotation[2])
    let newPos = vec3.sub(vec3.create(), this.position, this.origin)
    mat4.translate(this.ModelMatrix, this.ModelMatrix, newPos)
    mat4.scale(this.ModelMatrix, this.ModelMatrix, this.scale)
  }

  /**
   * @param {Shader} shader
   */
  render(shader) {
    this.updateModelMatrix();
    this.updateUniforms(shader);
    
    shader.use();

    this.gl.bindVertexArray(this.vao)

    if (this.indexArray.length == 0) {
        this.gl.drawArrays(this.gl.TRIANGLE_STRIP,0,this.vertexArray.length);
    } else {
        this.gl.drawArrays(this.gl.TRIANGLES,this.indexArray.length,this.gl.UNSIGNED_INT,0);
    }

    this.gl.bindVertexArray(null);
    this.gl.useProgram(null);
    this.gl.activeTexture(null);
    this.gl.bindTexture(this.gl.TEXTURE_2D,null);

  }
}
