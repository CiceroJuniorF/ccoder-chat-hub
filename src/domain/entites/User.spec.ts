import { rejects } from "assert";
import { IDGenerator } from "../interfaces/IDGenerator";
import { IDGeneratorAsync } from "../interfaces/IDGeneratorAsync";
import User from "./User";

describe('User', () => {
    const nameMock: string = "MockName";
    const emailMock: string = "EmailMock"
    const idMock: string = "string"

    test("Should create a User with the correct properties", () => {
        const idGeneratorMock: IDGenerator = {
            generate: () => idMock
        };
        const user: User = User.create({
            name: nameMock,
            email: emailMock,
            idGenerator: idGeneratorMock
        });

        expect(user.name).toBe(nameMock);
        expect(user.email).toBe(emailMock);
        expect(user.id).toBe(idMock);
    });

    test("Should create a User with the correct properties async", async() => {
        const idGeneratorMock: IDGeneratorAsync = {
            generate: () => new Promise((resolve, rejects) =>{
                return resolve(idMock)
            })
        };
        const user: User = await User.createAsync({
            name: nameMock,
            email: emailMock,
            idGenerator: idGeneratorMock
        });

        expect(user.name).toBe(nameMock);
        expect(user.email).toBe(emailMock);
        expect(user.id).toBe(idMock);
    });

    test("Should load a User with the correct properties async", async() => {
        const user: User =  User.load({
            name: nameMock,
            email: emailMock,
            id: idMock
        });

        expect(user.name).toBe(nameMock);
        expect(user.email).toBe(emailMock);
        expect(user.id).toBe(idMock);
    });

});
