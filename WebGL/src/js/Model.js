import { Shader } from './Shader'
import { Material } from './Material'
import { Texture } from './Texture'
import { Mesh } from './Mesh'
import { vec3 } from 'gl-matrix'
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
  }
  /** @param {vec3}  rotation */
  setRotation(rotation) {
    this.meshes.forEach((mesh) => {
      mesh.rotation = rotation
    })
  }
  /** @param {vec3}  position */
  setPosition(position) {
    this.meshes.forEach((mesh) => {
      mesh.position = position
    })
  }

  /** @param {vec3}  scale */
  setScale(scale) {
    this.meshes.forEach((mesh) => {
      mesh.scale = scale
    })
  }

  /** @param {Shader}  shader */
  render(shader) {
    this.material.sendToShader(shader)
    shader.use()
    this.meshes.forEach((mesh) => {
      this.overrideTextureDiffuse.bind(0)
      this.overrideTextureSpecular.bind(1)
      mesh.render()
    })
  }
}
