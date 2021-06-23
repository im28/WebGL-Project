// Combine light and PointLight class into one
export class Light
{
    constructor(position,intensity= 1.0,color,constant,linear= 0.045,quadratic= 0.0075){
        this.position = position;
		this.constant = constant;
		this.linear = linear;
		this.quadratic = quadratic;
        this.intensity = intensity;
		this.color = color;
    }
    setPosition(position)
	{
		this.position = position;
	}
    sendToShader(program)
	{
		program.setVec3f(this.position, "pointLight.position");
		program.set1f(this.intensity, "pointLight.intensity");
		program.setVec3f(this.color, "pointLight.color");
		program.set1f(this.constant, "pointLight.constant");
		program.set1f(this.linear, "pointLight.linear");
		program.set1f(this.quadratic, "pointLight.quadratic");
	}
}