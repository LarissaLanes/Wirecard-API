import { Product } from "../../../src/model/ProductModel";



export class ProductDatabaseMock{


    async createProduct(product: Product): Promise<void>{
    }

    async getProductById(id: string): Promise<Product | any> {
        
    }

  
}