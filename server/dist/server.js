"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.gameHandler = void 0;
var ws_1 = require("ws");
var GameHandler_1 = require("./classes/GameHandler");
var handlers_1 = require("./handlers");
var uuid_1 = require("uuid");
exports.gameHandler = new GameHandler_1.default();
var PORT = process.env.PORT || 8080;
var HOST = '0.0.0.0';
var wss = new ws_1.WebSocketServer({ port: PORT, host: HOST });
wss.on('connection', function (ws) {
    var uuid = (0, uuid_1.v4)();
    ws.uuid = uuid;
    ws.on('message', function (rawData) { return (0, handlers_1.onMessage)(ws, rawData); });
    ws.on('close', function (code, reason) { return (0, handlers_1.onClose)(ws, code, reason); });
});
wss.on('close', function () { return console.log('Connection closing...'); });
exports.default = wss;
//# sourceMappingURL=server.js.map