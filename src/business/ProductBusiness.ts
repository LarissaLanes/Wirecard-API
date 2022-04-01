import { CustomError } from './../error/CustomError';
import { Product, ProductInput } from './../model/ProductModel';
import { ProductDatabase } from './../data/ProductDatabase';
import { TokenGenerator } from './../services/tokenGenerator';
import { IdGenerator } from './../services/idGenerator';

class ProductBusiness{

    constructor(
        private idGenerator: IdGenerator,
        private tokenGenerator: TokenGenerator,
        private productDatabase: ProductDatabase
    ){}

    async createProduct(
        input : ProductInput, token: string
    ){

        try{

            const { seller, title, price, description} = input

            if(!seller || !title || !price || !description){
                throw new CustomError(422, "preencha corretamente todos os campos")
            }

            if(!token){
                throw  new Error("Por favor insira o token")
            }

            const tokenValidation: any = this.tokenGenerator.verify(token)

            if(tokenValidation.type != "VENDEDOR"){
                throw new Error("Somente vendedores podem criar produtos")
            }

            const Id = this.idGenerator.generate()

            await this.productDatabase.createProduct(
                new Product(Id, seller, title, price, description)
            )

            return "Produto criado com sucesso"

        }catch(error){
            if (error instanceof Error) {
                throw new CustomError(400, error.message)
        } else {
            throw new CustomError(400, "Erro ao criar um produto")
        }

    }
        
    }

    async getAllProduct(req: Request, res: Response){
        try{

        }catch(error){

        }
    }

    async getProductFromId(req: Request, res: Response){
        try{

        }catch(error){

        }
    }



    
}

export default new ProductBusiness(
    new IdGenerator(),
    new TokenGenerator(),
    new ProductDatabase()
   
)