import { CustomError } from './../error/CustomError';
import { Product, ProductInput } from './../model/ProductModel';
import { ProductDatabase } from './../data/ProductDatabase';
import { TokenGenerator } from './../services/tokenGenerator';
import { IdGenerator } from './../services/idGenerator';

class ProductBusiness {

    constructor(
        private idGenerator: IdGenerator,
        private tokenGenerator: TokenGenerator,
        private productDatabase: ProductDatabase
    ) { }

    async createProduct(
        input: ProductInput, token: string
    ) {

        try {

            const { seller, title, price, description } = input

            if (!seller || !title || !price || !description) {
                throw new CustomError(422, "Preencha corretamente todos os campos")
            }

            if (!token) {
                throw new CustomError(403, "Por favor insira o token")
            }

            const tokenValidation: any = this.tokenGenerator.verify(token)

            if (tokenValidation.type != "VENDEDOR") {
                throw new CustomError(403, "Somente vendedores podem criar produtos")
            }

            const Id = this.idGenerator.generate()

            await this.productDatabase.createProduct(
                new Product(Id, seller, title, price, description)
            )

            return "Novo produto criado com sucesso"

        } catch (error) {
            if (error instanceof Error) {
                throw new CustomError(400, error.message)
            } else {
                throw new CustomError(500, "Error ao criar um produto")
            }

        }

    }

    async getProductById(id: string, token: string) {
        try {
            if (!id) {
                throw new CustomError(403, "Insira um id")
            }

            if (!token) {
                throw new CustomError(403,"Token necessário")
            }

            const tokenValidation: any = this.tokenGenerator.verify(token)

            const product = (async () => {
                const data = await this.productDatabase.getProductById(id)
                return data
            })

            const dataProduct = await product()

            if (!dataProduct) {
                throw new CustomError(422, "Produto não encontrado ")
            }

            return dataProduct

        } catch (error) {
            if (error instanceof Error) {
                throw new CustomError(400, error.message)
            } else {
                throw new CustomError(500, "Error ao acha produto por id")
            }

        }
    }
}

export default new ProductBusiness(
    new IdGenerator(),
    new TokenGenerator(),
    new ProductDatabase()

)