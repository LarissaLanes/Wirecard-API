import { User } from "../model/UserModel";
import BaseDataBase, { table_user } from "./BaseDatabase";


export class UserDataBase extends BaseDataBase{

    private toModel(dbModel?: any): User | undefined {
        return (
           dbModel &&
           new User(
              dbModel.id,
              dbModel.name,
              dbModel.email,
              dbModel.cpf,
              dbModel.type
           )
        );
     }
  

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


     async getUserByEmail(email: string): Promise<User | undefined> {
        try {
           const result = await BaseDataBase.connection.raw(`
              SELECT * FROM ${table_user} WHERE email = '${email}'
           `);
           return this.toModel(result[0][0]);
        } catch (error) {
           if (error instanceof Error) {
              throw new Error(error.message) 
            }
        }
     }

     async getUserByCpf(cpf: string): Promise<User | undefined>{
         try{
             const result = await BaseDataBase.connection.raw(`
                SELECT * FROM ${table_user} WHERE cpf = '${cpf}'
             `)

             return this.toModel(result[0][0])

         }catch(error){
            if (error instanceof Error) {
                throw new Error(error.message) 
              }
         }
     }



    
}