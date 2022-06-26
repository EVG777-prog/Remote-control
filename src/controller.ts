import robot from 'robotjs';
import WebSocket from 'ws';
import { getScreenShot } from './getScreenShot';
import { drawSquare } from './drawSquare';
import { drawCircle } from './drawCircle';
import { drawRectangle } from './drawRectangle';

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
