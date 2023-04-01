export { Component, ComponentBase } from './component';
export { decorator as Ref } from './option/ref';
export { decorator as Watch } from './option/watch';
export { decorator as Prop } from './option/props';
export { decorator as Inject } from './option/inject';
export { decorator as Emit } from './option/emit';
export { decorator as VModel, decorator as Model } from './option/vmodel';
export { decorator as Vanilla } from './option/vanilla';
export { decorator as Hook } from './option/methodsAndHooks';
import type { ComponentPublicInstance } from 'vue';
import type { OptionBuilder } from './optionBuilder';
declare const IdentifySymbol: unique symbol;
export interface BaseTypeIdentify {
    [IdentifySymbol]: undefined;
}
export declare function TSX<Properties extends {} = {}, Events extends {} = {}>(): <C extends VueCons>(cons: C) => new () => Omit<ComponentPublicInstance<InstanceType<C>["$props"] & Properties & { [index in keyof Events as `on${Capitalize<index & string>}`]: Events[index] extends Function ? Events[index] : (param: Events[index]) => any; }, {}, {}, {}, {}, {}, InstanceType<C>["$props"] & Properties & { [index in keyof Events as `on${Capitalize<index & string>}`]: Events[index] extends Function ? Events[index] : (param: Events[index]) => any; }, {}, false, import("vue").ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}>>, keyof Properties | keyof { [index in keyof Events as `on${Capitalize<index & string>}`]: Events[index] extends Function ? Events[index] : (param: Events[index]) => any; }> & InstanceType<C>;
export declare type VueCons = {
    new (optionBuilder: OptionBuilder, vueInstance: any): ComponentPublicInstance & BaseTypeIdentify;
};
export declare const Base: VueCons;
export declare const Vue: VueCons;
//# sourceMappingURL=index.d.ts.map