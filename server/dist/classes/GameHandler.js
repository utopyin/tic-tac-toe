"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Game_1 = require("./Game");
var server_1 = require("../server");
var GameHandler = /** @class */ (function () {
    function GameHandler() {
        this.players = {};
        this.rooms = {};
    }
    GameHandler.prototype.create = function (host) {
        if (this.players[host.uuid] != undefined) {
            host.ws.send(JSON.stringify({
                op: 'error',
                data: 'You can not join a game as you are already playing or hosting one.'
            }));
        }
        var roomUuid = 'default'; //uuidV4()
        this.rooms[roomUuid] = new Game_1.default(host);
        this.players[host.uuid] = roomUuid;
        host.ws.send(JSON.stringify({
            op: 'host'
        }));
        this.sendRooms();
    };
    GameHandler.prototype.join = function (roomUUID, challenger) {
        var _this = this;
        var game = this.getGame(roomUUID);
        if (!game) {
            return challenger.ws.send(JSON.stringify({
                op: 'error',
                data: 'The game was not found.'
            }));
        }
        game.join(challenger).then(function () {
            _this.players[challenger.uuid] = roomUUID;
        }).catch(function (message) {
            challenger.ws.send(JSON.stringify({
                op: 'error',
                data: message
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
                if (needDestroy) {
                    delete this.rooms[roomUUID];
                }
                delete this.players[uuid];
            }
        }
        this.sendRooms();
    };
    GameHandler.prototype.getRooms = function () {
        return Object.entries(this.rooms).map(function (_a) {
            var roomUUID = _a[0], game = _a[1];
            return {
                uuid: roomUUID,
                name: game.host.name,
                players: 1 + (game.challenger !== null ? 1 : 0)
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