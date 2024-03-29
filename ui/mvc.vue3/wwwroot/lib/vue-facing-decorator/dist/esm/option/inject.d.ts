import { Cons } from '../component';
import { OptionBuilder } from '../optionBuilder';
export interface InjectConfig {
    from?: string | Symbol;
    default?: any;
}
export declare const decorator: {
    (option?: InjectConfig | undefined): any;
    (proto: import("..").BaseTypeIdentify, name: any): any;
};
export declare function build(cons: Cons, optionBuilder: OptionBuilder): void;
//# sourceMappingURL=inject.d.ts.map