"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.drawRectangle = void 0;
const robotjs_1 = __importDefault(require("robotjs"));
function drawRectangle([width, length]) {
    const mouse = robotjs_1.default.getMousePos();
    robotjs_1.default.setMouseDelay(100);
    robotjs_1.default.mouseToggle("down");
    robotjs_1.default.dragMouse(mouse.x + +width, mouse.y);
    robotjs_1.default.dragMouse(mouse.x + +width, mouse.y + +length);
    robotjs_1.default.dragMouse(mouse.x, mouse.y + +length);
    robotjs_1.default.dragMouse(mouse.x, mouse.y);
    robotjs_1.default.mouseToggle("up");
    console.log(`Draw rectangle success`);
}
exports.drawRectangle = drawRectangle;
