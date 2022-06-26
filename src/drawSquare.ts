import robot from 'robotjs';

export function drawSquare(width: number) {
  const mouse = robot.getMousePos();

  robot.setMouseDelay(100);
  
  robot.mouseToggle("down");
  robot.dragMouse(mouse.x + width, mouse.y);
  robot.dragMouse(mouse.x + width, mouse.y + width);
  robot.dragMouse(mouse.x, mouse.y + width);
  robot.dragMouse(mouse.x, mouse.y);
  robot.mouseToggle("up");

  console.log(`Draw square success`);
}