"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.onMessage = void 0;
var server_1 = require("../server");
var uuid_1 = require("uuid");
function onMessage(payload) {
    var _a;
    try {
        var _b = JSON.parse(payload.toString()), op = _b.op, data = _b.data;
        switch (op) {
            case 'host':
                server_1.gameHandler.create({
                    uuid: data,
                    ws: this
                });
                break;
            case 'play':
                (_a = server_1.gameHandler.get(data.uuid)) === null || _a === void 0 ? void 0 : _a.play(data);
                break;
            case 'join':
                server_1.gameHandler.join(data.host, { uuid: data.uuid, ws: this });
                break;
            case 'hello':
                this.send(JSON.stringify({
                    op: 'hello',
                    data: (0, uuid_1.v4)()
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