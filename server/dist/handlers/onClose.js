"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.onClose = void 0;
var server_1 = require("../server");
function onClose(socket, code, reason) {
    server_1.gameHandler.leave(socket.uuid);
}
exports.onClose = onClose;
//# sourceMappingURL=onClose.js.map