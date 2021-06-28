/* eslint-disable indent */
/* eslint-disable no-debugger, no-console */
import { vec3, mat4 } from 'gl-matrix'

export const DIRECTION = {
  FORWARD: 1,
  BACKWARD: 2,
  LEFT: 3,
  RIGHT: 4,
  UP: 5,
  DOWN: 6,
}

export class Camera {
  constructor(position = vec3.zero, direction, worldUp = vec3.zero) {
    this.ViewMatrix = mat4.identity

    this.movementSpeed = 5
    this.sensitivity = 40

    this.worldUp = worldUp
    this.position = position
    this.front = vec3.zero
    this.right = vec3.zero
    this.up = worldUp

    this.pitch = 0.0
    this.yaw = -90.0
    this.roll = 0.0
  }

  updateCameraVectors() {
    this.front.x = Math.cos(this.yaw / 180.0) * Math.cos(this.pitch / 180.0)
    this.front.y = Math.sin(this.pitch / 180.0)
    this.front.z = Math.sin(this.yaw / 180.0) * Math.cos(this.pitch / 180.0)
    const out = vec3.zero
    this.front = vec3.normalize(this.front)
    this.right = vec3.normalize(out, vec3.cross(out, this.front, this.worldUp))
    this.up = vec3.normalize(out, vec3.cross(out, this.right, this.front))
  }

  getViewMatrix() {
    this.updateCameraVectors()
    mat4.lookAt(
      this.ViewMatrix,
      this.position,
      this.position + this.front,
      this.up
    )

    return this.ViewMatrix
  }

  getPosition() {
    return this.position
  }

  move(dt, direction) {
    switch (direction) {
      case DIRECTION.FORWARD:
        this.position += this.front * this.movementSpeed * dt
        break
      case DIRECTION.BACKWARD:
        this.position -= this.front * this.movementSpeed * dt
        break
      case DIRECTION.LEFT:
        this.position -= this.right * this.movementSpeed * dt
        break
      case DIRECTION.RIGHT:
        this.position += this.right * this.movementSpeed * dt
        break
      case DIRECTION.UP:
        this.position += this.up * this.movementSpeed * dt
        break
      case DIRECTION.DOWN:
        this.position -= this.up * this.movementSpeed * dt
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
  }

  updateInput(dt, direction, offsetX, offsetY) {
    this.updateMouseInput(dt, offsetX, offsetY)
  }
}
