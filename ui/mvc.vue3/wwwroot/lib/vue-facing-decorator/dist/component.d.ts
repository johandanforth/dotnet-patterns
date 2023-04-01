import { ComponentCustomOptions } from 'vue';
import type { VueCons } from './index';
export declare type Cons = VueCons;
declare function ComponentOption(cons: Cons, extend?: any): any;
declare type ComponentOption = {
    name?: string;
    emits?: string[];
    provide?: Record<string, any> | Function;
    components?: Record<string, any>;
    directives?: Record<string, any>;
    inheritAttrs?: boolean;
    expose?: string[];
    render?: Function;
    modifier?: (raw: any) => any;
    options?: ComponentCustomOptions & Record<string, any>;
    template?: string;
    mixins?: any[];
};
declare type ComponentConsOption = Cons | ComponentOption;
export declare function ComponentBase(arg: ComponentConsOption): any;
export declare function Component(arg: ComponentConsOption): any;
export {};
//# sourceMappingURL=component.d.ts.map