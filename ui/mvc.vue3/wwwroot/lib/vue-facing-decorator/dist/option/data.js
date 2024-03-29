"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.build = void 0;
const utils_1 = require("../utils");
const utils_2 = require("../utils");
function build(cons, optionBuilder, vueInstance, propNames) {
    var _a;
    (_a = optionBuilder.data) !== null && _a !== void 0 ? _a : (optionBuilder.data = {});
    const sample = new cons(optionBuilder, vueInstance);
    let names = (0, utils_2.getValidNames)(sample, (des) => {
        return !!des.enumerable;
    });
    const slot = (0, utils_2.obtainSlot)(cons.prototype);
    names = (0, utils_2.excludeNames)(names, slot);
    Object.assign(optionBuilder.data, (0, utils_1.makeObject)(names, sample));
}
exports.build = build;
//# sourceMappingURL=data.js.map