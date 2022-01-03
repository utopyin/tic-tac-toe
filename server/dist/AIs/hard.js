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
        var _this = this;
        var casesVides = Board.casesVides();
        var bestScore = { position: null, value: Number.NEGATIVE_INFINITY };
        casesVides.forEach(function (x) {
            var board = Board.duplicate();
            board.updateCase(x, _this.uuid);
            var evaluation = _this.minimax(board, 9 - turn - 1, false, Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY);
            if (evaluation > bestScore.value) {
                bestScore = { position: x, value: evaluation };
            }
        });
        return bestScore.position;
    };
    // customMax(a:minimax,b:minimax) {
    //     return a.value>b.value ? a : b 
    // }
    // customMin(a:minimax,b:minimax) {
    //     return a.value<b.value ? a : b 
    // }
    HardAI.prototype.minimax = function (Board, depth, maximizingPlayer, alpha, beta, placement) {
        if (placement === void 0) { placement = null; }
        var casesVides = Board.casesVides();
        if (depth <= 4 && placement) {
            if (Board.isGameOver()) {
                return (+maximizingPlayer * -2) + 1;
            }
            else if (depth == 0) {
                return 0;
            }
        }
        if (maximizingPlayer) {
            var maxEval = Number.NEGATIVE_INFINITY;
            for (var _i = 0, casesVides_1 = casesVides; _i < casesVides_1.length; _i++) {
                var x = casesVides_1[_i];
                var board = Board.duplicate();
                board.updateCase(x, this.uuid);
                var evalu = this.minimax(board, depth - 1, false, alpha, beta, x);
                maxEval = Math.max(evalu, maxEval);
                // alpha = Math.max(alpha, evalu.value)
                // if (beta <= alpha) {
                //     break;
                // }
            }
            ;
            return maxEval;
        }
        else {
            var minEval = Number.POSITIVE_INFINITY;
            for (var _a = 0, casesVides_2 = casesVides; _a < casesVides_2.length; _a++) {
                var x = casesVides_2[_a];
                var board = Board.duplicate();
                board.updateCase(x, this.playeruuid);
                var evalu = this.minimax(board, depth - 1, true, alpha, beta, x);
                minEval = Math.min(evalu, minEval);
                // beta = Math.min(beta, evalu.value)
                // if (beta <= alpha) {
                //     break;
                // }
            }
            ;
            return minEval;
        }
    };
    return HardAI;
}(AI_1.default));
exports.default = HardAI;
//# sourceMappingURL=hard.js.map