export class Texture{
    constructor(url,type,gl){
        this.type = type;
        /** @type {WebGL2RenderingContext}  For Autocomplete*/
        this.gl = gl
        this.texture = gl.createTexture();

        gl.texParameteri(this.type,gl.TEXTURE_WRAP_S,gl.REPEAT);
        gl.texParameteri(this.type,gl.TEXTURE_WRAP_T,gl.REPEAT);
        gl.texParameteri(this.type,gl.TEXTURE_MAG_FILTER,gl.LINEAR_MIPMAP_NEAREST);
        gl.texParameteri(this.type,gl.TEXTURE_MIN_FILTER,gl.LINEAR);


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
        this.gl.activeTexture(this.gl.TEXTURE0+texture_unit);
        this.gl.bindTexture(this.type, this.texture);
    }

    unbind(){
        this.gl.activeTexture(null);
        this.gl.bindTexture(this.type, null);
    }

}