import { User } from "../model/UserModel";
import BaseDataBase, { table_user } from "./BaseDatabase";


export class UserDataBase extends BaseDataBase{

    async createUser(user: User): Promise<void>{
        try{
            await BaseDataBase.connection.raw(`
            INSERT INTO ${table_user} (id, name, email, cpf, type)
             VALUES (
                '${user.getId()}',
                '${user.getName()}',
                '${user.getEmail()}',
                '${user.getCpf()}',
                '${user.getType()}'
            )
            `)

        }catch(error){
            if(error instanceof Error){
                throw new Error(error.message)
            }
        }
    }
}