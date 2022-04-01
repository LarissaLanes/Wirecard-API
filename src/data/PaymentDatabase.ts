import { Payment } from "../model/PaymentModel";
import BaseDataBase, { table_payment } from "./BaseDatabase";

export class PaymentDatabase extends BaseDataBase{

    async makePayment(payment: Payment): Promise<void>{

        try{
            await BaseDataBase.connection.raw(`
                INSERT INTO ${table_payment} (id, amount, type, id_product, card_name, card_number, card_expiration_date, card_cvv)
                VALUES (
                    '${payment.getId()}',
                    '${payment.getAmount()}',
                    '${payment.getType()}',
                    '${payment.getIdProduct()}',
                    '${payment.getCardName()}',
                    '${payment.getCardNumber()}',
                    '${payment.getCardExpirationData()}',
                    '${payment.getCardCvv()}'
                )
            `)

        }catch(error){
            if(error instanceof Error){
                throw new Error(error.message)
            }
        }

    }
}