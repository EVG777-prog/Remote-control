"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.controller = void 0;
const robotjs_1 = __importDefault(require("robotjs"));
const getScreenShot_1 = require("./getScreenShot");
const drawSquare_1 = require("./drawSquare");
const drawCircle_1 = require("./drawCircle");
const drawRectangle_1 = require("./drawRectangle");
function controller(data, ws) {
    console.log(data);
    const [command, ...args] = data.split(' ');
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
            (0, drawSquare_1.drawSquare)(+args[0]);
            break;
        case 'draw_rectangle':
            (0, drawRectangle_1.drawRectangle)(args);
            break;
        case 'draw_circle':
            (0, drawCircle_1.drawCircle)(+args[0]);
            break;
        case 'prnt_scrn':
            (0, getScreenShot_1.getScreenShot)(ws);
            break;
        default:
            console.error('Unknown command');
            break;
    }
}
exports.controller = controller;
function moveCursorRight(distance) {
    const mouse = robotjs_1.default.getMousePos();
    console.log(`Move cursor right success`);
    robotjs_1.default.moveMouse(mouse.x + distance, mouse.y);
}
function moveCursorLeft(distance) {
    const mouse = robotjs_1.default.getMousePos();
    console.log(`Move cursor left success`);
    robotjs_1.default.moveMouse(mouse.x - distance, mouse.y);
}
function moveCursorDown(distance) {
    const mouse = robotjs_1.default.getMousePos();
    console.log(`Move cursor down success`);
    robotjs_1.default.moveMouse(mouse.x, mouse.y + distance);
}
function moveCursorUp(distance) {
    const mouse = robotjs_1.default.getMousePos();
    console.log(`Move cursor up success`);
    robotjs_1.default.moveMouse(mouse.x, mouse.y - distance);
}
function sendMousePosition(wsStream) {
    const mouse = robotjs_1.default.getMousePos();
    console.log(`Send mouse position success`);
    // ws.send(`mouse_position ${mouse.x},${mouse.y}`);
    wsStream.write(`mouse_position ${mouse.x},${mouse.y}`, (e) => {
        if (e)
            console.error(e);
    });
}
