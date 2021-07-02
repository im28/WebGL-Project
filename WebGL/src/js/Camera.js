/* eslint-disable indent */
/* eslint-disable no-debugger, no-console */
import { vec3, mat4 } from 'gl-matrix'

Math.radians = function (degrees) {
  return (degrees * Math.PI) / 180
}

export const DIRECTION = {
  FORWARD: 1,
  BACKWARD: 2,
  LEFT: 3,
  RIGHT: 4,
  UP: 5,
  DOWN: 6,
}

export class Camera {
  constructor(position = vec3.create(), worldUp = vec3.create()) {
    this.ViewMatrix = mat4.create()

    this.movementSpeed = 0.05
    this.sensitivity = 0.5

    this.worldUp = worldUp
    this.position = position
    this.front = vec3.create()
    this.right = vec3.create()
    this.up = worldUp

    this.pitch = 0.0
    this.yaw = -90.0
    this.roll = 0.0
    this.updateCameraVectors()
  }

  updateCameraVectors() {
    this.front[0] = Math.cos(
      Math.radians(this.yaw) * Math.cos(Math.radians(this.pitch))
    )
    this.front[1] = Math.sin(Math.radians(this.pitch))
    this.front[2] = Math.sin(
      Math.radians(this.yaw) * Math.cos(Math.radians(this.pitch))
    )
    const out = vec3.create()
    vec3.normalize(this.front, this.front)
    vec3.normalize(this.right, vec3.cross(out, this.front, this.worldUp))
    vec3.normalize(this.up, vec3.cross(out, this.right, this.front))
  }

  getViewMatrix() {
    this.updateCameraVectors()
    const out = vec3.add(vec3.create(), this.position, this.front)
    mat4.lookAt(this.ViewMatrix, this.position, out, this.up)

    return this.ViewMatrix
  }

  getPosition() {
    return this.position
  }

  move(dt, direction) {
    switch (direction) {
      case DIRECTION.FORWARD:
        vec3.scaleAndAdd(
          this.position,
          this.position,
          this.front,
          this.movementSpeed * dt
        )
        break
      case DIRECTION.BACKWARD:
        vec3.scaleAndAdd(
          this.position,
          this.position,
          this.front,
          -this.movementSpeed * dt
        )
        break
      case DIRECTION.LEFT:
        vec3.scaleAndAdd(
          this.position,
          this.position,
          this.right,
          -this.movementSpeed * dt
        )
        break
      case DIRECTION.RIGHT:
        vec3.scaleAndAdd(
          this.position,
          this.position,
          this.right,
          this.movementSpeed * dt
        )
        break
      case DIRECTION.UP:
        vec3.scaleAndAdd(
          this.position,
          this.position,
          this.up,
          this.movementSpeed * dt
        )
        break
      case DIRECTION.DOWN:
        vec3.scaleAndAdd(
          this.position,
          this.position,
          this.up,
          -this.movementSpeed * dt
        )
        break
      default:
        break
    }
  }

  updateMouseInput(dt, offsetX, offsetY) {
    this.pitch += offsetY * this.sensitivity * dt
    this.yaw += offsetX * this.sensitivity * dt

    if (this.pitch > 80.0) this.pitch = 80.0
    else if (this.pitch < -80.0) this.pitch = -80.0

    if (this.yaw > 360.0 || this.yaw < -360.0) this.yaw = 0.0
    console.log(offsetX, offsetY, this.pitch, this.yaw)
  }

  updateInput(dt, offsetX, offsetY) {
    this.updateMouseInput(dt, offsetX, offsetY)
  }
}
