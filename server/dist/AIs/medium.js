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
var AI_1 = require("./AI");
var MediumAI = /** @class */ (function (_super) {
    __extends(MediumAI, _super);
    function MediumAI(playeruuid) {
        var _this = _super.call(this, playeruuid) || this;
        _this.name = "Mork Zeckurburg";
        return _this;
    }
    MediumAI.prototype.play = function (Board) {
        var _this = this;
        if (this.isBoardEmpty(Board.tableau))
            return this.getRandomCase(Board.tableau);
        var propositions = { "1": [], "-2": [], "2": [] };
        var combinaisons = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
        combinaisons.forEach(function (comb) {
            var prop = _this.calculatePscore(comb, Board.tableau);
            if (prop && propositions[prop.priority]) {
                propositions[prop.priority].push(prop.placements);
            }
        });
        var priorities = ["2", "-2", "1"];
        priorities.forEach(function (prio) {
            if (propositions[prio]) {
                return propositions[prio][Math.floor(Math.random() * (propositions[prio].length - 1))];
            }
        });
        return this.getRandomCase(Board.tableau);
    };
    return MediumAI;
}(AI_1.default));
exports.default = MediumAI;
//# sourceMappingURL=medium.js.map