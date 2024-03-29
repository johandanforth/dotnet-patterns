import { Base } from './index';
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
export function makeSlot(obj) {
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
export function getSlot(obj) {
    var _a;
    return (_a = Object.getOwnPropertyDescriptor(obj, SlotSymbol)) === null || _a === void 0 ? void 0 : _a.value;
}
export function obtainSlot(obj) {
    const slot = getSlot(obj);
    if (slot) {
        return slot;
    }
    return makeSlot(obj);
}
export function makeObject(names, obj) {
    return names.reduce((pv, cv) => {
        pv[cv] = obj[cv];
        return pv;
    }, {});
}
// export function toBaseReverse(obj: any) {
//     const arr: any[] = []
//     let curr = obj
//     while (curr.constructor !== Base) {
//         arr.unshift(curr)
//         curr = Object.getPrototypeOf(curr)
//     }
//     return arr
// }
export function toComponentReverse(obj) {
    const arr = [];
    let curr = obj;
    do {
        arr.unshift(curr);
        curr = Object.getPrototypeOf(curr);
    } while (curr.constructor !== Base && !getSlot(curr));
    return arr;
}
export function getSuperSlot(obj) {
    let curr = Object.getPrototypeOf(obj);
    while (curr.constructor !== Base) {
        const slot = getSlot(curr);
        if (slot) {
            return slot;
        }
        curr = Object.getPrototypeOf(curr);
    }
    return null;
}
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
export function excludeNames(names, slot) {
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
export function getValidNames(obj, filter) {
    const descriptors = Object.getOwnPropertyDescriptors(obj);
    return Object.keys(descriptors).filter(name => filter(descriptors[name], name));
}
export function optoinNullableMemberDecorator(handler) {
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
//# sourceMappingURL=utils.js.map