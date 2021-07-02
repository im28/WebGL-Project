import { vec3 } from 'gl-matrix'
import { Shader } from './Shader'
import { Material } from './Material'
import { Texture } from './Texture'
import { Mesh } from './Mesh'

export class Model {
  /**
   * @param {vec3} position
   * @param {Material}  material
   * @param {Texture}  orTexDif
   * @param {Texture}  orTexSpec
   * @param {Mesh[]}  meshes
   */
  constructor(position, material, orTexDif, orTexSpec, meshes) {
    this.position = position
    this.material = material
    this.overrideTextureDiffuse = orTexDif
    this.overrideTextureSpecular = orTexSpec
    this.meshes = meshes

    this.meshes.forEach((_, index) => {
      this.meshes[index].move(position)
    })
  }

  /** @param {vec3}  rotation */
  setRotation(rotation) {
    this.meshes.forEach((_, index) => {
      this.meshes[index].rotation = rotation
    })
  }

  /** @param {vec3}  position */
  setPosition(position) {
    this.meshes.forEach((_, index) => {
      this.meshes[index].position = position
    })
  }

  /** @param {vec3}  scale */
  setScale(scale) {
    this.meshes.forEach((_, index) => {
      this.meshes[index].scale = scale
    })
  }

  /** @param {Shader}  shader */
  render(shader) {
    this.material.sendToShader(shader)
    shader.use()
    this.meshes.forEach((mesh) => {
      this.overrideTextureDiffuse.bind(0)
      this.overrideTextureSpecular.bind(1)
      mesh.render(shader)
    })
  }
}
