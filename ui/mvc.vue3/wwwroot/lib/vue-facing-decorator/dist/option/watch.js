"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.build = exports.decorator = void 0;
const utils_1 = require("../utils");
function decorator(key, option) {
    return function (proto, name) {
        const slot = (0, utils_1.obtainSlot)(proto);
        let map = slot.obtainMap('watch');
        const opt = Object.assign({}, option !== null && option !== void 0 ? option : {}, {
            key: key,
            handler: proto[name]
        });
        if (map.has(name)) {
            const t = map.get(name);
            if (Array.isArray(t)) {
                t.push(opt);
            }
            else {
                map.set(name, [t, opt]);
            }
        }
        else {
            map.set(name, opt);
        }
    };
}
exports.decorator = decorator;
function build(cons, optionBuilder) {
    var _a;
    (_a = optionBuilder.watch) !== null && _a !== void 0 ? _a : (optionBuilder.watch = {});
    const slot = (0, utils_1.obtainSlot)(cons.prototype);
    const names = slot.obtainMap('watch');
    if (names) {
        names.forEach((value, name) => {
            const values = Array.isArray(value) ? value : [value];
            values.forEach(v => {
                if (!optionBuilder.watch[v.key]) {
                    optionBuilder.watch[v.key] = v;
                }
                else {
                    const t = optionBuilder.watch[v.key];
                    if (Array.isArray(t)) {
                        t.push(v);
                    }
                    else {
                        optionBuilder.watch[v.key] = [t, v];
                    }
                }
            });
        });
    }
}
exports.build = build;
//# sourceMappingURL=watch.js.map