export class Texture {
  /**
   * @param {string} url
   * @param {WebGL2RenderingContext} gl
   */
  constructor(url, type, gl) {
    this.type = type
    /** @type {WebGL2RenderingContext}  For Autocomplete */
    this.gl = gl
    this.texture = gl.createTexture()

    this.image = new Image()
    this.image.src = url
    this.callback = () => {
      gl.bindTexture(gl.TEXTURE_2D, this.texture)
      gl.texParameteri(this.type, gl.TEXTURE_WRAP_S, gl.REPEAT)
      gl.texParameteri(this.type, gl.TEXTURE_WRAP_T, gl.REPEAT)
      gl.texParameteri(
        this.type,
        gl.TEXTURE_MIN_FILTER,
        gl.LINEAR_MIPMAP_LINEAR
      )
      gl.texParameteri(this.type, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
      gl.texImage2D(
        gl.TEXTURE_2D,
        0,
        gl.RGBA,
        gl.RGBA,
        gl.UNSIGNED_BYTE,
        this.image
      )
      gl.generateMipmap(gl.TEXTURE_2D)
    }
    this.image.addEventListener('load', this.callback)
  }

  getID() {
    return this.texture
  }

  bind(texture_unit) {
    this.gl.activeTexture(this.gl.TEXTURE0 + texture_unit)
    this.gl.bindTexture(this.type, this.texture)
  }

  unbind() {
    this.gl.activeTexture(null)
    this.gl.bindTexture(this.type, null)
  }
}
