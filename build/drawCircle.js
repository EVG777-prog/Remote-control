"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.drawCircle = void 0;
const robotjs_1 = __importDefault(require("robotjs"));
function drawCircle(width) {
    const mouse = robotjs_1.default.getMousePos();
    robotjs_1.default.dragMouse(mouse.x - width, mouse.y);
    robotjs_1.default.mouseToggle("down");
    for (let i = 1; i <= width; i += 1) {
        const decY = Math.sqrt(width ** 2 - (width - i) ** 2);
        robotjs_1.default.dragMouse(mouse.x - width + i, mouse.y - decY);
    }
    for (let i = 1; i <= width; i += 1) {
        const decY = Math.sqrt(width ** 2 - i ** 2);
        robotjs_1.default.dragMouse(mouse.x + i, mouse.y - decY);
    }
    for (let i = 1; i <= width; i += 1) {
        const decY = Math.sqrt(width ** 2 - (width - i) ** 2);
        robotjs_1.default.dragMouse(mouse.x + width - i, mouse.y + decY);
    }
    for (let i = 1; i <= width; i += 1) {
        const decY = Math.sqrt(width ** 2 - i ** 2);
        robotjs_1.default.dragMouse(mouse.x - i, mouse.y + decY);
    }
    robotjs_1.default.mouseToggle("up");
    robotjs_1.default.moveMouse(mouse.x, mouse.y);
    console.log(`Draw circle success`);
}
exports.drawCircle = drawCircle;
