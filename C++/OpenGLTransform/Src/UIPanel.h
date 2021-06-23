#pragma once
#include "Model.h"
#include <imgui.h>

class ui_panel
{
public:
	ui_panel(Model* controller, std::string title, Texture* orTexDif, Texture* orTexSpec);
	void Display();
private:
	ImVec2 position;
	ImVec2 size;
	Model*controller;
	bool keepRatio;
	std::string title;
	Texture* altTex;
	Texture* altTexSpec;
};

