import { paymentMock1, paymentMock2, paymentMock3 } from './PaymentMock';
import { Payment } from "../../../src/model/PaymentModel"


export class PaymentDatabaseMOCK{

    async makePayment(payment: Payment): Promise<void>{
    }

    async getPaymentByIdOfProduct(idProduct: string): Promise<Payment | undefined>{
        if(idProduct === "id_product1"){
            return paymentMock1
        }else if( idProduct === "id_product2"){
            return paymentMock2
        }else if(idProduct === "id_product3"){
            return paymentMock3
        }else{
            undefined
        }
    }



}