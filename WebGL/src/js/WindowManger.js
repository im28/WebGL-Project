export class WindowManager {

    constructor(title, WINDOW_WIDTH, WINDOW_HEIGHT, GL_VERSION_MAJOR, GL_VERSION_MINOR, resizable) {

        // initialize the variables
        //this.window = nullptr;
        this.framebufferWidth = WINDOW_WIDTH;
        this.framebufferHeight = WINDOW_HEIGHT;
        this.gl.VERSION_MAJOR = gl.VERSION_MAJOR;
        this.gl.VERSION_MINOR = gl.VERSION_MINOR;

        this.camPosition = gvec3(0.0, 0.0, 10);
        this.worldUp = vec3(0.0, 1.0, 0.0);
        this.camFront = vec3(0.0, 0.0, -1.0);

        this.fov = 90.0;
        this.nearPlane = 0.1;
        this.farPlane = 1000.0;

        this.dt = 0.0;
        this.curTime = 0.0;
        this.lastTime = 0.0;

        this.lastMouseX = 0.0;
        this.lastMouseY = 0.0;
        this.mouseX = 0.0;
        this.mouseY = 0.0;
        this.mouseOffsetX = 0.0;
        this.mouseOffsetY = 0.0;
        this.firstMouse = true;

        //  s = ExePath();
        // const std::string path(s.begin(), s.end());
        //sourcePath = path + "\\..\\OpenGLTransform\\Src\\";
        this.initGLFW();
        this.initWindow(title, resizable);
        this.initGLEW();
        this.initOpenGLOptions();

        this.initImGUI();
        this.initMatrices();
        this.initShaders();
        this.initTextures();
        this.initMaterials();
        this.initOBJModels();
        this.initModels();
        this.initLights();
        this.initUniforms();

    }

    // not sure is it correct or not, resizeable function
    initWindow(canvas, multiplier) {
        multiplier = multiplier || 1;
        const width = canvas.clientWidth * multiplier | 0;
        const height = canvas.clientHeight * multiplier | 0;
        if (canvas.width !== width || canvas.height !== height) {
            canvas.width = width;
            canvas.height = height;
            return true;
        }
        return false;
    }

    initOpenGLOptions() {
        gl.enable(gl.DEPTH_TEST);

        gl.enable(gl.CULL_FACE);
        gl.cullFace(gl.BACK);
        gl.frontFace(gl.CCW);

        gl.enable(gl.BLEND);
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

        gl.polygonMode(gl.FRONT_AND_BACK, gl.FILL);

    }

    initMatrices() {
        this.ViewMatrix = mat4(1.0);
        this.ViewMatrix = lookAt(this.camPosition, this.camPosition + this.camFront, this.worldUp);

        this.ProjectionMatrix = mat4(1.0);
        this.ProjectionMatrix = perspective(
            radians(this.fov),
            static_cast < float > (this.framebufferWidth) / this.framebufferHeight,
            this.nearPlane,
            this.farPlane
        );
    }

    // ExePath() {
    //     TCHAR buffer[MAX_PATH] = { 0 };
    //     GetModuleFileName(NULL, buffer, MAX_PATH);
    //     std::wstring::size_type pos = std::wstring(buffer).find_last_of(L"\\/");
    //     return std::wstring(buffer).substr(0, pos);
    // }

    initShaders() {
        this.shaders.push(new Shader(this.gl.VERSION_MAJOR, this.gl.VERSION_MINOR));
    }

    initTextures() {
        t1 = (sourcePath + "Images/container.png");
        t2 = (sourcePath + "Images/container_specular.png");
        t3 = (sourcePath + "Images/Floor.png");
        t4 = (sourcePath + "Images/FloorSpec.png");
        t5 = (sourcePath + "Images/pusheen.png");
        t6 = (sourcePath + "Images/pusheen_specular.png");

        //TEXTURE 1
        this.textures.push(new Texture(t1, gl.TEXTURE_2D));
        this.textures.push(new Texture(t2, gl.TEXTURE_2D));

        this.textures.push(new Texture(t3, gl.TEXTURE_2D));
        this.textures.push(new Texture(t4, gl.TEXTURE_2D));

        this.textures.push(new Texture(t5, gl.TEXTURE_2D));
        this.textures.push(new Texture(t6, gl.TEXTURE_2D));

    }

    initMaterials() {
        this.materials.push(new Material(vec3(0.5), vec3(1.0), vec3(1.0),
            0.0, 1.0));
        this.materials.push(new Material(vec3(0.5), vec3(1.0), vec3(1.0),
            0.0, 1.0));
        this.materials.push(new Material(vec3(0.5), vec3(1.0), vec3(1.0),
            0.0, 1.0));
    }

    // initMeshes() {
    //     pyramid = new Pyramid();
    //     cylinder = new Cylinder(0.3, 1.0);
    //     triangle = new Triangle();
    //     quad = new Quad();
    //     cube = new Cube();
    //     vase = new Vase(100, 50);

    //     this.meshes.push(
    //         new Mesh(
    //             pyramid,
    //             vec3(5.0, 0, 0),
    //             vec3(0.0),
    //             vec3(1.0)
    //         )
    //     );
    //     UI_panels.push(new ui_panel(this.meshes[0], "pyramid"));
    // }

    initModels() {
        meshes = [];
        meshes2 = [];
        meshes3 = [];

        meshes.push(
            new Mesh(
                Pyramid(),
                vec3(1.0, 0.0, 0.0),
                vec3(0.0),
                vec3(0.0),
                vec3(1.0)
            )
        );

        meshes.push(
            new Mesh(
                Quad(),
                vec3(0.0, 0.0, 0.0),
                vec3(0.0),
                vec3(0.0),
                vec3(1.0)
            )
        );

        meshes2.push(
            new Mesh(
                Quad(),
                vec3(0.0, 0.0, 0.0),
                vec3(0.0),
                vec3(-90.0, 0.0, 0.0),
                vec3(100.0)
            )
        );

        meshes3.push(
            new Mesh(
                Quad(),
                vec3(1.0, 0.0, 0.0),
                vec3(0.0),
                vec3(0.0),
                vec3(1.0)
            )
        );

        this.models.push(new Model(
            vec3(0.0),
            this.materials[0],
            this.textures[0],
            this.textures[1],
            meshes
        ));

        this.models.push(new Model(
            vec3(2.0, -5.0, 2.0),
            this.materials[1],
            this.textures[2],
            this.textures[3],
            meshes2
        ));


        this.models.push(new Model(
            vec3(2.0, 0, 0),
            this.materials[2],
            this.textures[2],
            this.textures[3],
            meshes3
        ));
        UI_panels.push(new ui_panel(models[2], "Quad", textures[4], textures[5]));
        UI_panels.push(new ui_panel(models[1], "Ground Plane", textures[4], textures[5]));

        for (i in meshes)
            delete i;

        for (i in meshes2)
            delete i;
    }

    initPointLights() {
        this.pointLights.push(new PointLight(vec3(0.0)));
    }

    initLights() {
        this.initPointLights();
    }
    // initLights()
    //{
    //	this->lights.push(new vec3(0.f, 0.f, 1.f));
    //}

    // initImGUI() {
    //     IMGUI_CHECKVERSION();
    //     ImGui::CreateContext();
    //     ImGuiIO & io = ImGui::GetIO();
    //     () io;

    //     ImGui::StyleColorsDark();

    //     ImGui_ImplGlfw_InitForOpenGL(window, true);
    //     const char * glsl_version = "#version 130";
    //     ImGui_ImplOpenGL3_Init(glsl_version);
    // }

    initUniforms() {
        //INIT UNIFORMS
        this.shaders[SHADER_CORE_PROGRAM].setMat4fv(ViewMatrix, "ViewMatrix");
        this.shaders[SHADER_CORE_PROGRAM].setMat4fv(ProjectionMatrix, "ProjectionMatrix");

        for (pl in this.pointLights) {
            pl.sendToShader(this.shaders[SHADER_CORE_PROGRAM]);
        }
    }

    // updateUniforms() {
    //     //Update view matrix (camera)
    //     this.ViewMatrix = this.camera.getViewMatrix();

    //     this.shaders[SHADER_CORE_PROGRAM].setMat4fv(this.ViewMatrix, "ViewMatrix");
    //     this.shaders[SHADER_CORE_PROGRAM].setVec3f(this.camera.getPosition(), "cameraPos");

    //     for each(PointLight * pl in this.pointLights) {
    //         pl.sendToShader( * this.shaders[SHADER_CORE_PROGRAM]);
    //     }

    //     //Update framebuffer size and projection matrix
    //     glfwGetFramebufferSize(this.window, & this.framebufferWidth, & this.framebufferHeight);

    //     this.ProjectionMatrix = perspective(
    //         radians(this.fov),
    //         static_cast < float > (this.framebufferWidth) / this.framebufferHeight,
    //         this.nearPlane,
    //         this.farPlane
    //     );

    //     this.shaders[SHADER_CORE_PROGRAM].setMat4fv(this.ProjectionMatrix, "ProjectionMatrix");
    // }


    render() {
        gl.clearColor(0.0, 0.0, 0.0, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT | gl.STENCIL_BUFFER_BIT);

        //Update the uniforms
        updateUniforms();

        //Use a program
        this.shaders[SHADER_CORE_PROGRAM].use();

        //Render models
        for (m in this.models)
            m.render(this.shaders[SHADER_CORE_PROGRAM]);

        show_demo_window = true;

        ImGui_ImplOpenGL3_NewFrame();
        ImGui_ImplGlfw_NewFrame();
        NewFrame();

        //ImGui::ShowDemoWindow(&show_demo_window);
        for (ui_panel * panel: UI_panels) {
            panel.Display();
        }

        // Rendering
        Render();

        ImGui_ImplOpenGL3_RenderDrawData(GetDrawData());

        //End Draw
        gl.Flush();

        //glBindVertexArray(0);
        gl.useProgram(0);
        gl.activeTexture(0);
        gl.bindTexture(gl.TEXTURE_2D, 0);
    }

    framebuffer_resize_callback(fbW, fbH) {
        glViewport(0, 0, fbW, fbH);
    };
}