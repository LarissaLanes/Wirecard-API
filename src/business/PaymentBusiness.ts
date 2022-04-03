import { PaymentCredit } from './../model/CreditModel';
import { stringToMethodRole } from './../model/PaymentModel';
import { CustomError } from './../error/CustomError';
import { PaymentDatabase } from './../data/PaymentDatabase';
import { TokenGenerator } from './../services/tokenGenerator';
import { IdGenerator } from './../services/idGenerator';
import { Payment } from '../model/PaymentModel';


class PaymentBusiness {

    constructor(
        private idGenerator: IdGenerator,
        private tokenGenerator: TokenGenerator,
        private PaymentDatabase: PaymentDatabase
    ) { }

    async methodPayment(
        amount: number,
        type: string,
        idProduct: string,
        token: string
    ) {
        try {
            if (!type) {
                throw new CustomError(422, "Por favor, escolha o metodo de pagamento")
            }

            if (!amount) {
                throw new CustomError(422, "Selecione a quantidade desejada")
            }

            if (!idProduct) {
                throw new CustomError(422, "É necessário um ID do produto")
            }

            if (!token) {
                throw new Error("Por favor insira um token")
            };

            if (amount > 5) {
                throw new CustomError(422, "Desculpe, o máximo é de 5 produtos")
            }
            const tokenValidation: any = this.tokenGenerator.verify(token)

            const Id = this.idGenerator.generate()

            if (tokenValidation.type != "COMPRADOR") {
                throw new Error("Somente clientes podem realizar uma compra")
            }

            const boleto = "9823781752939kfmsam2898-027872u9dok--qmdj2ijdwnjioqhdh89128u-qhwd2d8382jen739"

            const response = "Pagamento no boleto feito com sucesso"

            const paymentCreatedAt: any = new Date()

            await this.PaymentDatabase.makePayment(
                new Payment(
                    Id,
                    amount,
                    stringToMethodRole(type),
                    idProduct,
                    paymentCreatedAt
                )
            )

            if (type === "CREDITO") {
                return "Agora preencha os dados do seu cartão de crédito"
            } if (type === "BOLETO") {
                return ({boleto, response})

            }
            
            return "OK"

        } catch (error) {
            if (error instanceof Error) {
                throw new CustomError(403, error.message)
            } else {
                throw new CustomError(500, "Erro ao fazer um pagamento, tente novamente mais tarde")
            }

        }
    }

    async methodPaymentCredit(
        idPayment: string,
        cardName: string,
        cardNumber: string,
        cardExpirationDate: Date,
        cardCvv: string,
        token: string
    ) {
        try {

            if (!idPayment) {
                throw new CustomError(422, "É necessáio um Id")
            }

            if (!cardName) {
                throw new CustomError(422, "O nome do cartão é obrigatório")
            }

            if (!cardNumber) {
                throw new CustomError(422, "Número do cartão incorreto, exemplo : 0000-0000-0000-0000")
            }

            if (!cardExpirationDate) {
                throw new CustomError(422, "Data de validade é obrigatória")
            }

            if (cardCvv.length != 3) {
                return "CVV deve conter 3 digitos, Verifique no verso do seu cartão"
            }

            if (!token) {
                throw new CustomError(403, "Token obrigatório")
            };

            const tokenValidation: any = this.tokenGenerator.verify(token)

            const Id = this.idGenerator.generate()

            if (tokenValidation.type != "COMPRADOR") {
                throw new CustomError(403, "Somente clientes podem realizar uma compra")
            }

            await this.PaymentDatabase.makePaymentCredit(
                new PaymentCredit(
                    Id,
                    idPayment,
                    cardName,
                    cardNumber,
                    cardExpirationDate,
                    cardCvv,

                )
            )
            return "Pagamento com crédito feito com sucesso"

        } catch (error) {
            if (error instanceof Error) {
                throw new CustomError(400, error.message)
            } else {
                throw new CustomError(500, "Erro ao fazer um pagamento")
            }

        }
    }
}

export default new PaymentBusiness(
    new IdGenerator(),
    new TokenGenerator(),
    new PaymentDatabase()
)