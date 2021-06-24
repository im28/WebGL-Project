export class Material
{
    constructor(ambient, diffuse, specular, diffuseTex, specularTex){
        this.ambient = ambient;
        this.diffuse = diffuse;
        this.specular = specular;
        this.diffuseTex = diffuseTex;
        this.specularTex = specularTex;

    }

    sendToShader(program){
        program.setVec3f(this.ambient, "material.ambient");
        program.setVec3f(this.diffuse, "material.diffuse");
        program.setVec3f(this.specular, "material.specular");
        program.set1i(this.diffuseTex, "material.diffuseTex");
        program.set1i(this.specularTex, "material.specularTex");
    }


}