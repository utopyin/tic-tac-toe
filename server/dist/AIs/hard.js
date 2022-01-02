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
var HardAI = /** @class */ (function (_super) {
    __extends(HardAI, _super);
    function HardAI(playeruuid) {
        var _this = _super.call(this, playeruuid) || this;
        _this.name = "Gori Kosporav";
        return _this;
    }
    HardAI.prototype.play = function (Board, turn) {
        var evaluation = this.minimax(Board, 9 - turn, true, -2, 2);
        console.log(evaluation);
        return evaluation.position;
    };
    HardAI.prototype.customMax = function (a, b) {
        return a.value > b.value ? a : b;
    };
    HardAI.prototype.customMin = function (a, b) {
        return a.value < b.value ? a : b;
    };
    HardAI.prototype.minimax = function (Board, depth, maximizingPlayer, alpha, beta, placement) {
        if (placement === void 0) { placement = null; }
        console.log("minimax : " + depth + maximizingPlayer + placement);
        var casesVides = Board.casesVides();
        if (depth <= 4 && placement) {
            if (Board.isGameOver()) {
                console.log("Somebody won, branch is over");
                return { 'position': placement, 'value': (+maximizingPlayer * -2) + 1 };
            }
            else if (depth == 0) {
                console.log("No more space, branch is over");
                return { 'position': placement, 'value': 0 };
            }
        }
        if (maximizingPlayer) {
            var maxEval = { 'position': 0, 'value': -2 };
            for (var _i = 0, casesVides_1 = casesVides; _i < casesVides_1.length; _i++) {
                var x = casesVides_1[_i];
                var board = Board.duplicate();
                board.updateCase(x, this.uuid);
                var evalu = this.minimax(board, depth - 1, false, alpha, beta, x);
                maxEval = this.customMax(evalu, maxEval);
                alpha = Math.max(alpha, evalu.value);
                if (beta <= alpha) {
                    console.log("pruning");
                    break;
                }
            }
            ;
            return maxEval;
        }
        else {
            var minEval = { 'position': 0, 'value': 10 };
            for (var _a = 0, casesVides_2 = casesVides; _a < casesVides_2.length; _a++) {
                var x = casesVides_2[_a];
                var board = Board.duplicate();
                board.updateCase(x, this.playeruuid);
                var evalu = this.minimax(board, depth - 1, true, alpha, beta, x);
                minEval = this.customMin(evalu, minEval);
                beta = Math.min(beta, evalu.value);
                if (beta <= alpha) {
                    console.log("pruning");
                    break;
                }
            }
            ;
            return minEval;
        }
    };
    return HardAI;
}(AI_1.default));
exports.default = HardAI;
//# sourceMappingURL=hard.js.map