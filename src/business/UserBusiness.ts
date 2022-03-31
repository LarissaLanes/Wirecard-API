import { stringToUserRole } from './../model/UserModel';
import { CustomError } from './../error/CustomError';
import { UserDataBase } from './../data/UserDatabase';
import { TokenGenerator } from './../services/tokenGenerator';
import hashGenerator, { HashGenerator } from './../services/hashGenerator';
import idGenerator, { IdGenerator } from './../services/idGenerator';
import { Request, Response} from 'express';
import { User } from '../model/UserModel';


class UserBusiness{

    constructor(
        private idGenerator: IdGenerator,
        private hashGenerator: HashGenerator,
        private tokenGenerator: TokenGenerator,
        private userDataBase: UserDataBase
    ){

    }

   async signUp(
       name: string,
       email: string,
       cpf: string,
       type: string
   ){
       try{
           if(!name || !email || !cpf || !type){
               throw new CustomError(422, "preencha os campos corretamente")
           }

           const id = this.idGenerator.generate()

        //    const CPF = await this.hashGenerator.hash(cpf)

           await this.userDataBase.createUser(
               new User(id, name, email, cpf, stringToUserRole(type))
           )

           const accessToken = this.tokenGenerator.generate({
               id, 
               type
           });

           return{accessToken};

       }catch(error){

           if(error instanceof Error){
               throw new CustomError(400, error.message)
           }else {
               throw new CustomError(400, "Erro ao cadastrar o usuário")
           }

       }
   }

   async login(req:Request, res:Response){
    try{

    }catch(error){

    }
}


}

export default new UserBusiness(
    new IdGenerator(),
    new HashGenerator(),
    new TokenGenerator(),
    new UserDataBase()
)