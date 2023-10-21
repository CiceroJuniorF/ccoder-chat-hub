import { rejects } from "assert";
import { IDGenerator } from "../interfaces/IDGenerator";
import { IDGeneratorAsync } from "../interfaces/IDGeneratorAsync";
import Chat from "./Chat";

describe('Chat', () => {
    const idMock: string = "idMock";
    const participantsMock: string[] = ["idMock", "idMock2"]

    test("Should create a Chat with the correct properties", () => {
        const idGeneratorMock: IDGenerator = {
            generate: () => idMock
        };
        const chat: Chat = Chat.create({
            participants: participantsMock,
            idGenerator: idGeneratorMock
        });

        expect(chat.participants).toBe(participantsMock);
        expect(chat.id).toBe(idMock);
    });

    test("Should create a Chat with the correct properties async", async() => {
        const idGeneratorMock: IDGeneratorAsync = {
            generate: () => new Promise((resolve, rejects) =>{
                return resolve(idMock)
            })
        };
        const chat: Chat = await Chat.createAsync({
            participants: participantsMock,
            idGenerator: idGeneratorMock
        });

        expect(chat.participants).toBe(participantsMock);
        expect(chat.id).toBe(idMock);
    });

    test("Should load a Chat with the correct properties async", async() => {
        const chat: Chat =  Chat.load({
            participants: participantsMock,
            id: idMock
        });

        expect(chat.participants).toBe(participantsMock);
        expect(chat.id).toBe(idMock);
    });

});
