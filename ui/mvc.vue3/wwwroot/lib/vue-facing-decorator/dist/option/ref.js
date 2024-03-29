"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.build = exports.decorator = void 0;
const optionBuilder_1 = require("../optionBuilder");
const utils_1 = require("../utils");
exports.decorator = (0, utils_1.optoinNullableMemberDecorator)(function (proto, name, option) {
    const slot = (0, utils_1.obtainSlot)(proto);
    let map = slot.obtainMap('ref');
    map.set(name, true);
});
function build(cons, optionBuilder) {
    const slot = (0, utils_1.obtainSlot)(cons.prototype);
    const names = slot.obtainMap('ref');
    if (names) {
        (0, optionBuilder_1.applyAccessors)(optionBuilder, (ctx) => {
            const data = new Map;
            names.forEach((value, name) => {
                data.set(name, {
                    get: function () {
                        return ctx.$refs[name];
                    },
                    set: undefined
                });
            });
            return data;
        });
    }
}
exports.build = build;
//# sourceMappingURL=ref.js.map