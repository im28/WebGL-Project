#pragma once

#include<gl\glew.h>


#include<vector>
#include"Vertex.h"

class Primitive
{
private:

public:
	std::vector<Vertex> vertices;
	std::vector<GLuint> indices;
	Primitive() {}
	virtual ~Primitive() {}

	//Functions
	void set(const Vertex* vertices,
		const unsigned nrOfVertices,
		const GLuint* indices,
		const unsigned nrOfIndices)
	{
		for (size_t i = 0; i < nrOfVertices; i++)
		{
			this->vertices.push_back(vertices[i]);
		}

		for (size_t i = 0; i < nrOfIndices; i++)
		{
			this->indices.push_back(indices[i]);
		}
	}

	Vertex* getVertices() { return this->vertices.data(); }
	GLuint* getIndices() { return this->indices.data(); }
	const unsigned getNrOfVertices() { return this->vertices.size(); }
	const unsigned getNrOfIndices() { return this->indices.size(); }
};

class Triangle : public Primitive
{
public:
	Triangle()
		: Primitive()
	{
		Vertex vertices[] =
		{
			//Position								//Color							//Texcoords					//Normals
			glm::vec3(0.f, 0.5f, 0.f),				glm::vec3(1.f, 0.f, 0.f),		glm::vec2(0.5f, 1.f),		glm::vec3(0.f, 0.f, 1.f),
			glm::vec3(-0.5f, -0.5f, 0.f),			glm::vec3(0.f, 1.f, 0.f),		glm::vec2(0.f, 0.f),		glm::vec3(0.f, 0.f, 1.f),
			glm::vec3(0.5f, -0.5f, 0.f),			glm::vec3(0.f, 0.f, 1.f),		glm::vec2(1.f, 0.f),		glm::vec3(0.f, 0.f, 1.f),
		};
		unsigned nrOfVertices = sizeof(vertices) / sizeof(Vertex);

		GLuint indices[] =
		{
			0, 1, 2	//Triangle 1
		};
		unsigned nrOfIndices = sizeof(indices) / sizeof(GLuint);

		this->set(vertices, nrOfVertices, indices, nrOfIndices);
	}
};

class Quad : public Primitive
{
public:
	Quad()
		: Primitive()
	{
		Vertex vertices[] =
		{
			//Position								//Color							//Texcoords					//Normals
			glm::vec3(-0.5f, 0.5f, 0.f),			glm::vec3(1.f, 0.f, 0.f),		glm::vec2(0.f, 1.f),		glm::vec3(0.f, 0.f, 1.f),
			glm::vec3(-0.5f, -0.5f, 0.f),			glm::vec3(0.f, 1.f, 0.f),		glm::vec2(0.f, 0.f),		glm::vec3(0.f, 0.f, 1.f),
			glm::vec3(0.5f, -0.5f, 0.f),			glm::vec3(0.f, 0.f, 1.f),		glm::vec2(1.f, 0.f),		glm::vec3(0.f, 0.f, 1.f),
			glm::vec3(0.5f, 0.5f, 0.f),				glm::vec3(1.f, 1.f, 0.f),		glm::vec2(1.f, 1.f),		glm::vec3(0.f, 0.f, 1.f)
		};
		unsigned nrOfVertices = sizeof(vertices) / sizeof(Vertex);

		GLuint indices[] =
		{
			0, 1, 2,	//Triangle 1
			0, 2, 3		//Triangle 2
		};
		unsigned nrOfIndices = sizeof(indices) / sizeof(GLuint);

		this->set(vertices, nrOfVertices, indices, nrOfIndices);
	}
};

class Pyramid : public Primitive
{
public:
	Pyramid()
		: Primitive()
	{
		Vertex vertices[] =
		{
			//Position								//Color							//Texcoords					//Normals
			//Triangle front
			glm::vec3(0.f, 0.5f, 0.f),				glm::vec3(1.f, 0.f, 0.f),		glm::vec2(0.5f, 1.f),		glm::vec3(0.f, 0.f, 1.f),
			glm::vec3(-0.5f, -0.5f, 0.5f),			glm::vec3(0.f, 1.f, 0.f),		glm::vec2(0.f, 0.f),		glm::vec3(0.f, 0.f, 1.f),
			glm::vec3(0.5f, -0.5f, 0.5f),			glm::vec3(0.f, 0.f, 1.f),		glm::vec2(1.f, 0.f),		glm::vec3(0.f, 0.f, 1.f),

			//Triangle left
			glm::vec3(0.f, 0.5f, 0.f),				glm::vec3(1.f, 1.f, 0.f),		glm::vec2(0.5f, 1.f),		glm::vec3(-1.f, 0.f, 0.f),
			glm::vec3(-0.5f, -0.5f, -0.5f),			glm::vec3(0.f, 0.f, 1.f),		glm::vec2(0.f, 0.f),		glm::vec3(-1.f, 0.f, 0.f),
			glm::vec3(-0.5f, -0.5f, 0.5f),			glm::vec3(0.f, 0.f, 1.f),		glm::vec2(1.f, 0.f),		glm::vec3(-1.f, 0.f, 0.f),

			//Triangle back
			glm::vec3(0.f, 0.5f, 0.f),				glm::vec3(1.f, 1.f, 0.f),		glm::vec2(0.5f, 1.f),		glm::vec3(0.f, 0.f, -1.f),
			glm::vec3(0.5f, -0.5f, -0.5f),			glm::vec3(0.f, 0.f, 1.f),		glm::vec2(0.f, 0.f),		glm::vec3(0.f, 0.f, -1.f),
			glm::vec3(-0.5f, -0.5f, -0.5f),			glm::vec3(0.f, 0.f, 1.f),		glm::vec2(1.f, 0.f),		glm::vec3(0.f, 0.f, -1.f),

			//Triangles right
			glm::vec3(0.f, 0.5f, 0.f),				glm::vec3(1.f, 1.f, 0.f),		glm::vec2(0.5f, 1.f),		glm::vec3(1.f, 0.f, 0.f),
			glm::vec3(0.5f, -0.5f, 0.5f),			glm::vec3(0.f, 0.f, 1.f),		glm::vec2(0.f, 0.f),		glm::vec3(1.f, 0.f, 0.f),
			glm::vec3(0.5f, -0.5f, -0.5f),			glm::vec3(0.f, 0.f, 1.f),		glm::vec2(1.f, 0.f),		glm::vec3(1.f, 0.f, 0.f),
		};
		unsigned nrOfVertices = sizeof(vertices) / sizeof(Vertex);

		this->set(vertices, nrOfVertices, nullptr, 0);
	}
};

class Cube : public Primitive
{
public:
	Cube()
		: Primitive()
	{
		Vertex vertices[] =
		{
			//Position								//Color							//Texcoords					//Normals
			glm::vec3(-0.5f, 0.5f, 0.5f),			glm::vec3(1.f, 0.f, 0.f),		glm::vec2(0.f, 1.f),		glm::vec3(0.f, 0.f, 1.f),
			glm::vec3(-0.5f, -0.5f, 0.5f),			glm::vec3(0.f, 1.f, 0.f),		glm::vec2(0.f, 0.f),		glm::vec3(0.f, 0.f, 1.f),
			glm::vec3(0.5f, -0.5f, 0.5f),			glm::vec3(0.f, 0.f, 1.f),		glm::vec2(1.f, 0.f),		glm::vec3(0.f, 0.f, 1.f),
			glm::vec3(0.5f, 0.5f, 0.5f),			glm::vec3(1.f, 1.f, 0.f),		glm::vec2(1.f, 1.f),		glm::vec3(0.f, 0.f, 1.f),

			glm::vec3(0.5f, 0.5f, -0.5f),			glm::vec3(1.f, 0.f, 0.f),		glm::vec2(0.f, 1.f),		glm::vec3(0.f, 0.f, -1.f),
			glm::vec3(0.5f, -0.5f, -0.5f),			glm::vec3(0.f, 1.f, 0.f),		glm::vec2(0.f, 0.f),		glm::vec3(0.f, 0.f, -1.f),
			glm::vec3(-0.5f, -0.5f, -0.5f),			glm::vec3(0.f, 0.f, 1.f),		glm::vec2(1.f, 0.f),		glm::vec3(0.f, 0.f, -1.f),
			glm::vec3(-0.5f, 0.5f, -0.5f),			glm::vec3(1.f, 1.f, 0.f),		glm::vec2(1.f, 1.f),		glm::vec3(0.f, 0.f, -1.f)
		};
		unsigned nrOfVertices = sizeof(vertices) / sizeof(Vertex);
		
		GLuint indices[] =
		{
			0, 1, 2,
			0, 2, 3,

			7, 6, 1,
			7, 1, 0,

			4, 5, 6,
			4, 6, 7,

			3, 2, 5,
			3, 5, 4
		};
		unsigned nrOfIndices = sizeof(indices) / sizeof(GLuint);

		this->set(vertices, nrOfVertices, indices, nrOfIndices);
	}
};

class Cylinder : public Primitive
{
public:
	Cylinder(GLfloat radius,
		GLfloat height)
		: Primitive()
	{


		GLfloat x = 0.0;
		GLfloat y = 0.0;
		GLfloat angle = 0.0;
		GLfloat angle_stepsize = 0.1;

		angle = 0.0;
		double pi = 3.14159265358979323846264338327950288;
		while (angle < 2 * pi) {
			x = radius * cos(angle);
			y = radius * sin(angle);
			this->vertices.push_back({ glm::vec3(x,y, height) ,			glm::vec3(1.f, 0, 1.f),		glm::vec2(0.f, 1.f),		glm::vec3(0.f, 0.f, 1.f) });
			this->vertices.push_back({ glm::vec3(x,y, 0) ,			glm::vec3(1.f, 0, 1.f),		glm::vec2(0.f, 1.f),		glm::vec3(0.f, 0.f, 1.f) });

			angle = angle + angle_stepsize;
		}
		this->vertices.push_back({ glm::vec3(radius,0, height) ,			glm::vec3(1.f, 0, 1.f),		glm::vec2(0.f, 1.f),		glm::vec3(0.f, 0.f, 1.f) });
		this->vertices.push_back({ glm::vec3(radius,0, 0) ,			glm::vec3(1.f, 0, 1.f),		glm::vec2(0.f, 1.f),		glm::vec3(0.f, 0.f, 1.f) });

		angle = 0.0;
		while (angle < 2 * pi) {
			x = radius * cos(angle);
			y = radius * sin(angle);
			this->vertices.push_back({ glm::vec3(x,y, height) ,			glm::vec3(1.f, 0, 1.f),		glm::vec2(0.f, 1.f),		glm::vec3(0.f, 0.f, 1.f) });

			angle = angle + angle_stepsize;
		}
		this->vertices.push_back({ glm::vec3(radius,0, height) ,			glm::vec3(1.f, 0, 1.f),		glm::vec2(0.f, 1.f),		glm::vec3(0.f, 0.f, 1.f) });

		int sa = this->indices.size();
		
	}


};



class Vase : public Primitive
{
public:
	Vase(int v_levels, int h_levels)
		: Primitive()
	{

		std::vector<glm::vec3> m_vertex;
		std::vector<glm::vec2> m_texcood;
		int horiz_levels = h_levels;
		int vertical_levels = v_levels;

		int mincal = 50, maxcal = 100; // minimum and maximum diameter
		double height = 380; //define the height of the vase
		int step = height / vertical_levels;
		double pi = 3.14159265358979323846264338327950288;
		for (int i = -50; i < 330; i += step) {
			double r1 = mincal * sin(i / 180.0 * pi) + maxcal;

			double r2 = mincal * sin((i + step) / 180.0 * pi) + maxcal;

			for (int j = 0; j < horiz_levels; j++) { //Division of each layer
				double angle1 = 360.0 / horiz_levels * j;
				double angle2 = 360.0 / horiz_levels * (j + 1);
				//Generate vertices v1, v2 on slice i, v3, v4 on slice i+step, four points constitute a square
				glm::vec3 v1(r1 * cos(angle1 / 180.0 * pi), i, r1 * sin(angle1 / 180.0 * pi));
				glm::vec3 v2(r1 * cos(angle2 / 180.0 * pi), i, r1 * sin(angle2 / 180.0 * pi));
				glm::vec3 v3(r2 * cos(angle2 / 180.0 * pi), i + step, r2 * sin(angle2 / 180.0 * pi));
				glm::vec3 v4(r2 * cos(angle1 / 180.0 * pi), i + step, r2 * sin(angle1 / 180.0 * pi));
				//Generate corresponding texture coordinates
				glm::vec2 t1((double)j / horiz_levels, (i + 50) / height);
				glm::vec2 t2((double)(j + 1) / horiz_levels, (i + 50) / height);
				glm::vec2 t3((double)(j + 1) / horiz_levels, (i + step + 50) / height);
				glm::vec2 t4((double)j / horiz_levels, (i + step + 50) / height);

				this->vertices.push_back({v1 ,			glm::vec3(1.f, 0, 1.f),		glm::vec2(0.f, 1.f),		glm::vec3(0.f, 0.f, 1.f) });
				this->vertices.push_back({v2 ,			glm::vec3(1.f, 0, 1.f),		glm::vec2(0.f, 1.f),		glm::vec3(0.f, 0.f, 1.f) });
				this->vertices.push_back({v3 ,			glm::vec3(1.f, 0, 1.f),		glm::vec2(0.f, 1.f),		glm::vec3(0.f, 0.f, 1.f) });
				this->vertices.push_back({v4 ,			glm::vec3(1.f, 0, 1.f),		glm::vec2(0.f, 1.f),		glm::vec3(0.f, 0.f, 1.f) });

				


			}
		}
		
		
		

		

		int sa = this->indices.size();

	}


};