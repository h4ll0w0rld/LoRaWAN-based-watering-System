export class ToDo {
    id:number;
    headline: string;
    description:string;
    isDone:boolean;
    

    constructor(_id:number, _title:string, _description:string, _isDone:boolean ){
        this.id = _id;
        this.headline = _title;
        this.description = _description;
        this.isDone = _isDone;
    }
    
}