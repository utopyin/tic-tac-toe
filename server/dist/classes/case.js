"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Case = /** @class */ (function () {
    function Case(pos, value) {
        if (value === void 0) { value = null; }
        this.position = pos;
        this.value = value;
    }
    Case.prototype.toString = function () {
        return this.value || " ";
    };
    return Case;
}());
exports.default = Case;
//# sourceMappingURL=case.js.map