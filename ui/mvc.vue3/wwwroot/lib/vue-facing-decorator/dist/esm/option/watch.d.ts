import { Cons } from '../component';
import { OptionBuilder } from '../optionBuilder';
import type { WatchCallback } from 'vue';
export interface WatchConfig {
    key: string;
    handler: WatchCallback;
    flush?: 'post';
    deep?: boolean;
    immediate?: boolean;
}
declare type Option = Omit<WatchConfig, 'handler' | 'key'>;
export declare function decorator(key: string, option?: Option): (proto: any, name: string) => void;
export declare function build(cons: Cons, optionBuilder: OptionBuilder): void;
export {};
//# sourceMappingURL=watch.d.ts.map