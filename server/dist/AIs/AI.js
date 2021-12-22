"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AI = /** @class */ (function () {
    function AI() {
        this.uuid = "SomeAI";
        this.name = "AlphaTicTacToe";
    }
    AI.prototype.play = function (Board) {
        return 0;
    };
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
    AI.prototype.calculatePscore = function (combinaison, Board) {
        var _this = this;
        var prority = 0;
        var placements = [];
        combinaison.forEach(function (x) {
            if (Board[x].value) {
                if (Board[x].value == _this.uuid) {
                    prority++;
                }
                else {
                    prority--;
                }
            }
            else {
                placements.push(x);
            }
        });
        var proposition = {
            'priority': prority.toString(),
            'placements': placements
        };
        return proposition.placements[0] == undefined && proposition.priority == "-1" ? null : proposition;
    };
    return AI;
}());
exports.default = AI;
//# sourceMappingURL=AI.js.map