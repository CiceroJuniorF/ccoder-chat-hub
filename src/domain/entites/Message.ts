import { AggregateRoot } from "@nestjs/cqrs";
import { IDGenerator } from "../interfaces/IDGenerator";
import { IDGeneratorAsync } from "../interfaces/IDGeneratorAsync";
import NewEntityEvent from "../events/NewEntityEvent";

type MessageInput = {
    text: string;
    senderId: string;
    chatId: string;
    sentAt: Date;
}

type CreateMessageDefaultInput = MessageInput & {
    idGenerator: IDGenerator;
}

type CreateMessageAsyncInput = MessageInput & {
    idGenerator: IDGeneratorAsync;
}

type LoadMessageInput = MessageInput & {
    id: string;
}

export default class Message extends AggregateRoot {
    private _id:string;
    private _text: string;
    private _senderId: string;
    private _chatId: string;
    private _sentAt: Date;

    constructor(id: string, text: string, senderId: string, chatId: string, sentAt: Date) {
        super();
        this._id = id;
        this._text = text;
        this._senderId = senderId;
        this._chatId = chatId;
        this._sentAt = sentAt;
    }

    public static create(input:CreateMessageDefaultInput):Message{
        const id_ = input.idGenerator.generate();
        const message = new Message(id_, input.text, input.senderId, input.chatId, input.sentAt)
        message.created();
        return message
    }

    public static async createAsync(input:CreateMessageAsyncInput) {
        const id_ = await input.idGenerator.generate();
        const message = new Message(id_, input.text, input.senderId, input.chatId, input.sentAt)
        message.created();
        return message
    }

    public static load(input:LoadMessageInput) {
        const message = new Message(input.id, input.text, input.senderId, input.chatId, input.sentAt)
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
    
    private created():void{
        this.publish(new NewEntityEvent<Message>(this));
        this.commit()
    }
    
}
