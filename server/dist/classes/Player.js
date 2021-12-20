"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Player = /** @class */ (function () {
    function Player(_a) {
        var uuid = _a.uuid, ws = _a.ws, name = _a.name;
        this.uuid = uuid;
        this.ws = ws;
        this.name = name || 'Player';
        // const symbols: Symbol[] = ["O", "\u262b"];
    }
    Player.prototype.update = function (position, state) {
        this.ws.send(JSON.stringify({
            op: 'update',
            data: {
                position: position,
                state: state
            }
        }));
    };
    Player.prototype.error = function (message, title) {
        this.ws.send(JSON.stringify({
            op: 'error',
            data: {
                title: title,
                message: message
            }
        }));
    };
    Player.prototype.win = function (turn, forfeit) {
        if (forfeit === void 0) { forfeit = false; }
        this.ws.send(JSON.stringify({
            op: 'win',
            data: {
                turn: turn,
                forfeit: forfeit
            }
        }));
    };
    Player.prototype.lose = function (turn, forfeit) {
        if (forfeit === void 0) { forfeit = false; }
        this.ws.send(JSON.stringify({
            op: 'lose',
            data: {
                turn: turn,
                forfeit: forfeit
            }
        }));
    };
    Player.prototype.leave = function (uuid) {
        this.ws.send(JSON.stringify({
            op: 'leave',
            data: {
                who: uuid == this.uuid ? 'you' : 'them'
            }
        }));
    };
    Player.prototype.reset = function () {
        this.ws.send(JSON.stringify({
            op: 'rematch'
        }));
    };
    return Player;
}());
exports.default = Player;
//# sourceMappingURL=Player.js.map