import { PaymentDatabaseMOCK } from './mocks/payment/PaymentDatabaseMock';
import { HashGeneratorMock } from "./mocks/services/hashGenerateMock";
import { IdGeneratorMock } from "./mocks/services/idGeneratorMock";
import { TokenGeneratorMock } from "./mocks/services/tokenGeneratorMock";
import PaymentBusiness from '../src/business/PaymentBusiness';



const paymentBusinessMock = new PaymentBusiness(
    new IdGeneratorMock(),
    new HashGeneratorMock(),
    new TokenGeneratorMock(), 
    new PaymentDatabaseMOCK() as any
)

describe('Tests payment', () => {
    
    test('Error que retorna caso não tenha id do produto', async () => {
        expect.assertions(2);
        try{
            await paymentBusinessMock.methodPayment(12, "BOLETO", "")
        }catch(e){
            expect(e.message).toEqual('É necessário um ID do produto')
            expect(e.statusCode).toBe(400)
        }
    })



    



})