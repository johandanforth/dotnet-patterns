export { Component, ComponentBase } from './component';
export { decorator as Ref } from './option/ref';
export { decorator as Watch } from './option/watch';
export { decorator as Prop } from './option/props';
export { decorator as Inject } from './option/inject';
export { decorator as Emit } from './option/emit';
export { decorator as VModel, decorator as Model } from './option/vmodel';
export { decorator as Vanilla } from './option/vanilla';
export { decorator as Hook } from './option/methodsAndHooks';
const IdentifySymbol = Symbol('vue-facing-decorator-identify');
export function TSX() {
    return function (cons) {
        return cons;
    };
}
export const Base = class {
    constructor(optionBuilder, vueInstance) {
        const props = optionBuilder.props;
        if (props) {
            Object.keys(props).forEach(key => {
                this[key] = vueInstance[key];
            });
        }
    }
};
export const Vue = Base;
//# sourceMappingURL=index.js.map