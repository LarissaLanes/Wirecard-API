export class PaymentCredit{

    constructor(
        private id: string,
        private idPayment: string,
        private cardName: string,
        private cardNumber: string,
        private cardExpirationDate: Date,
        private cardCvv: string
    ){}

    public getId(): string {
        return this.id
    }

    public getIdPayment(): string {
        return this.idPayment
    }

    public getCardName(): string {
        return this.cardName
    }

    public getCardNumber(): string {
        return this.cardNumber
    }

    public getCardExpirationDate(): Date {
        return this.cardExpirationDate
    }

    public getCardCvv(): string {
        return this.cardCvv
    }

}