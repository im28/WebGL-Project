/** @type {HTMLCanvasElement}  For Autocomplete*/
var canvas = document.querySelector("#canvas");
var gl = canvas.getContext("webgl");
export class Texture{
    constructor(url,type){
        this.type = type;
        
        this.texture = gl.createTexture();
        //gl.bindTexture(gl.TEXTURE_2D, this.texture);

        //maybe change to this.type
        gl.texParameteri(type,gl.TEXTURE_WRAP_S,gl.REPEAT);
        gl.texParameteri(type,gl.TEXTURE_WRAP_T,gl.REPEAT);
        gl.texParameteri(type,gl.TEXTURE_MAG_FILTER,gl.LINEAR_MIPMAP_NEAREST);
        gl.texParameteri(type,gl.TEXTURE_MIN_FILTER,gl.LINEAR);


        // gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE,
        //     new Uint8Array([0, 0, 255, 255]));

        this.image = new Image();
        this.image.src = url;
        this.image.addEventListener('load', function() {
              gl.bindTexture(gl.TEXTURE_2D, this.texture);
              gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA,gl.UNSIGNED_BYTE, this.image);
              gl.generateMipmap(gl.TEXTURE_2D);
        });
    }

    getID(){
        return this.texture;
    }

    bind(texture_unit){
        gl.activeTexture(gl.TEXTURE0+texture_unit);
        glBindTexture(this.type, this.texture);
    }

    unbind(){
        gl.activeTexture(0);
        glBindTexture(this.type, 0);
    }

}