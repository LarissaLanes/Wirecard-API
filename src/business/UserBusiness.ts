import { stringToUserRole, USER_ROLES } from './../model/UserModel';
import { CustomError } from './../error/CustomError';
import { UserDataBase } from './../data/UserDatabase';
import { TokenGenerator } from './../services/tokenGenerator';
import hashGenerator, { HashGenerator } from './../services/hashGenerator';
import idGenerator, { IdGenerator } from './../services/idGenerator';
import { Request, Response } from 'express';
import { User } from '../model/UserModel';
import { type } from 'os';


class UserBusiness {

    constructor(
        private idGenerator: IdGenerator,
        private hashGenerator: HashGenerator,
        private tokenGenerator: TokenGenerator,
        private userDataBase: UserDataBase
    ) {

    }

    async signUp(
        name: string,
        email: string,
        cpf: string,
        type: string
    ) {
        try {
            if (!name || !email || !cpf || !type) {
                throw new CustomError(422, "preencha os campos corretamente")
            }

            const id = this.idGenerator.generate()

            //    const CPF = await this.hashGenerator.hash(cpf)
            if (email.indexOf("@") === -1) {
                throw new CustomError(422, "Email invalido ou já cadastrado tente novamente")
            }

            if (cpf.length > 14) {
                throw new CustomError(422, "cpf incorreto")
            }

            const cpfConsulting: User | undefined = await this.userDataBase.getUserByCpf(cpf);

            if (cpfConsulting) {
                const cpf = cpfConsulting.getCpf()
                if (cpf === cpf) {
                    throw new Error("CPF JÁ CADASTRADO")
                }
            }

            await this.userDataBase.createUser(
                new User(id, name, email, cpf, stringToUserRole(type))
            )

            const accessToken = this.tokenGenerator.generate({
                id,
                type
            });

            return { accessToken };

        } catch (error) {

            if (error instanceof Error) {
                throw new CustomError(400, error.message)
            } else {
                throw new CustomError(400, "Erro ao cadastrar o usuário")
            }

        }
    }

    async login(email: string, cpf: string) {

        try {
            if (!email || !cpf) {
                throw new CustomError(403, "Seu acesso foi negado ,pode haver algum dado incorreto")
            }
            const user: any = await this.userDataBase.getUserByEmail(email)

            if (!user) {
                throw new CustomError(402, "email ou cpf incorreto")
            }

            if (cpf !== user.getCpf()) {
                throw new CustomError(401, "essse cpf não corresponde a sua conta");
            }

            const accessToken = this.tokenGenerator.generate({
                id: user.getId(),
                type: user.getType()
            })

            return { accessToken }

        } catch (error) {
            if (error instanceof Error) {
                throw new CustomError(400, error.message)
            } else {
                throw new CustomError(403, "Erro ao encontrar o usuário")
            }

        }
    }
    


}

export default new UserBusiness(
    new IdGenerator(),
    new HashGenerator(),
    new TokenGenerator(),
    new UserDataBase()
)