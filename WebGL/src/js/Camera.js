/* eslint-disable indent */
export class Camera {
  constructor(position, direction, worldUp) {
    this.worldUp = worldUp
    this.position = position
  }

  move(dt, direction) {
    const DirectionEnum = Object.freeze({
      FORWARD: 1,
      BACKWARD: 2,
      LEFT: 3,
      RIGHT: 4,
      UP: 5,
      DOWN: 6,
    })
    switch (direction) {
      case DirectionEnum.FORWARD:
        this.position += this.front * this.movementSpeed * dt
        break
      case DirectionEnum.BACKWARD:
        this.position -= this.front * this.movementSpeed * dt
        break
      case DirectionEnum.LEFT:
        this.position -= this.right * this.movementSpeed * dt
        break
      case DirectionEnum.RIGHT:
        this.position += this.right * this.movementSpeed * dt
        break
      case DirectionEnum.UP:
        this.position += this.up * this.movementSpeed * dt
        break
      case DirectionEnum.DOWN:
        this.position -= this.up * this.movementSpeed * dt
        break
      default:
        break
    }
  }

  updateMouseInput(dt, offsetX, offsetY) {
    this.pitch += offsetY * this.sensitivity * dt
    this.yaw += offsetX * this.sensitivity * dt

    if (this.pitch > '80.0f') this.pitch = '80.f'
    else if (this.pitch < '-80.f') this.pitch = '-80.f'

    if (this.yaw > '360.f' || this.yaw < '-360.f') this.yaw = '0.f'
  }

  updateInput(dt, direction, offsetX, offsetY) {
    this.updateMouseInput(dt, offsetX, offsetY)
  }
}
