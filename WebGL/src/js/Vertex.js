export class Vertex {
   /**
   * @param {vec3} position
   * @param {vec3} color
   * @param {vec2} texcoord
   * @param {vec3} normal
   */
    constructor(position, color, texcoord, normal){
        this.position=position;
        this.color=color;
        this.texcoord=texcoord;
        this.normal=normal;
    }
}
