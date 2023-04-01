import { defineComponent } from 'vue';
import { obtainSlot, getSuperSlot } from './utils';
import { build as optionComputed } from './option/computed';
import { build as optionData } from './option/data';
import { build as optionMethodsAndHooks } from './option/methodsAndHooks';
import { build as optionRef } from './option/ref';
import { build as optionWatch } from './option/watch';
import { build as optionProps } from './option/props';
import { build as optionInject } from './option/inject';
import { build as optionEmit } from './option/emit';
import { build as optionVModel } from './option/vmodel';
import { build as optionAccessor } from './option/accessor';
// export interface Cons { new(): any, prototype: any }
function ComponentOption(cons, extend) {
    const optionBuilder = {};
    optionVModel(cons, optionBuilder);
    optionComputed(cons, optionBuilder); //after VModel
    optionWatch(cons, optionBuilder);
    optionProps(cons, optionBuilder);
    optionInject(cons, optionBuilder);
    optionEmit(cons, optionBuilder);
    optionRef(cons, optionBuilder); //after Computed
    optionMethodsAndHooks(cons, optionBuilder); //after Ref Computed
    optionAccessor(cons, optionBuilder);
    const raw = Object.assign(Object.assign({ data() {
            var _a;
            delete optionBuilder.data;
            optionData(cons, optionBuilder, this);
            return (_a = optionBuilder.data) !== null && _a !== void 0 ? _a : {};
        }, methods: optionBuilder.methods, computed: optionBuilder.computed, watch: optionBuilder.watch, props: optionBuilder.props, inject: optionBuilder.inject }, optionBuilder.hooks), { extends: extend });
    return raw;
}
function buildComponent(cons, arg, extend) {
    let option = ComponentOption(cons, extend);
    const slot = obtainSlot(cons.prototype);
    Object.keys(arg).reduce((option, name) => {
        if (['options', 'modifier', 'emits'].includes(name)) {
            return option;
        }
        option[name] = arg[name];
        return option;
    }, option);
    let emits = Array.from(slot.obtainMap('emits').keys());
    if (Array.isArray(arg.emits)) {
        emits = Array.from(new Set([...emits, ...arg.emits]));
    }
    option.emits = emits;
    if (arg.options) {
        Object.assign(option, arg.options);
    }
    if (arg.modifier) {
        arg.modifier(option);
    }
    return defineComponent(option);
}
function build(cons, option) {
    const slot = obtainSlot(cons.prototype);
    slot.inComponent = true;
    const superSlot = getSuperSlot(cons.prototype);
    if (superSlot) {
        if (!superSlot.inComponent) {
            throw 'Class should be decorated by Component or ComponentBase: ' + slot.master;
        }
        if (superSlot.cachedVueComponent === null) {
            throw 'Component decorator 1';
        }
    }
    const component = buildComponent(cons, option, superSlot === null ? undefined : superSlot.cachedVueComponent);
    component.__vfdConstructor = cons;
    slot.cachedVueComponent = component;
}
function _Component(arg, cb) {
    if (typeof arg === 'function') {
        return cb(arg, {});
    }
    return function (cons) {
        return cb(cons, arg);
    };
}
export function ComponentBase(arg) {
    return _Component(arg, function (cons, option) {
        build(cons, option);
        return cons;
    });
}
export function Component(arg) {
    return _Component(arg, function (cons, option) {
        build(cons, option);
        // const slot = getSlot(cons.prototype)!
        // Object.defineProperty(cons, '__vccOpts', {
        //     value: slot.cachedVueComponent
        // })
        // console.log('kkkk', '__vccOpts' in cons, cons)
        // return cons
        return obtainSlot(cons.prototype).cachedVueComponent;
    });
}
//# sourceMappingURL=component.js.map