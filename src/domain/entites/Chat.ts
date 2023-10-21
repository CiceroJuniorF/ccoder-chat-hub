import { AggregateRoot } from "@nestjs/cqrs";
import { IDGenerator } from "../interfaces/IDGenerator";
import { IDGeneratorAsync } from "../interfaces/IDGeneratorAsync";


type ChatInput = {
    participants: string[];
}

type LoadChatInput = ChatInput & {
    id: string;
}

type CreateChatDefaultInput = ChatInput & {
    idGenerator: IDGenerator;
}

type CreateChatAsyncInput = ChatInput & {
    idGenerator: IDGeneratorAsync;
}

export default class Chat extends AggregateRoot {
    private _id:string;
    private _participants: string[];

    private constructor(id:string, participants:string[]){
        super();
        this._id = id;
        this._participants = participants;
    }

    public static create(input:CreateChatDefaultInput):Chat{
        const id_ = input.idGenerator.generate();
        const chat = new Chat(id_, input.participants);
        return chat;
    }

    public static async createAsync(input:CreateChatAsyncInput) {
        const id_ = await input.idGenerator.generate();
        const chat = new Chat(id_, input.participants);
        return chat;
    }

    public static load(input:LoadChatInput):Chat{
        const chat = new Chat(input.id, input.participants);
        return chat;
    }

    public get id() : string {
        return this._id;
    }

    public get participants() : string[] {
        return this._participants;
    }
    
}
