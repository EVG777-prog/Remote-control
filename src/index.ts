// import Jimp from 'jimp';
// import robot from 'robotjs';
import { WebSocketServer } from 'ws';
import { httpServer } from './httpServer/httpServer';
import { controller } from './controller';

const HTTP_PORT = 3000;

console.log(`Start static http server on the ${HTTP_PORT} port!`);
httpServer.listen(HTTP_PORT);


const wsServer = new WebSocketServer({ port: 8080 });

wsServer.on('connection', ws => {
  ws.send(`Connection_ready!`);

  ws.on('message', data => {
    controller(data, ws);
    ws.send(`Recieve:${data}`);
  });

  ws.on('close', () => {
    ws.send(`Connection_closed!`);
  })
});

wsServer.on('close', () => {
  console.log('Close WSS!');
});

