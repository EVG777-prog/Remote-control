import robot from 'robotjs';
import Jimp from 'jimp';
import { Duplex } from 'stream';

export async function getScreenShot(wsStream: Duplex) {
  const mouse = robot.getMousePos();
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
  wsStream.write(`prnt_scrn ${result}`, (e) => {
    if (e) console.error(e);
  });

  console.log(`Make Screenshot success`);
}