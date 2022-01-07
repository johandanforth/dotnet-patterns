export interface ISomeService {
    name: string;

    getName(): string;
}

export class SomeService implements ISomeService {
    name: string;

    constructor() {
        this.name = "Johan";
    }

    getName(): string {
        return this.name;
    }

}