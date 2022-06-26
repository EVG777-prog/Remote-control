"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import Jimp from 'jimp';
// import robot from 'robotjs';
const ws_1 = require("ws");
const httpServer_1 = require("./httpServer/httpServer");
const controller_1 = require("./controller");
const HTTP_PORT = 3000;
console.log(`Start static http server on the ${HTTP_PORT} port!`);
httpServer_1.httpServer.listen(HTTP_PORT);
const wsServer = new ws_1.WebSocketServer({ port: 8080 });
wsServer.on('connection', ws => {
    const wsStream = (0, ws_1.createWebSocketStream)(ws, { encoding: 'utf-8', decodeStrings: false });
    wsStream.write('Connection_ready!', (e) => {
        if (e)
            console.error(e);
    });
    wsStream.on('data', (chunk) => {
        const data = chunk.toString();
        (0, controller_1.controller)(data, wsStream);
    });
    ws.on('close', () => {
        ws.send(`Connection_closed!`);
    });
});
process.on('SIGINT', () => {
    process.stdout.write('Closing webSocketServer\n');
    wsServer.close();
    process.exit();
});
