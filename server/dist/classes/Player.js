"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Player = /** @class */ (function () {
    function Player(_a) {
        var uuid = _a.uuid, ws = _a.ws;
        this.uuid = uuid;
        this.ws = ws;
        // const symbols: Symbol[] = ["O", "\u262b"];
    }
    Player.prototype.update = function (position) {
        this.ws.send(JSON.stringify({
            op: 'update',
            data: position
        }));
    };
    Player.prototype.error = function (errorMessage) {
        this.ws.send(JSON.stringify({
            op: 'error',
            data: errorMessage
        }));
    };
    Player.prototype.win = function (turn) {
        this.ws.send(JSON.stringify({
            op: 'win',
            data: turn
        }));
    };
    Player.prototype.lose = function (turn) {
        this.ws.send(JSON.stringify({
            op: 'lose',
            data: turn
        }));
    };
    return Player;
}());
exports.default = Player;
//# sourceMappingURL=Player.js.map