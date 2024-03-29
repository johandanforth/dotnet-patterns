import { Cons } from '../component';
import { OptionBuilder } from '../optionBuilder';
export declare type EmitConfig = null | string;
export declare const decorator: {
    (option?: string | undefined): any;
    (proto: import("..").BaseTypeIdentify, name: any): any;
};
export declare function build(cons: Cons, optionBuilder: OptionBuilder): void;
//# sourceMappingURL=emit.d.ts.map