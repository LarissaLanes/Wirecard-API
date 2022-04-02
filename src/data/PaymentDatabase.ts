import { Payment } from "../model/PaymentModel";
import BaseDataBase, { table_payment } from "./BaseDatabase";

export class PaymentDatabase extends BaseDataBase{

    async makePayment(payment: Payment): Promise<void>{

        try{
            await BaseDataBase.connection.raw(`
                INSERT INTO ${table_payment} (id, amount, type, id_product, payment_created_at)
                VALUES (
                    '${payment.getId()}',
                    '${payment.getAmount()}',
                    '${payment.getType()}',
                    '${payment.getIdProduct()}',
                    '${payment.getPaymentCreatedAt().toISOString().substring(0, 10)}'

                )
            `)

        }catch(error){
            if(error instanceof Error){
                throw new Error(error.message)
            }
        }

    }
}