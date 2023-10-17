import { AggregateRoot } from "@nestjs/cqrs";
import { IDGenerator } from "../interfaces/IDGenerator";
import { IDGeneratorAsync } from "../interfaces/IDGeneratorAsync";

type MessageDefaultInput = {
    text: string;
    senderId: string;
    chatId: string;
    sentAt: Date;
    idGenerator: IDGenerator;
    
}

type MessageAsyncInput = {
    text: string;
    senderId: string;
    chatId: string;
    sentAt: Date;
    idGenerator: IDGeneratorAsync;
    
}
//todo: use AggrgateRoot CQRS module
export default class Message {
    private _id:string;
    private _text: string;
    private _senderId: string;
    private _chatId: string;
    private _sentAt: Date;

    private constructor(){}

    public static create(input:MessageDefaultInput):Message{
        const message = new Message()
        message._id = input.idGenerator.generate();
        message._text = input.text;
        message._senderId = input.senderId;
        message._chatId = input.chatId;
        message._sentAt = input.sentAt;
        return message
    }

    public static async createAsync(input:MessageAsyncInput) {
        const message = new Message()
        message._id = await input.idGenerator.generate();
        message._text = input.text;
        message._senderId = input.senderId;
        message._chatId = input.chatId;
        message._sentAt = input.sentAt;
        return message
    }

    public get id() : string {
        return this._id;
    }

    public get text() : string {
        return this._text;
    }

    public get senderId() : string {
        return this._senderId;
    }

    public get chatId() : string {
        return this._chatId
    }

    public get sentAt() : Date {
        return this._sentAt
    }
    
    
}