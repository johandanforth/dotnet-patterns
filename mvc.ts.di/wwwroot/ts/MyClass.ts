import { ISomeService } from "./SomeService.js";

export { }
declare global {
    
}

export { }
function enumerable(value: boolean) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        descriptor.enumerable = value;
    };
}

export class MyClass {


    public name: string = "";

    constructor(someService: ISomeService) {
        console.log("MyClass ctor");
        console.log("Some name is " + someService.getName());
    }

    @enumerable(false)
    doit() {
        console.log("doit()")
    }
}

