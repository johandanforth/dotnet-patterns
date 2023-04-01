import { WatchConfig } from './option/watch';
import { PropsConfig } from './option/props';
import { InjectConfig } from './option/inject';
export interface OptionBuilder {
    name?: string;
    data?: Record<string, any>;
    methods?: Record<string, Function>;
    hooks?: Record<string, Function>;
    computed?: Record<string, any>;
    watch?: Record<string, WatchConfig | WatchConfig[]>;
    props?: Record<string, PropsConfig>;
    inject?: Record<string, InjectConfig>;
    beforeCreateCallbacks?: Function[];
}
export declare function applyAccessors(optionBuilder: OptionBuilder, dataFunc: (ctx: any) => Map<string, {
    get: (() => any) | undefined;
    set: ((v: any) => any) | undefined;
}>): void;
//# sourceMappingURL=optionBuilder.d.ts.map