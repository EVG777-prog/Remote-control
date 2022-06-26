import WebSocket from 'ws';
import robot from 'robotjs';
import Jimp from 'jimp';

export async function getScreenShot(ws: WebSocket.WebSocket) {
  const mouse = robot.getMousePos();
  console.log(mouse.x, mouse.y);
  const size = 200;
  const imgBitmap = robot.screen.capture(mouse.x, mouse.y, size, size);
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

  console.log(`Make Screenshot success`);
}