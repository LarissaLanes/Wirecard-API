import { Request, Response } from "express"
import UserBusiness from "../business/UserBusiness"


export class UserController {


    async signUp(req: Request, res: Response) {
        try {
            const { name, email, cpf, type } = req.body
            await UserBusiness.signUp(
                name,
                email,
                cpf,
                type
            );

            res.status(202).send("Usuário cadastrado com sucesso!")

        } catch (error) {
            if (error instanceof Error) {
                res.status(403).send(error.message)
            } else {
                res.send({ message: "Algo deu errado no cadastro de usuário" })
            }

        }
    }


    async login(req: Request, res: Response) {
        try {
            const { email, cpf } = req.body
            const result = await UserBusiness.login(email, cpf)

            res.status(202).send(result)

        } catch (error) {
            if (error instanceof Error) {
                res.status(403).send(error.message)
            } else {
                res.send({ message: "Acesso foi negado, algo deu errado" })
            }

        }
    }


}

export default new UserController()