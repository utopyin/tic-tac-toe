"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Case_1 = require("./Case");
var Grid = /** @class */ (function () {
    function Grid(tableau) {
        if (tableau === void 0) { tableau = null; }
        if (!tableau) {
            this.tableau = [];
            for (var k = 0; k < 9; k++) {
                this.tableau.push(new Case_1.default(k));
            }
        }
        else {
            this.tableau = tableau;
        }
    }
    Grid.prototype.isCaseEmpty = function (pos) {
        return this.tableau[pos].value == null;
    };
    Grid.prototype.duplicate = function () {
        var tableau = [];
        this.tableau.forEach(function (caseActu) {
            tableau.push(new Case_1.default(caseActu.position, caseActu.value));
        });
        return new Grid(tableau);
    };
    Grid.prototype.casesVides = function () {
        var vides = [];
        for (var k = 0; k < 9; k++) {
            if (this.tableau[k].value == undefined)
                vides.push(k);
        }
        return vides;
    };
    Grid.prototype.updateCase = function (pos, uuid) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (_this.isCaseEmpty(pos)) {
                _this.tableau[pos].value = uuid;
                resolve();
            }
            reject();
        });
    };
    Grid.prototype.isGameOver = function () {
        //brute force à améliorer si possible pour le rendre plus sexy
        var combinaisons = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
        for (var k = 0; k < combinaisons.length; k++) {
            if (this.tableau[combinaisons[k][2]].value &&
                this.tableau[combinaisons[k][2]].value == this.tableau[combinaisons[k][1]].value &&
                this.tableau[combinaisons[k][1]].value == this.tableau[combinaisons[k][0]].value) {
                return true;
            }
        }
        return false;
    };
    Grid.prototype.toString = function () {
        var str = "";
        for (var k = 0; k++; k < 3) {
            for (var i = 0; i++; i < 3) {
                str += '|' + this.tableau[(k * 3) + i].toString();
            }
            str += '|\n';
        }
        return str.trim();
        //return `|${this.tableau[0]}|${this.tableau[1]}|${this.tableau[2]}|` + "\n" + `|${this.tableau[3]}|${this.tableau[4]}|${this.tableau[5]}|` + `\n` + `|${this.tableau[6]}|${this.tableau[7]}|${this.tableau[8]}|`
    };
    return Grid;
}());
exports.default = Grid;
//# sourceMappingURL=Grid.js.map