import robot from 'robotjs';
import { Duplex } from 'stream';
import { getScreenShot } from './getScreenShot';
import { drawSquare } from './drawSquare';
import { drawCircle } from './drawCircle';
import { drawRectangle } from './drawRectangle';

export function controller(data: string, ws: Duplex): void {
  console.log(data);
  const [command, ... args] = data.split(' '); 
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

function sendMousePosition(wsStream: Duplex) {
  const mouse = robot.getMousePos();
  console.log(`Send mouse position success`);
  wsStream.write(`mouse_position ${mouse.x},${mouse.y}`, (e) => {
    if (e) console.error(e);
  });
}
