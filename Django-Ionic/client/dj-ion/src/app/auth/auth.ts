export class AuthLoginData {
    usuario: string;
    password: string;

    constructor(un:string, pass: string){
        this.usuario = un;
        this.password = pass;
    }
}