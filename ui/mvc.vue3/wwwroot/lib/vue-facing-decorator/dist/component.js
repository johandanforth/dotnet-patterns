"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Component = exports.ComponentBase = void 0;
const vue_1 = require("vue");
const utils_1 = require("./utils");
const computed_1 = require("./option/computed");
const data_1 = require("./option/data");
const methodsAndHooks_1 = require("./option/methodsAndHooks");
const ref_1 = require("./option/ref");
const watch_1 = require("./option/watch");
const props_1 = require("./option/props");
const inject_1 = require("./option/inject");
const emit_1 = require("./option/emit");
const vmodel_1 = require("./option/vmodel");
const accessor_1 = require("./option/accessor");
// export interface Cons { new(): any, prototype: any }
function ComponentOption(cons, extend) {
    const optionBuilder = {};
    (0, vmodel_1.build)(cons, optionBuilder);
    (0, computed_1.build)(cons, optionBuilder); //after VModel
    (0, watch_1.build)(cons, optionBuilder);
    (0, props_1.build)(cons, optionBuilder);
    (0, inject_1.build)(cons, optionBuilder);
    (0, emit_1.build)(cons, optionBuilder);
    (0, ref_1.build)(cons, optionBuilder); //after Computed
    (0, methodsAndHooks_1.build)(cons, optionBuilder); //after Ref Computed
    (0, accessor_1.build)(cons, optionBuilder);
    const raw = Object.assign(Object.assign({ data() {
            var _a;
            delete optionBuilder.data;
            (0, data_1.build)(cons, optionBuilder, this);
            return (_a = optionBuilder.data) !== null && _a !== void 0 ? _a : {};
        }, methods: optionBuilder.methods, computed: optionBuilder.computed, watch: optionBuilder.watch, props: optionBuilder.props, inject: optionBuilder.inject }, optionBuilder.hooks), { extends: extend });
    return raw;
}
function buildComponent(cons, arg, extend) {
    let option = ComponentOption(cons, extend);
    const slot = (0, utils_1.obtainSlot)(cons.prototype);
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
    return (0, vue_1.defineComponent)(option);
}
function build(cons, option) {
    const slot = (0, utils_1.obtainSlot)(cons.prototype);
    slot.inComponent = true;
    const superSlot = (0, utils_1.getSuperSlot)(cons.prototype);
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
function ComponentBase(arg) {
    return _Component(arg, function (cons, option) {
        build(cons, option);
        return cons;
    });
}
exports.ComponentBase = ComponentBase;
function Component(arg) {
    return _Component(arg, function (cons, option) {
        build(cons, option);
        // const slot = getSlot(cons.prototype)!
        // Object.defineProperty(cons, '__vccOpts', {
        //     value: slot.cachedVueComponent
        // })
        // console.log('kkkk', '__vccOpts' in cons, cons)
        // return cons
        return (0, utils_1.obtainSlot)(cons.prototype).cachedVueComponent;
    });
}
exports.Component = Component;
//# sourceMappingURL=component.js.map