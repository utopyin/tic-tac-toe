"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.gameHandler = void 0;
var ws_1 = require("ws");
var GameHandler_1 = require("./classes/GameHandler");
var handlers_1 = require("./handlers");
exports.gameHandler = new GameHandler_1.default();
new ws_1.WebSocketServer({ port: 8080 })
    .on('connection', function (ws) {
    console.log('connected!');
    ws.on('message', handlers_1.onMessage);
    ws.onclose = handlers_1.onClose;
})
    .on('close', function () { return console.log('Connection closing...'); });
//# sourceMappingURL=server.js.map