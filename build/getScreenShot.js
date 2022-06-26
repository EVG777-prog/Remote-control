"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getScreenShot = void 0;
const robotjs_1 = __importDefault(require("robotjs"));
const jimp_1 = __importDefault(require("jimp"));
async function getScreenShot(wsStream) {
    const mouse = robotjs_1.default.getMousePos();
    console.log(mouse.x, mouse.y);
    const size = 200;
    const imgBitmap = robotjs_1.default.screen.capture(mouse.x, mouse.y, size, size);
    const image = new jimp_1.default(imgBitmap.width, imgBitmap.height);
    let pos = 0;
    image.scan(0, 0, image.bitmap.width, image.bitmap.height, (x, y, idx) => {
        image.bitmap.data[idx + 2] = imgBitmap.image.readUInt8(pos++);
        image.bitmap.data[idx + 1] = imgBitmap.image.readUInt8(pos++);
        image.bitmap.data[idx + 0] = imgBitmap.image.readUInt8(pos++);
        image.bitmap.data[idx + 3] = imgBitmap.image.readUInt8(pos++);
    });
    const imgBase64 = await image.getBase64Async(jimp_1.default.MIME_PNG);
    const result = imgBase64.split(',')[1];
    // ws.send(`prnt_scrn ${result}`);
    wsStream.write(`prnt_scrn ${result}`, (e) => {
        if (e)
            console.error(e);
    });
    console.log(`Make Screenshot success`);
}
exports.getScreenShot = getScreenShot;
