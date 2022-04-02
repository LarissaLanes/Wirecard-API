import dotenv from "dotenv";
import knex from "knex";

dotenv.config();

export default class BaseDataBase {

   protected static connection = knex({
      client: "mysql",
      connection: {
         host: process.env.DB_HOST,
         user: process.env.DB_USER,
         password: process.env.DB_PASSWORD,
         database: process.env.DB_SCHEMA,
         port: 3306,
         multipleStatements: true
      },
   });


   public static async destroyConnection(): Promise<void> {
      await BaseDataBase.connection.destroy();
   }
}

export const table_user = "card_user"
export const table_payment = "card_payment"
export const table_product = "card_product"
export const table_card = "card_boleto"