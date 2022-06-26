// import Jimp from 'jimp';
// import robot from 'robotjs';
import { WebSocketServer } from 'ws';
// import { Duplex } from 'stream';
import { httpServer } from './httpServer/httpServer';
import { controller } from './controller';
// import { createWebSocketStream } from 'ws';

const HTTP_PORT = 3000;

console.log(`Start static http server on the ${HTTP_PORT} port!`);
httpServer.listen(HTTP_PORT);


const wsServer = new WebSocketServer({ port: 8080 });

wsServer.on('connection', ws => {
  // eslint-disable-next-line no-useless-concat
  ws.send(`Connection_ready!`);

  ws.on('message', data => {
    controller(data, ws);
    ws.send(`Recieve:${data}`);
  });

  ws.on('close', () => {
    ws.send(`Connection_closed!`);
  })
});

// const ws = new WebSocket({ port: 8080 });

// const duplex: Duplex = createWebSocketStream(ws, { encoding: 'utf8' });
// duplex.write('mouse_position 444,333\0', (e) => {
//   if (e) {
//     console.log(e);
//   }
// }); 

process.on('SIGINT', () => {
  process.stdout.write('Closing webSocketServer\n');
  wsServer.close();
  process.exit();
});

