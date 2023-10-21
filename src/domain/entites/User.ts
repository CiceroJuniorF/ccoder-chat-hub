import { AggregateRoot } from "@nestjs/cqrs";
import { IDGenerator } from "../interfaces/IDGenerator";
import { IDGeneratorAsync } from "../interfaces/IDGeneratorAsync";
import NewEntityEvent from "../events/NewEntityEvent";


type UserInput = {
    name: string;
    email: string;
}

type LoadUserInput = UserInput & {
    id: string;
}

type CreateUserDefaultInput = UserInput & {
    idGenerator: IDGenerator;
}

type CreateUserAsyncInput = UserInput & {
    idGenerator: IDGeneratorAsync;
}

export default class User extends AggregateRoot {
    private _id:string;
    private _name: string;
    private _email: string;

    private constructor(id: string, name:string, email:string){
        super();
        this._id = id;
        this._name = name;
        this._email = email;
    }

    public static create(input:CreateUserDefaultInput):User{
        const id_ = input.idGenerator.generate();
        const user = new User(id_, input.name, input.email);
        user.created();
        return user
    }

    public static async createAsync(input:CreateUserAsyncInput) {
        const id_ = await input.idGenerator.generate();
        const user = new User(id_, input.name, input.email);
        user.created();
        return user
    }

    public static load(input:LoadUserInput):User{
        const user = new User(input.id, input.name, input.email);
        return user
    }

    public get id() : string {
        return this._id;
    }

    public get name() : string {
        return this._name;
    }

    public get email() : string {
        return this._email;
    }

    private created():void{
        this.publish(new NewEntityEvent<User>(this));
        this.commit()
    }
    
}
