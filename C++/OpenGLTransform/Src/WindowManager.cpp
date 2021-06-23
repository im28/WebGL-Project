#include "WindowManager.h"
#include <windows.h>
#include <string>
#include <iostream>

//Private functions
void WindowManager::initGLFW()
{
	//INIT GLFW
	if (glfwInit() == GLFW_FALSE)
	{
		std::cout << "ERROR::GLFW_INIT_FAILED" << "\n";
		glfwTerminate();
	}
}

void WindowManager::initWindow(
	const char* title,
	bool resizable
)
{
	glfwWindowHint(GLFW_OPENGL_PROFILE, GLFW_OPENGL_CORE_PROFILE);
	glfwWindowHint(GLFW_CONTEXT_VERSION_MAJOR, this->GL_VERSION_MAJOR);
	glfwWindowHint(GLFW_CONTEXT_VERSION_MINOR, this->GL_VERSION_MINOR);
	glfwWindowHint(GLFW_RESIZABLE, resizable);

	//glfwWindowHint(GLFW_OPENGL_FORWARD_COMPAT, GL_TRUE); MAC OS

	this->window = glfwCreateWindow(this->WINDOW_WIDTH, this->WINDOW_HEIGHT, title, NULL, NULL);

	if (this->window == nullptr)
	{
		std::cout << "ERROR::GLFW_WINDOW_INIT_FAILED" << "\n";
		glfwTerminate();
	}

	glfwGetFramebufferSize(this->window, &this->framebufferWidth, &this->framebufferHeight);
	glfwSetFramebufferSizeCallback(window, WindowManager::framebuffer_resize_callback);
	//IMPORTANT WHITH PERSPECTIVE MATRIX!!!

	//glViewport(0, 0, framebufferWidth, framebufferHeight);

	glfwMakeContextCurrent(this->window); //IMPORTANT!!
}

void WindowManager::initGLEW()
{
	//INIT GLEW (NEEDS WINDOW AND OPENGL CONTEXT)
	glewExperimental = GL_TRUE;

	//Error
	if (glewInit() != GLEW_OK)
	{
		std::cout << "ERROR::MAIN.CPP::GLEW_INIT_FAILED" << "\n";
		glfwTerminate();
	}
}

void WindowManager::initOpenGLOptions()
{
	glEnable(GL_DEPTH_TEST);

	glEnable(GL_CULL_FACE);
	glCullFace(GL_BACK);
	glFrontFace(GL_CCW);

	glEnable(GL_BLEND);
	glBlendFunc(GL_SRC_ALPHA, GL_ONE_MINUS_SRC_ALPHA);

	glPolygonMode(GL_FRONT_AND_BACK, GL_FILL);

	//Input
	glfwSetInputMode(window, GLFW_CURSOR, GLFW_CURSOR_NORMAL);
}

void WindowManager::initMatrices()
{
	this->ViewMatrix = glm::mat4(1.f);
	this->ViewMatrix = glm::lookAt(this->camPosition, this->camPosition + this->camFront, this->worldUp);

	this->ProjectionMatrix = glm::mat4(1.f);
	this->ProjectionMatrix = glm::perspective(
		glm::radians(this->fov),
		static_cast<float>(this->framebufferWidth) / this->framebufferHeight,
		this->nearPlane,
		this->farPlane
	);
}

std::wstring ExePath() {
	TCHAR buffer[MAX_PATH] = { 0 };
	GetModuleFileName(NULL, buffer, MAX_PATH);
	std::wstring::size_type pos = std::wstring(buffer).find_last_of(L"\\/");
	return std::wstring(buffer).substr(0, pos);
}

void WindowManager::initShaders()
{
	auto v = sourcePath + "vertex_core.glsl";
	auto f = sourcePath + "fragment_core.glsl";
	const char* vertex =v.c_str();
	const char* fragment = f.c_str();
	this->shaders.push_back(new Shader(this->GL_VERSION_MAJOR, this->GL_VERSION_MINOR,
		vertex, fragment));
}
void WindowManager::initTextures()
{
	auto t1 = (sourcePath + "Images/container.png");
	auto t2 = (sourcePath + "Images/container_specular.png");
	auto t3 = (sourcePath + "Images/Floor.png");
	auto t4 = (sourcePath + "Images/FloorSpec.png");
	auto t5 = (sourcePath + "Images/pusheen.png");
	auto t6 = (sourcePath + "Images/pusheen_specular.png");
	//TEXTURE 1
	this->textures.push_back(new Texture(t1.c_str(), GL_TEXTURE_2D));
	this->textures.push_back(new Texture(t2.c_str(), GL_TEXTURE_2D));

	this->textures.push_back(new Texture(t3.c_str(), GL_TEXTURE_2D));
	this->textures.push_back(new Texture(t4.c_str(), GL_TEXTURE_2D));

	this->textures.push_back(new Texture(t5.c_str(), GL_TEXTURE_2D));
	this->textures.push_back(new Texture(t6.c_str(), GL_TEXTURE_2D));

}

void WindowManager::initMaterials()
{
	this->materials.push_back(new Material(glm::vec3(0.5f), glm::vec3(1.f), glm::vec3(1.f),
		0, 1));
	this->materials.push_back(new Material(glm::vec3(0.5f), glm::vec3(1.f), glm::vec3(1.f),
		0, 1));
	this->materials.push_back(new Material(glm::vec3(0.5f), glm::vec3(1.f), glm::vec3(1.f),
		0, 1));
}

void WindowManager::initOBJModels()
{

}

//void WindowManager::initMeshes()
//{
//	Pyramid * pyramid = new Pyramid();
//	Cylinder *cylinder = new Cylinder(0.3, 1.0);
//	Triangle *triangle = new Triangle();
//	Quad * quad = new Quad();
//	Cube *cube =new Cube();
//	Vase * vase = new Vase(100	, 50);
//
//	
//	this->meshes.push_back(
//		new Mesh(
//			pyramid,
//			glm::vec3(5.f,0,0),
//			glm::vec3(0.f),
//			glm::vec3(1.f)
//			)
//	);
//	UI_panels.push_back(new ui_panel(this->meshes[0],"pyramid"));
//}
void WindowManager::initModels()
{
	std::vector<Mesh*>meshes;
	std::vector<Mesh*>meshes2;
	std::vector<Mesh*>meshes3;

	meshes.push_back(
		new Mesh(
			&Pyramid(),
			glm::vec3(1.f, 0.f, 0.f),
			glm::vec3(0.f),
			glm::vec3(0.f),
			glm::vec3(1.f)
		)
	);

	

	meshes.push_back(
		new Mesh(
			&Quad(),
			glm::vec3(0.f, 0.f, 0.f),
			glm::vec3(0.f),
			glm::vec3(0.f),
			glm::vec3(1.f)
		)
	);

	meshes2.push_back(
		new Mesh(
			&Quad(),
			glm::vec3(0.f, 0.f, 0.f),
			glm::vec3(0.f),
			glm::vec3(-90.f, 0.f, 0.f),
			glm::vec3(100.f)
		)
	);

	meshes3.push_back(
		new Mesh(
			&Quad(),
			glm::vec3(1.f, 0.f, 0.f),
			glm::vec3(0.f),
			glm::vec3(0.f),
			glm::vec3(1.f)
		)
	);

	this->models.push_back(new Model(
		glm::vec3(0.f),
		this->materials[0],
		this->textures[0],
		this->textures[1],
		meshes
	)
	);

	this->models.push_back(new Model(
		glm::vec3(2.f, -5.f, 2.f),
		this->materials[1],
		this->textures[2],
		this->textures[3],
		meshes2
	)
	);

	
	this->models.push_back(new Model(
		glm::vec3(2.f,0,0),
		this->materials[2],
		this->textures[2],
		this->textures[3],
		meshes3
	)
	);
	UI_panels.push_back(new ui_panel(models[2], "Quad",textures[4],textures[5]));
	UI_panels.push_back(new ui_panel(models[1], "Ground Plane", textures[4], textures[5]));

	for (auto*& i : meshes)
		delete i;

	for (auto*& i : meshes2)
		delete i;
}

void WindowManager::initPointLights()
{
	this->pointLights.push_back(new PointLight(glm::vec3(0.f)));
}

void WindowManager::initLights()
{
	this->initPointLights();
}
//void WindowManager::initLights()
//{
//	this->lights.push_back(new glm::vec3(0.f, 0.f, 1.f));
//}
void WindowManager::initImGUI()
{
	IMGUI_CHECKVERSION();
	ImGui::CreateContext();
	ImGuiIO& io = ImGui::GetIO(); (void)io;

	ImGui::StyleColorsDark();

	ImGui_ImplGlfw_InitForOpenGL(window, true);
	const char* glsl_version = "#version 130";
	ImGui_ImplOpenGL3_Init(glsl_version);
}

void WindowManager::initUniforms()
{
	//INIT UNIFORMS
	this->shaders[SHADER_CORE_PROGRAM]->setMat4fv(ViewMatrix, "ViewMatrix");
	this->shaders[SHADER_CORE_PROGRAM]->setMat4fv(ProjectionMatrix, "ProjectionMatrix");

	for each (PointLight * pl in this->pointLights)
	{
		pl->sendToShader(*this->shaders[SHADER_CORE_PROGRAM]);
	}
}

void WindowManager::updateUniforms()
{
	//Update view matrix (camera)
	this->ViewMatrix = this->camera.getViewMatrix();

	this->shaders[SHADER_CORE_PROGRAM]->setMat4fv(this->ViewMatrix, "ViewMatrix");
	this->shaders[SHADER_CORE_PROGRAM]->setVec3f(this->camera.getPosition(), "cameraPos");

	for each (PointLight * pl in this->pointLights)
	{
		pl->sendToShader(*this->shaders[SHADER_CORE_PROGRAM]);
	}

	//Update framebuffer size and projection matrix
	glfwGetFramebufferSize(this->window, &this->framebufferWidth, &this->framebufferHeight);

	this->ProjectionMatrix = glm::perspective(
		glm::radians(this->fov),
		static_cast<float>(this->framebufferWidth) / this->framebufferHeight,
		this->nearPlane,
		this->farPlane
	);

	this->shaders[SHADER_CORE_PROGRAM]->setMat4fv(this->ProjectionMatrix, "ProjectionMatrix");
}

//Constructors / Destructors
WindowManager::WindowManager(
	const char* title,
	const int WINDOW_WIDTH, const int WINDOW_HEIGHT,
	const int GL_VERSION_MAJOR, const int GL_VERSION_MINOR,
	bool resizable
)
	:
	WINDOW_WIDTH(WINDOW_WIDTH),
	WINDOW_HEIGHT(WINDOW_HEIGHT),
	GL_VERSION_MAJOR(GL_VERSION_MAJOR),
	GL_VERSION_MINOR(GL_VERSION_MINOR),
	camera(glm::vec3(0.f, 0.f, 1.f), glm::vec3(0.f, 0.f, 1.f), glm::vec3(0.f, 1.f, 0.f))
{
	//Init variables
	this->window = nullptr;
	this->framebufferWidth = this->WINDOW_WIDTH;
	this->framebufferHeight = this->WINDOW_HEIGHT;

	this->camPosition = glm::vec3(0.f, 0.f, 1.f);
	this->worldUp = glm::vec3(0.f, 1.f, 0.f);
	this->camFront = glm::vec3(0.f, 0.f, -1.f);

	this->fov = 90.f;
	this->nearPlane = 0.1f;
	this->farPlane = 1000.f;

	this->dt = 0.f;
	this->curTime = 0.f;
	this->lastTime = 0.f;

	this->lastMouseX = 0.0;
	this->lastMouseY = 0.0;
	this->mouseX = 0.0;
	this->mouseY = 0.0;
	this->mouseOffsetX = 0.0;
	this->mouseOffsetY = 0.0;
	this->firstMouse = true;

	auto s = ExePath();
	const std::string path(s.begin(), s.end());
	sourcePath = path +"\\..\\OpenGLTransform\\Src\\";
	this->initGLFW();
	this->initWindow(title, resizable);
	this->initGLEW();
	this->initOpenGLOptions();
	
	this->initImGUI();
	this->initMatrices();
	this->initShaders();
	this->initTextures();
	this->initMaterials();
	this->initOBJModels();
	this->initModels();
	this->initLights();
	this->initUniforms();
}

WindowManager::~WindowManager()
{
	glfwDestroyWindow(this->window);
	glfwTerminate();

	for (size_t i = 0; i < this->shaders.size(); i++)
		delete this->shaders[i];

	for (size_t i = 0; i < this->textures.size(); i++)
		delete this->textures[i];

	for (size_t i = 0; i < this->materials.size(); i++)
		delete this->materials[i];

	for (auto*& i : this->models)
		delete i;

	for (size_t i = 0; i < this->pointLights.size(); i++)
		delete this->pointLights[i];
}

//Accessor
int WindowManager::getWindowShouldClose()
{
	return glfwWindowShouldClose(this->window);
}

//Modifier
void WindowManager::setWindowShouldClose()
{
	glfwSetWindowShouldClose(this->window, GLFW_TRUE);
}

//Functions
void WindowManager::updateDt()
{
	this->curTime = static_cast<float>(glfwGetTime());
	this->dt = this->curTime - this->lastTime;
	this->lastTime = this->curTime;
}

void WindowManager::updateMouseInput()
{

	if (glfwGetMouseButton(this->window, GLFW_MOUSE_BUTTON_2) == GLFW_PRESS)
	{
		glfwGetCursorPos(this->window, &this->mouseX, &this->mouseY);

		if (this->firstMouse)
		{
			this->lastMouseX = this->mouseX;
			this->lastMouseY = this->mouseY;
			this->firstMouse = false;
		}

		//Calc offset
		this->mouseOffsetX = this->mouseX - this->lastMouseX;
		this->mouseOffsetY = this->lastMouseY - this->mouseY;

		//Set last X and Y
		this->lastMouseX = this->mouseX;
		this->lastMouseY = this->mouseY;
	}
	//Move light
	if (glfwGetMouseButton(this->window, GLFW_MOUSE_BUTTON_1) == GLFW_PRESS)
	{
		this->pointLights[0]->setPosition(this->camera.getPosition());
	}
}

void WindowManager::updateKeyboardInput()
{
	//Program
	if (glfwGetKey(this->window, GLFW_KEY_ESCAPE) == GLFW_PRESS)
	{
		glfwSetWindowShouldClose(this->window, GLFW_TRUE);
	}

	//Camera
	if (glfwGetKey(this->window, GLFW_KEY_W) == GLFW_PRESS)
	{
		this->camera.move(this->dt, FORWARD);
	}
	if (glfwGetKey(this->window, GLFW_KEY_S) == GLFW_PRESS)
	{
		this->camera.move(this->dt, BACKWARD);
	}
	if (glfwGetKey(this->window, GLFW_KEY_A) == GLFW_PRESS)
	{
		this->camera.move(this->dt, LEFT);
	}
	if (glfwGetKey(this->window, GLFW_KEY_D) == GLFW_PRESS)
	{
		this->camera.move(this->dt, RIGHT);
	}
	if (glfwGetKey(this->window, GLFW_KEY_C) == GLFW_PRESS)
	{
		this->camera.move(this->dt, UP);
	}
	if (glfwGetKey(this->window, GLFW_KEY_SPACE) == GLFW_PRESS)
	{
		this->camera.move(this->dt, DOWN);
	}
}

void WindowManager::updateInput()
{
	glfwPollEvents();

	this->updateKeyboardInput();
	ImGuiIO& io = ImGui::GetIO();
	if (io.WantCaptureMouse)
	{
		return;
	}
	this->updateMouseInput();
	this->camera.updateInput(dt, -1, this->mouseOffsetX, this->mouseOffsetY);
}

void WindowManager::update()
{
	//UPDATE INPUT ---
	this->updateDt();
	this->updateInput();

	//this->meshes[0]->rotate(glm::vec3(0.f, 1.f, 0.f));
	//this->meshes[0]->setScale(glm::vec3(0.1f, 0.1f, 0.1f));
	
}

void WindowManager::render()
{
	glClearColor(0.f, 0.f, 0.f, 1.f);
	glClear(GL_COLOR_BUFFER_BIT | GL_DEPTH_BUFFER_BIT | GL_STENCIL_BUFFER_BIT);
	
	//Update the uniforms
	this->updateUniforms();
	
	
	//Use a program
	this->shaders[SHADER_CORE_PROGRAM]->use();

	//Render models
	for (auto& i : this->models)
		i->render(this->shaders[SHADER_CORE_PROGRAM]);

	bool show_demo_window = true;
	
	ImGui_ImplOpenGL3_NewFrame();
	ImGui_ImplGlfw_NewFrame();
	ImGui::NewFrame();

	//ImGui::ShowDemoWindow(&show_demo_window);
	for (ui_panel* panel : UI_panels)
	{
		panel->Display();
	}

	// Rendering
	ImGui::Render();
	
	
	ImGui_ImplOpenGL3_RenderDrawData(ImGui::GetDrawData());
	
	//End Draw
	glfwSwapBuffers(window);
	glFlush();

	glBindVertexArray(0);
	glUseProgram(0);
	glActiveTexture(0);
	glBindTexture(GL_TEXTURE_2D, 0);
}

//Static functions
void WindowManager::framebuffer_resize_callback(GLFWwindow* window, int fbW, int fbH)
{
	glViewport(0, 0, fbW, fbH);
};


