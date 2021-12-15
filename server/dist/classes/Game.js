"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Grid_1 = require("./Grid");
var Player_1 = require("./Player");
var Game = /** @class */ (function () {
    function Game(host, challenger) {
        if (challenger === void 0) { challenger = null; }
        this.host = new Player_1.default(host);
        this.challenger = challenger ? new Player_1.default(challenger) : null;
        this.index = 0;
        this.turn = 0;
        this.grid = new Grid_1.default();
    }
    Game.prototype.join = function (challenger, error) {
        if (this.challenger)
            return error('The game is full.');
        if (challenger.uuid == this.host.uuid)
            return error('You can not join a game you host.');
        this.challenger = new Player_1.default(challenger);
        challenger.ws.send(JSON.stringify({
            op: 'join',
            data: 'You just joined a game.'
        }));
    };
    Game.prototype.whoPlays = function () {
        return this.index == 0 ? this.host : this.challenger;
    };
    Game.prototype.whoWaits = function () {
        return this.index == 0 ? this.challenger : this.host;
    };
    Game.prototype.nextPlayer = function () {
        this.index = (this.index + 1) % 2;
        this.turn++;
    };
    Game.prototype.play = function (data) {
        var _this = this;
        var uuid = data.uuid, position = data.position;
        var player = this.getPlayer(uuid);
        if (player) {
            if (!this.challenger)
                return player.error('The game has not started yet!');
            var activePlayer = this.whoPlays();
            if ((activePlayer === null || activePlayer === void 0 ? void 0 : activePlayer.uuid) == uuid) {
                this.grid.updateCase(position, uuid)
                    .then(function () {
                    var _a;
                    _this.host.update(position);
                    (_a = _this.challenger) === null || _a === void 0 ? void 0 : _a.update(position);
                    !_this.isGameOver() && _this.nextPlayer();
                })
                    .catch(function () { return player.error('This case is not empty.'); });
                return;
            }
            return player.error('Your opponent has not played yet!');
        }
    };
    Game.prototype.isGameOver = function () {
        var _a, _b;
        if (this.turn < 4 || !this.grid.isGameOver())
            return false;
        (_a = this.whoPlays()) === null || _a === void 0 ? void 0 : _a.win(this.turn);
        (_b = this.whoWaits()) === null || _b === void 0 ? void 0 : _b.lose(this.turn);
        return true;
    };
    Game.prototype.getPlayer = function (uuid) {
        var _a;
        return uuid == this.host.uuid ? this.host : uuid == ((_a = this.challenger) === null || _a === void 0 ? void 0 : _a.uuid) ? this.challenger : null;
    };
    return Game;
}());
exports.default = Game;
//# sourceMappingURL=Game.js.map