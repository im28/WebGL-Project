export class Shader {
  constructor(gl) {
    this.gl = gl
    this.program = this.gl.createProgram()

    const vertexShader = gl.createShader(gl.VERTEX_SHADER)
    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER)

    gl.shaderSource(vertexShader, document.getElementById('vertex-shader').text)
    gl.compileShader(vertexShader)
    this.gl.attachShader(this.program, vertexShader)

    gl.shaderSource(
      fragmentShader,
      document.getElementById('fragment-shader').text
    )
    gl.compileShader(fragmentShader)
    this.gl.attachShader(this.program, fragmentShader)

    this.gl.linkProgram(this.program)

    const success = this.gl.getProgramParameter(
      this.program,
      this.gl.LINK_STATUS
    )

    if (!success) {
      console.log(
        'program failed to link:' + this.gl.getProgramInfoLog(this.program)
      )
      console.log(gl.getShaderInfoLog(fragmentShader))
    } else {
      console.log('program linked successfully')
    }

    gl.detachShader(this.program, vertexShader)
    gl.detachShader(this.program, fragmentShader)

    gl.deleteShader(vertexShader)
    gl.deleteShader(fragmentShader)
  }

  destructor() {
    this.gl.deletePrograme(this.program)
  }

  use() {
    this.gl.useProgram(this.program)
  }

  unuse() {
    this.gl.useProgram(null)
  }

  set1i(value, name) {
    this.use()

    this.gl.uniform1i(this.gl.getUniformLocation(this.program, name), value)

    this.unuse()
  }

  set1f(value, name) {
    this.use()

    this.gl.uniform1f(this.gl.getUniformLocation(this.program, name), value)

    this.unuse()
  }

  set2fv(value, name) {
    this.use()

    this.gl.uniform2fv(this.gl.getUniformLocation(this.program, name), value)

    this.unuse()
  }

  set3fv(value, name) {
    this.use()

    this.gl.uniform3fv(this.gl.getUniformLocation(this.program, name), value)

    this.unuse()
  }

  set4fv(value, name) {
    this.use()

    this.gl.uniform4fv(this.gl.getUniformLocation(this.program, name), value)

    this.unuse()
  }

  setMat3fv(value, name, transpose = false) {
    this.use()

    this.gl.uniformMatrix3fv(
      this.gl.getUniformLocation(this.program, name),
      transpose,
      value
    )

    this.unuse()
  }

  setMat4fv(value, name, transpose = false) {
    this.use()

    this.gl.uniformMatrix4fv(
      this.gl.getUniformLocation(this.program, name),
      transpose,
      value
    )

    this.unuse()
  }
}
