import { PaymentInput } from './../model/PaymentModel';
import { Request, Response } from "express";
import PaymentBusiness from '../business/PaymentBusiness';

export class PaymentController{

    async methodPayment(req: Request, res: Response): Promise<void>{
        try{
            const {amount, type, idProduct} = req.body

            const token = req.headers.authorization as string

            const result = await PaymentBusiness.methodPayment(
                amount,
                type,
                idProduct,
                token
            )

            res.status(200).send({result})

     
        }catch(error){
            if (error instanceof Error) {
                res.status(400).send(error.message);
            } else {
                res.send({ message: "Algo deu errado ao fazer um pagamento" })
            }

        }
    }
}

export default new PaymentController;