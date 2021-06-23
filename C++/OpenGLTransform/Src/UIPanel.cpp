#include "UIPanel.h"



ui_panel::ui_panel(Model* controller,std::string title, 
	Texture* orTexDif,
	Texture* orTexSpec)
{
	this->position = ImVec2(50, 220);
	this->size = ImVec2(200, 400);
	this->keepRatio = false;
	this->controller = controller;
	this->title = title + " Transform";
	this->altTex =orTexDif;
	this->altTexSpec = orTexSpec;
}



void ui_panel::Display()
{
	ImGui::SetNextWindowPos(this->position, ImGuiCond_FirstUseEver);
	ImGui::SetNextWindowSize(this->size, ImGuiCond_FirstUseEver);
	ImGui::Begin(this->title.c_str());
	

	Material * material = controller->getMaterial();
	auto scaleKeepRatio = this->keepRatio;

	ImGui::Text("Material");

	
	ImGui::ColorEdit3("Ambient", (float*)&material->ambient);
	ImGui::ColorEdit3("diffuse", (float*)&material->diffuse);
	ImGui::ColorEdit3("specular", (float*)&material->specular);
	if (ImGui::Button("Change Texture"))
	{
		controller->setTexture(altTex, altTexSpec);
	}
	/*if (ImGui::DragFloat("X##1", &material->ambient, 0.1f) |
		ImGui::DragFloat("Y##1", &material, 0.1f) |
		ImGui::DragFloat("Z##1", &translation.z, 0.1f))
		controller->setPosition(translation);*/


	

	ImGui::End();
}
