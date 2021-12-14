"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ws_1 = require("ws");
var wss = new ws_1.WebSocketServer({ port: 8080 });
wss.on('connection', function connection(ws) {
    ws.on('message', function message(data) {
        console.log("received: ".concat(data));
    });
    ws.send('something');
});
//# sourceMappingURL=server.js.map