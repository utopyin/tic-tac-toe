"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Game_1 = require("./Game");
var server_1 = require("../server");
var uuid_1 = require("uuid");
var easy_1 = require("../AIs/easy");
var medium_1 = require("../AIs/medium");
var hard_1 = require("../AIs/hard");
var GameHandler = /** @class */ (function () {
    function GameHandler() {
        this.players = {};
        this.rooms = {};
    }
    GameHandler.prototype.chooseAI = function (num, playeruuid) {
        var list = [easy_1.default, medium_1.default, hard_1.default];
        return new list[num - 1](playeruuid);
    };
    GameHandler.prototype.create = function (host, options) {
        var _a, _b;
        if (options === void 0) { options = null; }
        if (this.players[host.uuid] != undefined) {
            (_a = host.ws) === null || _a === void 0 ? void 0 : _a.send(JSON.stringify({
                op: 'error',
                data: {
                    title: "You can't host a game",
                    message: 'You can not host a game as you are already playing or hosting one.'
                }
            }));
        }
        var roomUuid = uuid_1.v4();
        (_b = host.ws) === null || _b === void 0 ? void 0 : _b.send(JSON.stringify({
            op: 'host'
        }));
        if ((options === null || options === void 0 ? void 0 : options.ai) != undefined) {
            this.rooms[roomUuid] = new Game_1.GameIA(host, this.chooseAI(options.ai, host.uuid));
        }
        else {
            this.rooms[roomUuid] = new Game_1.default(host);
            this.sendRooms();
        }
        this.players[host.uuid] = roomUuid;
    };
    GameHandler.prototype.join = function (roomUUID, challenger) {
        var _this = this;
        var _a;
        var game = this.getGame(roomUUID);
        if (!game || game instanceof Game_1.GameIA) {
            return (_a = challenger.ws) === null || _a === void 0 ? void 0 : _a.send(JSON.stringify({
                op: 'error',
                data: {
                    title: "You can't join this game",
                    message: 'The game was not found.'
                }
            }));
        }
        game.join(challenger).then(function () {
            _this.players[challenger.uuid] = roomUUID;
        }).catch(function (message) {
            var _a;
            (_a = challenger.ws) === null || _a === void 0 ? void 0 : _a.send(JSON.stringify({
                op: 'error',
                data: {
                    title: "You can't join this room",
                    message: message
                }
            }));
        });
        this.sendRooms();
    };
    GameHandler.prototype.getRoom = function (uuid) {
        return this.players[uuid] != undefined ? this.players[uuid] : null;
    };
    GameHandler.prototype.getGame = function (roomUUID) {
        return this.rooms[roomUUID] != undefined ? this.rooms[roomUUID] : null;
    };
    GameHandler.prototype.getGameByPlayer = function (uuid) {
        var roomUUID = this.getRoom(uuid);
        return roomUUID ? this.getGame(roomUUID) : null;
    };
    GameHandler.prototype.leave = function (uuid) {
        var roomUUID = this.getRoom(uuid);
        if (roomUUID) {
            var game = this.getGame(roomUUID);
            if (game) {
                var needDestroy = game.leave(uuid);
                needDestroy ? delete this.rooms[roomUUID] : game.reset();
            }
        }
        delete this.players[uuid];
        this.sendRooms();
    };
    GameHandler.prototype.getRooms = function () {
        return Object.entries(this.rooms)
            .filter(function (x) { return !(x[1] instanceof Game_1.GameIA); })
            .map(function (_a) {
            var roomUUID = _a[0], game = _a[1];
            return {
                uuid: roomUUID,
                name: game.host.name,
                players: (game.host ? 1 : 0) + (game.challenger ? 1 : 0)
            };
        });
    };
    GameHandler.prototype.sendRooms = function () {
        var _this = this;
        server_1.default.clients.forEach(function (client) {
            client.send(JSON.stringify({
                op: 'rooms',
                data: {
                    rooms: _this.getRooms()
                }
            }));
        });
    };
    return GameHandler;
}());
exports.default = GameHandler;
//# sourceMappingURL=GameHandler.js.map