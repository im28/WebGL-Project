import { vec3 } from 'gl-matrix'
import { Shader } from './Shader'

// Combine light and PointLight class into one
export class Light {
  constructor(
    position,
    intensity = 100.0,
    color = vec3.fromValues(1, 1, 1),
    constant = 4.0,
    linear = 0.045,
    quadratic = 0.0075
  ) {
    this.position = position
    this.constant = constant
    this.linear = linear
    this.quadratic = quadratic
    this.intensity = intensity
    this.color = color
  }

  setPosition(position) {
    this.position = position
  }

  /** @param {Shader} program */
  sendToShader(program) {
    program.set3fv(this.position, 'pointLight.position')
    program.set1f(this.intensity, 'pointLight.intensity')
    program.set3fv(this.color, 'pointLight.color')
    program.set1f(this.constant, 'pointLight.constant')
    program.set1f(this.linear, 'pointLight.linear')
    program.set1f(this.quadratic, 'pointLight.quadratic')
  }
}
