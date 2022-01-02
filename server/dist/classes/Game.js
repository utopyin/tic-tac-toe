"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameIA = void 0;
var Grid_1 = require("./Grid");
var Player_1 = require("./Player");
var Game = /** @class */ (function () {
    function Game(host, challenger) {
        if (challenger === void 0) { challenger = null; }
        this.host = new Player_1.default(host);
        this.challenger = challenger ? new Player_1.default(challenger) : null;
        this.index = 0;
        this.turn = 0;
        this.resets = 0;
        this.grid = new Grid_1.default();
        this.isOver = false;
        this.isRematch = false;
        this.rematcher = '';
    }
    Game.prototype.join = function (challenger) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (_this.challenger)
                return reject('The game is full.');
            if (challenger.uuid == _this.host.uuid)
                return reject('You can not join a game you host.');
            _this.challenger = new Player_1.default(challenger);
            _this.isOver = false;
            _this.host.ws.send(JSON.stringify({
                op: 'join',
                data: {
                    opponent: {
                        name: challenger.name
                    }
                }
            }));
            challenger.ws.send(JSON.stringify({
                op: 'join',
                data: {
                    opponent: {
                        name: _this.host.name
                    }
                }
            }));
            resolve();
        });
    };
    Game.prototype.whoPlays = function () {
        return (this.index + this.resets) % 2 == 0 ? this.host : this.challenger;
    };
    Game.prototype.whoWaits = function () {
        return (this.index + this.resets) % 2 == 0 ? this.challenger : this.host;
    };
    Game.prototype.nextPlayer = function () {
        this.index = (this.index + 1) % 2;
        this.turn++;
        return true;
    };
    Game.prototype.play = function (data) {
        var _this = this;
        var uuid = data.uuid, position = data.position;
        var player = this.getPlayer(uuid);
        var type = this.host.uuid == (player === null || player === void 0 ? void 0 : player.uuid) ? 'host' : 'challenger';
        if (player) {
            if (this.isOver)
                return player.error("You can't play, the game is over !");
            if (!this.challenger)
                return player.error('The game has not started yet!');
            var activePlayer = this.whoPlays();
            if ((activePlayer === null || activePlayer === void 0 ? void 0 : activePlayer.uuid) == uuid) {
                this.grid.updateCase(position, uuid)
                    .then(function () {
                    var _a;
                    _this.host.update(position, type);
                    (_a = _this.challenger) === null || _a === void 0 ? void 0 : _a.update(position, type);
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
        this.isOver = true;
        (_a = this.whoPlays()) === null || _a === void 0 ? void 0 : _a.win(this.turn);
        (_b = this.whoWaits()) === null || _b === void 0 ? void 0 : _b.lose(this.turn);
        return true;
    };
    Game.prototype.getPlayer = function (uuid) {
        var _a;
        return uuid == this.host.uuid ? this.host : uuid == ((_a = this.challenger) === null || _a === void 0 ? void 0 : _a.uuid) ? this.challenger : null;
    };
    Game.prototype.leave = function (uuid) {
        if (!this.challenger) {
            this.host.leave(uuid);
            return true;
        }
        if (uuid == this.host.uuid) { // if player == host
            this.host.leave(uuid);
            this.challenger.leave(uuid);
            if (!this.isOver) {
                this.challenger.win(this.turn, true); // challenger wins by forfeit
                this.isOver = true; // game's over
            }
            this.host = this.challenger; // host becomes challenger
            this.challenger = null;
        }
        else if (uuid == this.challenger.uuid) {
            this.host.leave(uuid);
            this.challenger.leave(uuid);
            if (!this.isOver) {
                this.host.win(this.turn, true); // host wins by forfeit
                this.isOver = true; // game's over
            }
            this.challenger = null; // challenger left
        }
        return false; // the game isn't destroyed
    };
    Game.prototype.reset = function (isRematch) {
        var _a;
        this.index = 0;
        this.turn = 0;
        this.grid = new Grid_1.default();
        this.isOver = false;
        this.isRematch = false;
        this.rematcher = '';
        this.resets += 1;
        if (isRematch) {
            this.host.rematch();
            (_a = this.challenger) === null || _a === void 0 ? void 0 : _a.rematch();
        }
    };
    Game.prototype.rematch = function (uuid) {
        if (this.isRematch && this.rematcher != uuid)
            return this.reset(true);
        this.rematcher = uuid;
        this.isRematch = true;
    };
    return Game;
}());
exports.default = Game;
var GameIA = /** @class */ (function (_super) {
    __extends(GameIA, _super);
    function GameIA(host, Ia) {
        var _this = _super.call(this, host) || this;
        _this.IA = Ia;
        return _this;
    }
    GameIA.prototype.playIA = function () {
        var _this = this;
        var posIA = this.IA.play(this.grid, this.turn);
        console.log("Case choisie par l'IA : " + posIA);
        this.grid.updateCase(posIA, this.IA.uuid)
            .then(function () {
            _this.host.update(posIA, 'challenger');
            !_this.isGameOver() && _this.nextPlayer();
        })
            .catch(function (e) { return console.log("ErrorIA : " + e); });
    };
    GameIA.prototype.play = function (data) {
        var _this = this;
        var uuid = data.uuid, position = data.position;
        var player = this.getPlayer(uuid);
        var type = this.host.uuid == (player === null || player === void 0 ? void 0 : player.uuid) ? 'host' : 'challenger';
        if (player) {
            if (this.isOver)
                return player.error("You can't play, the game is over !");
            var activePlayer = this.whoPlays();
            if ((activePlayer === null || activePlayer === void 0 ? void 0 : activePlayer.uuid) == uuid) {
                this.grid.updateCase(position, uuid)
                    .then(function () {
                    _this.host.update(position, type);
                    !_this.isGameOver() && _this.nextPlayer() && _this.playIA();
                })
                    .catch(function () { return player.error('This case is not empty.'); });
                return;
            }
            return player.error('Your opponent has not played yet!');
        }
    };
    return GameIA;
}(Game));
exports.GameIA = GameIA;
//# sourceMappingURL=Game.js.map