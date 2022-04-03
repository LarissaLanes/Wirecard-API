import { Product } from "../model/ProductModel";
import BaseDataBase, { table_product } from "./BaseDatabase";



export class ProductDatabase extends BaseDataBase{

    private toModel(dbModel?: any): Product | undefined {
        return (
           dbModel &&
           new Product(
              dbModel.id,
              dbModel.seller,
              dbModel.title,
              dbModel.price,
              dbModel.description,
           )
        );
     }

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

    async getProductById(id: string): Promise<Product | any> {
        try{
            const result = await BaseDataBase.connection.raw(`
                SELECT * FROM ${table_product} WHERE id = '${id}'
            
            `)

            return this.toModel(result[0][0]);

        }catch(error){
            if(error instanceof Error){
                throw new Error(error.message)
            }
        }
    }

  
}