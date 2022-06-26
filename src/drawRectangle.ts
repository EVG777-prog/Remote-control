import robot from 'robotjs';

export function drawRectangle([width, length]: string[]) {
  const mouse = robot.getMousePos();

  robot.setMouseDelay(100);

  robot.mouseToggle("down");
  robot.dragMouse(mouse.x + +width, mouse.y);
  robot.dragMouse(mouse.x + +width, mouse.y + +length);
  robot.dragMouse(mouse.x, mouse.y + +length);
  robot.dragMouse(mouse.x, mouse.y);
  robot.mouseToggle("up");

  console.log(`Draw rectangle success`);
}