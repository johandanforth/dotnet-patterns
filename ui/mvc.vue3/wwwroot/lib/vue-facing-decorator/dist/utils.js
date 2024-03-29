"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.optoinNullableMemberDecorator = exports.getValidNames = exports.excludeNames = exports.getSuperSlot = exports.toComponentReverse = exports.makeObject = exports.obtainSlot = exports.getSlot = exports.makeSlot = void 0;
const index_1 = require("./index");
const SlotSymbol = Symbol('vue-facing-decorator-slot');
class Slot {
    constructor(master) {
        this.names = new Map;
        this.inComponent = false;
        this.cachedVueComponent = null;
        this.master = master;
    }
    obtainMap(name) {
        let map = this.names.get(name);
        if (!map) {
            map = new Map;
            this.names.set(name, map);
        }
        else {
        }
        return map;
    }
}
function makeSlot(obj) {
    if (getSlot(obj)) {
        throw '';
    }
    const slot = new Slot(obj);
    Object.defineProperty(obj, SlotSymbol, {
        enumerable: false,
        value: slot
    });
    return slot;
}
exports.makeSlot = makeSlot;
function getSlot(obj) {
    var _a;
    return (_a = Object.getOwnPropertyDescriptor(obj, SlotSymbol)) === null || _a === void 0 ? void 0 : _a.value;
}
exports.getSlot = getSlot;
function obtainSlot(obj) {
    const slot = getSlot(obj);
    if (slot) {
        return slot;
    }
    return makeSlot(obj);
}
exports.obtainSlot = obtainSlot;
function makeObject(names, obj) {
    return names.reduce((pv, cv) => {
        pv[cv] = obj[cv];
        return pv;
    }, {});
}
exports.makeObject = makeObject;
// export function toBaseReverse(obj: any) {
//     const arr: any[] = []
//     let curr = obj
//     while (curr.constructor !== Base) {
//         arr.unshift(curr)
//         curr = Object.getPrototypeOf(curr)
//     }
//     return arr
// }
function toComponentReverse(obj) {
    const arr = [];
    let curr = obj;
    do {
        arr.unshift(curr);
        curr = Object.getPrototypeOf(curr);
    } while (curr.constructor !== index_1.Base && !getSlot(curr));
    return arr;
}
exports.toComponentReverse = toComponentReverse;
function getSuperSlot(obj) {
    let curr = Object.getPrototypeOf(obj);
    while (curr.constructor !== index_1.Base) {
        const slot = getSlot(curr);
        if (slot) {
            return slot;
        }
        curr = Object.getPrototypeOf(curr);
    }
    return null;
}
exports.getSuperSlot = getSuperSlot;
// export function extendSlotPath(obj: any): {
//     constructor: any
// }[] {
//     const arr: any[] = []
//     let curr = obj
//     while (curr.constructor !== Base) {
//         if (getSlot(curr)) {
//             arr.push(curr)
//         }
//         curr = Object.getPrototypeOf(curr)
//     }
//     return arr
// }
function excludeNames(names, slot) {
    return names.filter(name => {
        for (const mapName of slot.names.keys()) {
            if (['watch', 'hooks'].includes(mapName)) {
                continue;
            }
            const map = slot.names.get(mapName);
            if (map.has(name)) {
                return false;
            }
        }
        return true;
    });
}
exports.excludeNames = excludeNames;
function getValidNames(obj, filter) {
    const descriptors = Object.getOwnPropertyDescriptors(obj);
    return Object.keys(descriptors).filter(name => filter(descriptors[name], name));
}
exports.getValidNames = getValidNames;
function optoinNullableMemberDecorator(handler) {
    function decorator(optionOrProto, name) {
        if (name) {
            handler(optionOrProto, name);
        }
        else {
            return function (proto, name) {
                handler(proto, name, optionOrProto);
            };
        }
    }
    return decorator;
}
exports.optoinNullableMemberDecorator = optoinNullableMemberDecorator;
//# sourceMappingURL=utils.js.map