export class Material {
  constructor(ambient, diffuse, specular, diffuseTex, specularTex) {
    this.ambient = ambient
    this.diffuse = diffuse
    this.specular = specular
    this.diffuseTex = diffuseTex
    this.specularTex = specularTex
  }

  sendToShader(program) {
    program.set3fv(this.ambient, 'material.ambient')
    program.set3fv(this.diffuse, 'material.diffuse')
    program.set3fv(this.specular, 'material.specular')
    program.set1i(this.diffuseTex, 'material.diffuseTex')
    program.set1i(this.specularTex, 'material.specularTex')
  }
}
