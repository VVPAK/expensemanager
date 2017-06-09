export class User {
    id: string;
    username: string;
    password: string;
    name: {
        first: string,
        last: string
    };

    constructor() {
        this.name = { first: '', last: ''};
    }
}
