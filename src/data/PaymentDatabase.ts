import { PaymentCredit } from "../model/CreditModel";
import { Payment } from "../model/PaymentModel";
import BaseDataBase, { table_card, table_payment } from "./BaseDatabase";

export class PaymentDatabase extends BaseDataBase{

    private toModel(dbModel?: any): PaymentCredit | undefined {
        return (
           dbModel &&
           new PaymentCredit(
              dbModel.id,
              dbModel.idPayment,
              dbModel.cardName,
              dbModel.cardNumber,
              dbModel.cardExpirationDate,
              dbModel.cardCvv,
           )
        );
     }
  

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

    async makePaymentCredit(payment: PaymentCredit): Promise<void>{

        try{
            await BaseDataBase.connection.raw(`
                INSERT INTO ${table_card} (id, id_payment, card_name, card_number, card_expiration_date, card_cvv)
                VALUES (
                    '${payment.getId()}',
                    '${payment.getIdPayment()}',
                    '${payment.getCardName()}',
                    '${payment.getCardNumber()}',
                    '${payment.getCardExpirationDate()}',
                    '${payment.getCardCvv()}'

                )
            `)

        }catch(error){
            if(error instanceof Error){
                throw new Error(error.message)
            }
        }
    }

    async getPaymentByIdOfProduct(idProduct: string): Promise<PaymentCredit | undefined>{
        try{
            const result = await BaseDataBase.connection.raw(`
                SELECT * FROM ${table_payment} WHERE id_product = '${idProduct}'
            `)

            return this.toModel(result[0][0])
            

        }catch(error){
            if(error instanceof Error){
                throw new Error(error.message)
            }
        }
    }



}