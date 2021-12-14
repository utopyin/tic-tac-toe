"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Game_1 = require("./Game");
var GameHandler = /** @class */ (function () {
    function GameHandler() {
        this.games = [];
        this.players = {};
    }
    GameHandler.prototype.get = function (uuid) {
        return this.players[uuid] != undefined ? this.games[this.players[uuid]] : null;
    };
    GameHandler.prototype.create = function (host, challenger) {
        if (challenger === void 0) { challenger = null; }
        if (this.players[host.uuid] != undefined) {
            host.ws.send(JSON.stringify({
                op: 'error',
                data: 'You can not join a game as you are already playing or hosting one.'
            }));
        }
        var newGame = new Game_1.default(host, challenger);
        var length = this.games.push(newGame);
        this.players[host.uuid] = length - 1;
        if (challenger)
            this.players[challenger.uuid] = length - 1;
    };
    GameHandler.prototype.join = function (hostUUID, challenger) {
        var game = this.get(hostUUID);
        if (!game) {
            return challenger.ws.send(JSON.stringify({
                op: 'error',
                data: 'The game was not found.'
            }));
        }
        this.players[challenger.uuid] = this.players[hostUUID];
        game.join(challenger, function (errorMessage) {
            challenger.ws.send(JSON.stringify({
                op: 'error',
                data: errorMessage
            }));
        });
    };
    return GameHandler;
}());
exports.default = GameHandler;
//# sourceMappingURL=GameHandler.js.map