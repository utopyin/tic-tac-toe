"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AI = void 0;
var AI = /** @class */ (function () {
    function AI(uuid) {
        this.uuid = uuid;
        this.name = "AlphaTicTacToe";
    }
    AI.prototype.getRandomCase = function (Board) {
        var caseu = Math.floor(Math.random() * 9);
        while (!Board[caseu].value) {
            caseu = Math.floor(Math.random() * 8);
        }
        return caseu;
    };
    AI.prototype.isBoardEmpty = function (Board) {
        Board.forEach(function (Case) {
            if (Case.value)
                return false;
        });
        return true;
    };
    AI.prototype.calculatePscore = function (combinaison) {
        return false;
    };
    return AI;
}());
exports.AI = AI;
//# sourceMappingURL=AI.js.map