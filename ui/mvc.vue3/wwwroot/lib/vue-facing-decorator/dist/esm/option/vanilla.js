import { obtainSlot, optoinNullableMemberDecorator } from '../utils';
export const decorator = optoinNullableMemberDecorator(function (proto, name, option) {
    const slot = obtainSlot(proto);
    let map = slot.obtainMap('vanilla');
    map.set(name, true);
});
//# sourceMappingURL=vanilla.js.map