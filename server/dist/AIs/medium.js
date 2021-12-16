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
exports.MediumAI = void 0;
var AI_1 = require("./AI");
var MediumAI = /** @class */ (function (_super) {
    __extends(MediumAI, _super);
    function MediumAI(uuid) {
        var _this = _super.call(this, uuid) || this;
        _this.uuid = uuid;
        return _this;
    }
    MediumAI.prototype.play = function (Board) {
        return this.getRandomCase(Board.tableau);
    };
    return MediumAI;
}(AI_1.AI));
exports.MediumAI = MediumAI;
//# sourceMappingURL=medium.js.map