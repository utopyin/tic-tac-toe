"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.onMessage = void 0;
var server_1 = require("../server");
function onMessage(socket, payload) {
    var _a;
    try {
        var _b = JSON.parse(payload.toString()), op = _b.op, data = _b.data;
        switch (op) {
            case 'host':
                server_1.gameHandler.create({
                    uuid: data.uuid,
                    name: data.name,
                    ws: socket,
                });
                break;
            case 'play':
                (_a = server_1.gameHandler.getGameByPlayer(data.uuid)) === null || _a === void 0 ? void 0 : _a.play(data);
                break;
            case 'join':
                server_1.gameHandler.join(data.room, {
                    uuid: data.uuid,
                    ws: socket,
                    name: data.name
                });
                break;
            case 'hello':
                socket.send(JSON.stringify({
                    op: 'hello',
                    data: {
                        uuid: socket.uuid
                    }
                }));
                break;
            case 'leave':
                server_1.gameHandler.leave(data.uuid);
                break;
            case 'rooms':
                socket.send(JSON.stringify({
                    op: 'rooms',
                    data: {
                        rooms: server_1.gameHandler.getRooms()
                    }
                }));
                break;
        }
    }
    catch (e) {
        console.log(e);
    }
}
exports.onMessage = onMessage;
//# sourceMappingURL=onMessage.js.map