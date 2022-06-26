import { WebSocketServer, createWebSocketStream } from 'ws';
import { httpServer } from './httpServer/httpServer';
import { controller } from './controller';


const HTTP_PORT = 3000;

console.log(`Start static http server on the ${HTTP_PORT} port!`);
httpServer.listen(HTTP_PORT);

const wsServer = new WebSocketServer({ port: 8080 });

wsServer.on('connection', ws => {
  const wsStream = createWebSocketStream(ws, { encoding: 'utf-8', decodeStrings: false });

  wsStream.write('Connection_ready!', (e) => {
    if (e) console.error(e);
  });

  wsStream.on('data', (chunk: Buffer) => {
    const data = chunk.toString();
    if ((data !== 'mouse_position') && (data !== 'prnt_scrn')) {
      wsStream.write(`${data}`, (e) => {
        if (e) console.error(e);
      });
    }
    controller(data, wsStream);
  });
});

process.on('SIGINT', () => {
  process.stdout.write('Closing webSocketServer\n');
  wsServer.close();
  process.exit();
});

