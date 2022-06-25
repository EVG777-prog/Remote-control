// import Jimp from 'jimp';
// import robot from 'robotjs';
import { WebSocketServer } from 'ws';
import robot from 'robotjs';
import { httpServer } from './httpServer/httpServer';

const HTTP_PORT = 3000;

console.log(`Start static http server on the ${HTTP_PORT} port!`);
httpServer.listen(HTTP_PORT);

function moveCursorRight(distance: number) {
  // robot.setMouseDelay(20);
  const mouse = robot.getMousePos();
  console.log(`Mouse is at x:${  mouse.x  } y:${  mouse.y}`);
  robot.moveMouse(mouse.x + distance, mouse.y);
}


const wsServer = new WebSocketServer({ port: 8080 });

wsServer.on('connection', ws => {
  ws.send(`Connection_ready!`);

  ws.on('message', data => {
    console.log(String(data));
    const distance = +String(data).split(' ')[1];
    // ws.send(data);
    moveCursorRight(distance);
    ws.send(`Recieve:${data}`);
  });

  ws.on('close', () => {
    ws.send(`Connection_closed!`);
  })

  // ws.send('mouse_position 100 100');
});

wsServer.on('close', () => {
  console.log('Close WSS!');
});

