#include "WindowManager.h"
#include <glm/glm.hpp>
#include <glm/ext.hpp>
#include <glm/gtx/string_cast.hpp>
int main()
{
	WindowManager window_manager("OpenGL2",
		1280, 720,
		4, 4,
		true);

	//MAIN LOOP
	while (!window_manager.getWindowShouldClose())
	{

		window_manager.update();
		window_manager.render();
	}

	return 0;
}