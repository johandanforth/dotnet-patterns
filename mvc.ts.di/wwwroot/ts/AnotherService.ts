export interface IAnotherService {
    age: number;

    getAge(): number;
}

export class AnotherService implements IAnotherService {
    age: number;

    constructor() {
        this.age = 54;
    }

    getAge(): number {
        return this.age;
    }

}