export class User {
    _id: string;
    name: string;
    address: string;
    mail: string;
    password: string;

    constructor(name: string, address: string, mail: string, password: string) {
        this.name = name;
        this.address = address;
        this.mail = mail;
        this.password = password;
    }
}