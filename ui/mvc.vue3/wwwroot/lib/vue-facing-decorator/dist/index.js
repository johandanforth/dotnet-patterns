"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Vue = exports.Base = exports.TSX = exports.Hook = exports.Vanilla = exports.Model = exports.VModel = exports.Emit = exports.Inject = exports.Prop = exports.Watch = exports.Ref = exports.ComponentBase = exports.Component = void 0;
var component_1 = require("./component");
Object.defineProperty(exports, "Component", { enumerable: true, get: function () { return component_1.Component; } });
Object.defineProperty(exports, "ComponentBase", { enumerable: true, get: function () { return component_1.ComponentBase; } });
var ref_1 = require("./option/ref");
Object.defineProperty(exports, "Ref", { enumerable: true, get: function () { return ref_1.decorator; } });
var watch_1 = require("./option/watch");
Object.defineProperty(exports, "Watch", { enumerable: true, get: function () { return watch_1.decorator; } });
var props_1 = require("./option/props");
Object.defineProperty(exports, "Prop", { enumerable: true, get: function () { return props_1.decorator; } });
var inject_1 = require("./option/inject");
Object.defineProperty(exports, "Inject", { enumerable: true, get: function () { return inject_1.decorator; } });
var emit_1 = require("./option/emit");
Object.defineProperty(exports, "Emit", { enumerable: true, get: function () { return emit_1.decorator; } });
var vmodel_1 = require("./option/vmodel");
Object.defineProperty(exports, "VModel", { enumerable: true, get: function () { return vmodel_1.decorator; } });
Object.defineProperty(exports, "Model", { enumerable: true, get: function () { return vmodel_1.decorator; } });
var vanilla_1 = require("./option/vanilla");
Object.defineProperty(exports, "Vanilla", { enumerable: true, get: function () { return vanilla_1.decorator; } });
var methodsAndHooks_1 = require("./option/methodsAndHooks");
Object.defineProperty(exports, "Hook", { enumerable: true, get: function () { return methodsAndHooks_1.decorator; } });
const IdentifySymbol = Symbol('vue-facing-decorator-identify');
function TSX() {
    return function (cons) {
        return cons;
    };
}
exports.TSX = TSX;
exports.Base = class {
    constructor(optionBuilder, vueInstance) {
        const props = optionBuilder.props;
        if (props) {
            Object.keys(props).forEach(key => {
                this[key] = vueInstance[key];
            });
        }
    }
};
exports.Vue = exports.Base;
//# sourceMappingURL=index.js.map