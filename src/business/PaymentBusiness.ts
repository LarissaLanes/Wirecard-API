import { stringToMethodRole } from './../model/PaymentModel';
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
        cardName: string,
        cardNumber: string,
        cardExpirationDate: Date,
        cardCvv: number,
        token: string
    ){
        try{
            if(!amount || !type || !idProduct){
                throw new CustomError(422, "preencha todos os dados")
            }

            if(!token){
                throw new Error("por favor insira um token")
            };

            // if(cardCvv.lenght !== 3){
            //     throw new CustomError(422, "Cvv do cartão deve conter 3 digitos")

            // }

            if(amount >= 5){
                throw new CustomError(422, "Você só pode comprar o maximo de 5 produtos")
            }
            const tokenValidation : any = this.tokenGenerator.verify(token)

            const Id = this.idGenerator.generate()

            if(tokenValidation.type != "COMPRADOR"){
                throw new Error("Somente clientes podem realizar uma compra")
            }

            const boleto = "9823781752939kfmsam2898-027872u9dok--qmdj2ijdwn"

            if(type === "CREDITO"){
                if(!cardName || !cardNumber || !cardExpirationDate || !cardCvv){
                    throw new CustomError(422, "Agora os dados do cartão são obrigatórios")
                }
            }if(type === "DEBITO"){
                return boleto

            }

            await this.PaymentDatabase.makePayment(
                new Payment(
                    Id, 
                    amount, 
                    stringToMethodRole(type), 
                    idProduct, 
                    cardName, 
                    cardNumber,
                    cardExpirationDate,
                    cardCvv )
            )

            return "Pagamento feito com sucesso"

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