import { METHOD_PAYMENT_ROLES } from './../../../src/model/PaymentModel';
import { Payment } from "../../../src/model/PaymentModel"



export const paymentMock1 = new Payment (
    "id_mock1", 
    1,
    METHOD_PAYMENT_ROLES.BOLETO,
    "id_product1",
    "22/22/2222"
)
 
export const paymentMock2 = new Payment (
    "id_mock2", 
    2,
    METHOD_PAYMENT_ROLES.CREDITO,
    "id_product2",
    "22/22/2222"
)

export const paymentMock3 = new Payment (
    "id_mock3", 
    3,
    METHOD_PAYMENT_ROLES.BOLETO,
    "id_product3",
    "22/22/2222"
)