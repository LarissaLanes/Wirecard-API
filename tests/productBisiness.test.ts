import ProductBusiness from "../src/business/ProductBusiness";
import { ProductDatabaseMock } from "./mocks/product/productDataBaseMock";
import { IdGeneratorMock } from "./mocks/services/idGeneratorMock";
import { TokenGeneratorMock } from "./mocks/services/tokenGeneratorMock";


const productBusinessMock = new ProductBusiness(
    new IdGeneratorMock(),
    new TokenGeneratorMock(), 
    new ProductDatabaseMock() as any
)

describe("Tests product", () => {

    test("Error caso falte dados", async () => {
        expect.assertions(2);
        try{
            const accessToken = await productBusinessMock.createProduct("", "", "", "" )
            expect(accessToken).toEqual({"accessToken": "token_mock"})
        }catch(e){
            expect(e.message).toEqual("Preencha corretamente todos os campos")
            expect(e.statusCode).toBe(400)
        }
    })
})