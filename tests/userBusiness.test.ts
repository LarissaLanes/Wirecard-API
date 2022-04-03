import UserBusiness from "../src/business/UserBusiness";
import { HashGeneratorMock } from "./mocks/services/hashGenerateMock";
import { IdGeneratorMock } from "./mocks/services/idGeneratorMock";
import { TokenGeneratorMock } from "./mocks/services/tokenGeneratorMock";
import { UserDataBaseMock } from "./mocks/user/userDataBaseMock";



const userBusinessMock = new UserBusiness(
    new IdGeneratorMock(),
    new HashGeneratorMock(),
    new TokenGeneratorMock(), 
    new UserDataBaseMock() as any
)

describe('Tests signup', () => {
    
    test('Error que retorna caso o nome esteja vazio', async () => {
        expect.assertions(2);
        try{
            await userBusinessMock.signup("", "user1@gmail.com", "111.111.111-11", "VENDEDOR")
        }catch(e){
            expect(e.message).toEqual('preencha os campos corretamente')
            expect(e.statusCode).toBe(400)
        }
    })

    test('Error se o email for iválido', async() => {
        try{
            await userBusinessMock.signup("user1", "user1@" ,"111.111.111-11", "VENDEDOR")
        }catch(e){
            expect(e.message).toEqual('preencha os campos corretamente')
            expect(e.statusCode).toBe(400)
        }
    })

    test('Error caso o cpf esteja incorreto', async() => {
        try{
            await userBusinessMock.signup("user1", "user1@gmail.com", "111.111.111-1", "VENDEDOR")
        }catch(e){
            expect(e.message).toEqual('cpf incorreto')
            expect(e.statusCode).toBe(400)
        }
    })


    



})