import robot from 'robotjs';

export function drawCircle(width: number) {
  const mouse = robot.getMousePos();

  robot.dragMouse(mouse.x - width, mouse.y);

  robot.mouseToggle("down");
  for (let i = 1; i <= width; i += 1) {
    const decY = Math.sqrt(width ** 2 - (width - i) ** 2);
    robot.dragMouse(mouse.x - width + i, mouse.y - decY);
  }
  for (let i = 1; i <= width; i += 1) {
    const decY = Math.sqrt(width ** 2 - i ** 2);
    robot.dragMouse(mouse.x + i, mouse.y - decY);
  }
  for (let i = 1; i <= width; i += 1) {
    const decY = Math.sqrt(width ** 2 - (width - i) ** 2);
    robot.dragMouse(mouse.x + width - i, mouse.y + decY);
  }
  for (let i = 1; i <= width; i += 1) {
    const decY = Math.sqrt(width ** 2 - i ** 2);
    robot.dragMouse(mouse.x - i, mouse.y + decY);
  }
  robot.mouseToggle("up");

  robot.moveMouse(mouse.x, mouse.y);

  console.log(`Draw circle success`);
}