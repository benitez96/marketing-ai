export interface ILogin {
    username: string;
    password: string;
}

export interface IToken {
    access_token: string;
}

export interface IUser {
    id: number, username: string, email: string, brands: any[], firstName: string, lastName: string
}