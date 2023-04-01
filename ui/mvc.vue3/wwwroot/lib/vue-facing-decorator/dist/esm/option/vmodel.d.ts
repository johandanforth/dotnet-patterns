import { Cons } from '../component';
import { OptionBuilder } from '../optionBuilder';
import { PropsConfig } from './props';
export declare type VModelConfig = PropsConfig & {
    name?: string;
};
export declare const decorator: {
    (option?: VModelConfig | undefined): any;
    (proto: import("..").BaseTypeIdentify, name: any): any;
};
export declare function build(cons: Cons, optionBuilder: OptionBuilder): void;
//# sourceMappingURL=vmodel.d.ts.map