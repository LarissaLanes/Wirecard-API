import { InputId, PaymentCredit } from './../model/CreditModel';
import { stringToMethodRole} from './../model/PaymentModel';
import { CustomError } from './../error/CustomError';
import { PaymentDatabase } from './../data/PaymentDatabase';
import { TokenGenerator } from './../services/tokenGenerator';
import { IdGenerator } from './../services/idGenerator';
import { Payment } from '../model/PaymentModel';


class PaymentBusiness{

    constructor(
        private idGenerator: IdGenerator,
        private tokenGenerator: TokenGenerator,
        private PaymentDatabase: PaymentDatabase
    ){}

    async methodPayment(
        amount: number,
        type: string,
        idProduct: string,
        token: string
    ){
        try{
            if(!amount || !type || !idProduct ){
                throw new CustomError(422, "preencha todos os dados")
            }

            if(!token){
                throw new Error("por favor insira um token")
            };

            // if(cardCvv.lenght !== 3){
            //     throw new CustomError(422, "Cvv do cartão deve conter 3 digitos")

            // }

            if(amount > 5){
                throw new CustomError(422, "Você só pode comprar o maximo de 5 produtos")
            }
            const tokenValidation : any = this.tokenGenerator.verify(token)

            const Id = this.idGenerator.generate()

            if(tokenValidation.type != "COMPRADOR"){
                throw new Error("Somente clientes podem realizar uma compra")
            }

            const boleto = "9823781752939kfmsam2898-027872u9dok--qmdj2ijdwn"
    
        const paymentCreatedAt : any = new Date()
            


            await this.PaymentDatabase.makePayment(
                new Payment(
                    Id, 
                    amount, 
                    stringToMethodRole(type), 
                    idProduct,
                    paymentCreatedAt
                     )
            )

            if(type === "CREDITO"){
                return "PREENCHA OS DADOS DO SEU CARTÃO DE CRÉDITO"
            }if(type === "BOLETO"){
                return (boleto)

            }

            return "Pagamento no boleto feito com sucesso"

        }catch(error){
            if (error instanceof Error) {
                throw new CustomError(400, error.message)
        } else {
            throw new CustomError(400, "Erro ao fazer um pagamento")
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
    ){
        try{

            if(!idPayment){
                throw new CustomError(422, "id do produto incorreto")
            }

            if(!cardName ){
                throw new CustomError(422, "nome incorreto")
            }

            if(!cardNumber ){
                throw new CustomError(422, "numero do cartão incorreto")
            }

            if(!cardExpirationDate ){
                throw new CustomError(422, "Validade incorreta")
            }

            if(!cardCvv ){
                throw new CustomError(422, "CVV incorreto")
            }


            if(cardCvv.length != 3){
                return "Cvv deve conter 3 digitos"
            }

            if(cardNumber.length != 19){
                return "digite o numero do cartão corretamente"
            }
            
            
            



            if(!token){
                throw new Error("por favor insira um token")
            };

            const tokenValidation : any = this.tokenGenerator.verify(token)

            const Id = this.idGenerator.generate()

            if(tokenValidation.type != "COMPRADOR"){
                throw new Error("Somente clientes podem realizar uma compra")
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


        }catch(error){
            if (error instanceof Error) {
                throw new CustomError(400, error.message)
        } else {
            throw new CustomError(400, "Erro ao fazer um pagamento")
        }

        }
    }
}

export default new PaymentBusiness(
    new IdGenerator(),
    new TokenGenerator(),
    new PaymentDatabase()
)