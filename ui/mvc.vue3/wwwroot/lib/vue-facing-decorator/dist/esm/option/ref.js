import { applyAccessors } from '../optionBuilder';
import { obtainSlot, optoinNullableMemberDecorator } from '../utils';
export const decorator = optoinNullableMemberDecorator(function (proto, name, option) {
    const slot = obtainSlot(proto);
    let map = slot.obtainMap('ref');
    map.set(name, true);
});
export function build(cons, optionBuilder) {
    const slot = obtainSlot(cons.prototype);
    const names = slot.obtainMap('ref');
    if (names) {
        applyAccessors(optionBuilder, (ctx) => {
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
//# sourceMappingURL=ref.js.map