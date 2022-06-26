import robot from 'robotjs';
import WebSocket from 'ws';
import Jimp from 'jimp';

export function controller(data: WebSocket.RawData, ws: WebSocket.WebSocket): void {
  console.log(String(data));
  const [command, ... args] = String(data).split(' '); 
  switch (command) {
    case 'mouse_right':
      moveCursorRight(+args[0]);
      break;
    case 'mouse_left':
      moveCursorLeft(+args[0]);
      break;
    case 'mouse_down':
      moveCursorDown(+args[0]);
      break;
    case 'mouse_up':
      moveCursorUp(+args[0]);
      break;
    case 'mouse_position':
      sendMousePosition(ws);
      break;
    case 'draw_square':
      drawSquare(+args[0]);
      break;
    case 'draw_rectangle':
      drawRectangle(args);
      break;
    case 'draw_circle':
      drawCircle(+args[0]);
      break;
    case 'prnt_scrn':
      getScreenShot(ws);
      break;
    default:
      console.error('Unknown command');
      break;
  }
}

function moveCursorRight(distance: number) {
  const mouse = robot.getMousePos();
  console.log(`Move cursor right success`);
  robot.moveMouse(mouse.x + distance, mouse.y);
}

function moveCursorLeft(distance: number) {
  const mouse = robot.getMousePos();
  console.log(`Move cursor left success`);
  robot.moveMouse(mouse.x - distance, mouse.y);
}

function moveCursorDown(distance: number) {
  const mouse = robot.getMousePos();
  console.log(`Move cursor down success`);
  robot.moveMouse(mouse.x, mouse.y + distance);
}

function moveCursorUp(distance: number) {
  const mouse = robot.getMousePos();
  console.log(`Move cursor up success`);
  robot.moveMouse(mouse.x, mouse.y - distance);
}

function sendMousePosition(ws: WebSocket.WebSocket) {
  const mouse = robot.getMousePos();
  console.log(`Send mouse position success`);
  ws.send(`mouse_position ${mouse.x},${mouse.y}`);
}

function drawSquare(width: number) {
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

function drawCircle(width: number) {
  const mouse = robot.getMousePos();

  robot.dragMouse(mouse.x - width, mouse.y);

  // robot.setMouseDelay(100);

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

function drawRectangle([width, length]: string[]) {
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

async function getScreenShot(ws: WebSocket.WebSocket) {
  const mouse = robot.getMousePos();
  console.log(mouse.x, mouse.y);
  const size = 200;
  const imgBitmap = robot.screen.capture(mouse.x, mouse.y, size, size);
  // console.log(imgBitmap);
  // const jimp = new Jimp({ data: imgBitmap.image, width: size, height: size });
  // console.log(jimp);
  const image = new Jimp(imgBitmap.width, imgBitmap.height);
  let pos = 0;
  image.scan(0, 0, image.bitmap.width, image.bitmap.height, (x, y, idx) => {
      image.bitmap.data[idx + 2] = imgBitmap.image.readUInt8(pos++);
      image.bitmap.data[idx + 1] = imgBitmap.image.readUInt8(pos++);
      image.bitmap.data[idx + 0] = imgBitmap.image.readUInt8(pos++);
      image.bitmap.data[idx + 3] = imgBitmap.image.readUInt8(pos++);
  });

  const imgBase64 = await image.getBase64Async(Jimp.MIME_PNG);
  const result = imgBase64.split(',')[1];
  ws.send(`prnt_scrn ${result}`);
  // const imgBase64 = await jimp.getBase64Async(Jimp.MIME_PNG);
  // const result = imgBase64.split(',')[1];
  // ws.send(`prnt_scrn ${result}`);
}