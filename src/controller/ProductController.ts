import { ProductInput } from './../model/ProductModel';
import {Request, Response} from "express"
import ProductBusiness from './../business/ProductBusiness';


export class ProductController{


    async createProduct(req: Request, res: Response): Promise<void>{
        try{
            const {seller, title, price, description} = req.body
            
            const token = req.headers.authorization as string

            const input: ProductInput = {
                seller, 
                title, 
                price, 
                description
            }

            const result = await ProductBusiness.createProduct(
                input, token
            )

            res.status(201).send(result)


        }catch(error){
            if (error instanceof Error) {
                res.status(400).send(error.message);
            } else {
                res.send({ message: "Algo deu errado ao cadastrar um produto novo" })
            }

        }
    }

    async getProductById(req: Request, res: Response){
        try{
            const id = req.params.id
            const token = req.headers.authorization as string

            const result = await ProductBusiness.getProductById(id, token)
            res.status(200).send(result)

        }catch(error){
            if (error instanceof Error) {
                res.status(400).send(error.message);
            } else {
                res.send({ message: "Algo deu errado" })
            }
        }
    }


}

export default new ProductController()