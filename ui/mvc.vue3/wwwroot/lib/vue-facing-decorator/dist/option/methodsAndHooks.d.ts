import { Cons } from '../component';
import { OptionBuilder } from '../optionBuilder';
export declare const HookNames: readonly ["beforeCreate", "created", "beforeMount", "mounted", "beforeUpdate", "updated", "activated", "deactivated", "beforeDestroy", "beforeUnmount", "destroyed", "unmounted", "renderTracked", "renderTriggered", "errorCaptured", "serverPrefetch", "render"];
export declare type HookConfig = null;
export declare const decorator: {
    (option?: unknown): any;
    (proto: import("..").BaseTypeIdentify, name: any): any;
};
export declare function build(cons: Cons, optionBuilder: OptionBuilder): void;
//# sourceMappingURL=methodsAndHooks.d.ts.map