import {Request, Response} from "express"
import UserBusiness from "../business/UserBusiness"


export class UserController{


    async signUp(req: Request, res: Response){
        try{
            const {name, email, cpf, type} = req.body
            const result = await UserBusiness.signUp(
                name, 
                email,
                cpf,
                type
            );

            res.status(201).send(result)

        }catch(error){
            if(error instanceof Error){
                res.status(403).send(error.message)
            }else{
                res.send({message : "Algo deu errado no cadastro de usuário"})
            }

        }
    }


    async login(req: Request, res: Response){
        try{

        }catch(error){

        }
    }
    
}

export default new UserController()