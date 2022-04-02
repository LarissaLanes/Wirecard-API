import { CustomError } from "../error/CustomError"

export class Payment{

    constructor(
        private id: string,
        private amount: number,
        private type: METHOD_PAYMENT_ROLES,
        private idProduct: string,
        private paymentCreatedAt: any
        // private cardName: string,
        // private cardNumber: string,
        // private cardExpirationDate: Date,
        // private cardCvv: number
    ){}

    public getId(): string {
        return this.id
    }

    public getAmount(): number {
        return this.amount
    }

    public getType(): METHOD_PAYMENT_ROLES {
        return this.type
    }

    public getIdProduct(): string {
        return this.idProduct
    }

    public getPaymentCreatedAt(): any {
        return this.paymentCreatedAt
    }

    // public getStatus(): STATUS_PAYMENT {
    //     return this.status
    // }

    // public getCardName(): string {
    //     return this.cardName
    // }

    // public getCardNumber(): string {
    //     return this.cardNumber
    // }

    // public getCardExpirationData(): Date {
    //     return this.cardExpirationDate
    // }

    // public getCardCvv(): number {
    //     return this.cardCvv
    // }

}

export type PaymentInput = {
    amount: number,
    type: METHOD_PAYMENT_ROLES,
    idProduct: string,
}

export type CardInput = {
    cardName: string,
    cardNumber: string,
    cardExpirationDate: Date,
    cardCvv: number
}

export enum METHOD_PAYMENT_ROLES{
    BOLETO = "BOLETO",
    CREDITO = "CREDITO"
}

export const stringToMethodRole = (input: string): METHOD_PAYMENT_ROLES => {
    switch (input) {
       case "BOLETO":
          return METHOD_PAYMENT_ROLES.BOLETO;
       case "CREDITO":
          return METHOD_PAYMENT_ROLES.CREDITO;
       default:
          throw new CustomError(422, "Metodo de pagamento inválido");
    }
 };

//  export enum STATUS_PAYMENT{
//     PENDENTE = "PENDENTE",
//     REALIZADO = "REALIZADO"
// }

// export const stringToMethodStatus = (input: string): STATUS_PAYMENT => {
//     switch (input) {
//        case "PENDENTE":
//           return STATUS_PAYMENT.PENDENTE;
//        case "REALIZADO":
//           return STATUS_PAYMENT.REALIZADO;
//        default:
//           throw new CustomError(422, "Tipo de status não encontrado");
//     }
//  };
