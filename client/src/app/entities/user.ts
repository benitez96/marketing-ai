import { IUser } from "interfaces/user";

class User implements IUser {
    public id: number;
    public username: string;
    public firstName: string;
    public lastName: string;
    public email: string;
    public brands: any[];

    constructor(id: number, username: string, firstName: string, lastName: string, email: string, brands: any[]) {
        this.id = id
        this.username = username
        this.firstName = firstName
        this.lastName = lastName
        this.email = email
        this.brands = brands
    }

    public static init() {
        const user = new this(0, '', '', '', '', [])
        return user
    }
}

export default User