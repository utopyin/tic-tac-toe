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
var Player_1 = require("../classes/Player");
var uuid_1 = require("uuid");
var AI = /** @class */ (function (_super) {
    __extends(AI, _super);
    function AI(playerUUID) {
        var _this = this;
        var uuid = uuid_1.v4();
        _this = _super.call(this, { uuid: uuid, name: "AlphaTicTacToe", ws: null }) || this;
        _this.uuid = uuid;
        _this.name = "AlphaTicTacToe";
        _this.playeruuid = playerUUID;
        return _this;
    }
    AI.prototype.getRandomCase = function (Board) {
        var caseu = Math.floor(Math.random() * 9);
        while (Board[caseu].value) {
            caseu = Math.floor(Math.random() * 8);
        }
        return caseu;
    };
    AI.prototype.isBoardEmpty = function (Board) {
        for (var k = 0; k < 9; k++) {
            if (Board[k].value != null) {
                return false;
            }
        }
        ;
        return true;
    };
    AI.prototype.calculatePscore = function (combinaison, Board) {
        var _this = this;
        var prority = 0;
        var placements = [];
        combinaison.forEach(function (x) {
            if (Board[x].value != null) {
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
        console.log(proposition);
        return (proposition.placements[0] == undefined || proposition.priority == "-1") ? null : proposition;
    };
    return AI;
}(Player_1.default));
exports.default = AI;
//# sourceMappingURL=AI.js.map