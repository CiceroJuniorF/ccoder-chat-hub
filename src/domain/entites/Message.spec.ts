import { rejects } from "assert";
import { IDGenerator } from "../interfaces/IDGenerator";
import { IDGeneratorAsync } from "../interfaces/IDGeneratorAsync";
import Message from "./Message";

describe('Message', () => {
    const textMock: string = "Mockmessage";
    const senderIdMock: string = "MockSenderID"
    const chatIdMock: string = "MockChatId"
    const sentAtMock: Date = new Date("2021-01-01")
    const idMock: string = "string"

    test("Should create a message with the correct properties", () => {
        const idGeneratorMock: IDGenerator = {
            generate: () => idMock
        };
        const message: Message = Message.create({
            text: textMock,
            senderId: senderIdMock,
            chatId: chatIdMock,
            sentAt: sentAtMock,
            idGenerator: idGeneratorMock
        });

        expect(message.text).toBe(textMock);
        expect(message.senderId).toBe(senderIdMock);
        expect(message.chatId).toBe(chatIdMock);
        expect(message.sentAt).toBe(sentAtMock);
        expect(message.id).toBe(idMock);
    });

    test("Should create a message with a different ID when using the IDGenerator", () => {
        const idGeneratorMock: IDGenerator = {
            generate: jest
                .fn()
                .mockReturnValueOnce("id1")
                .mockReturnValueOnce("id2")
        };

        const message1: Message = Message.create({
            text: textMock,
            senderId: senderIdMock,
            chatId: chatIdMock,
            sentAt: sentAtMock,
            idGenerator: idGeneratorMock
        });

        const message2: Message = Message.create({
            text: textMock,
            senderId: senderIdMock,
            chatId: chatIdMock,
            sentAt: sentAtMock,
            idGenerator: idGeneratorMock
        });
        expect(message1.id).not.toBe(message2.id);
    });

    test("Should create a message with the correct properties async", async() => {
        const idGeneratorMock: IDGeneratorAsync = {
            generate: () => new Promise((resolve, rejects) =>{
                return resolve(idMock)
            })
        };
        const message: Message = await Message.createAsync({
            text: textMock,
            senderId: senderIdMock,
            chatId: chatIdMock,
            sentAt: sentAtMock,
            idGenerator: idGeneratorMock
        });

        expect(message.text).toBe(textMock);
        expect(message.senderId).toBe(senderIdMock);
        expect(message.chatId).toBe(chatIdMock);
        expect(message.sentAt).toBe(sentAtMock);
        expect(message.id).toBe(idMock);
    });

    test("Should load a message with the correct properties", async() => {
        const message: Message = await Message.load({
            text: textMock,
            senderId: senderIdMock,
            chatId: chatIdMock,
            sentAt: sentAtMock,
            id: idMock
        });
        expect(message.text).toBe(textMock);
        expect(message.senderId).toBe(senderIdMock);
        expect(message.chatId).toBe(chatIdMock);
        expect(message.sentAt).toBe(sentAtMock);
        expect(message.id).toBe(idMock);
    });


});
