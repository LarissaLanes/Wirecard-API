import { Product } from "../model/ProductModel";
import BaseDataBase, { table_product } from "./BaseDatabase";



export class ProductDatabase extends BaseDataBase{

    async createProduct(product: Product): Promise<void>{
        try{
            await BaseDataBase.connection.raw(`
                INSERT INTO ${table_product} (id, seller, title, price, description)
                VALUES (
                    '${product.getId()}',
                    '${product.getSeller()}',
                    '${product.getTitle()}',
                    '${product.getPrice()}',
                    '${product.getDescription()}'
                )
            `)

        }catch(error){
            if(error instanceof Error){
                throw new Error(error.message)
            }
        }
    }
}