"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EasyIa = void 0;
var server_1 = require("../server");
function getRandomCase(Board) {
    var caseu = Math.floor(Math.random() * 9);
    while (!Board[caseu]) {
        caseu = Math.floor(Math.random() * 8);
    }
    return caseu;
}
var EasyIa = /** @class */ (function () {
    function EasyIa(roomUUID, uuid) {
        this.roomUUID = roomUUID;
        this.gameHandler = server_1.gameHandler;
        this.uuid = uuid;
    }
    EasyIa.prototype.play = function (Board) {
        var _a;
        var data = {
            'uuid': this.uuid,
            'position': getRandomCase(Board.tableau)
        };
        (_a = this.gameHandler.getGame(this.roomUUID)) === null || _a === void 0 ? void 0 : _a.play(data);
    };
    return EasyIa;
}());
exports.EasyIa = EasyIa;
//# sourceMappingURL=easy%20copy.js.map