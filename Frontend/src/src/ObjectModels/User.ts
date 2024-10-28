export class User{
    id: number;
    username: string;
    passwd: string;

    constructor(_id: number, _username: string, _passwd:string){

        this.id = _id;
        this.username = _username; 
        this.passwd = _passwd;

    }
}