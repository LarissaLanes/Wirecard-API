import { User } from "../../../src/model/UserModel";
import { userMockCOMPRADOR, userMockVENDEDOR } from "./userMock";

export class UserDataBaseMock {

    async createUser(user: User): Promise<void>{
    }


     async getUserByEmail(email: string): Promise<User | undefined> {
       if(email === "user1@gmail.com"){
           return userMockVENDEDOR
       }else if( email === "user2@gmail.com"){
           return userMockCOMPRADOR
       }else{
           undefined
       }
     }

     async getUserByCpf(cpf: string): Promise<User | undefined>{
        if(cpf === '111.111.111-11'){
            return userMockVENDEDOR
        }else if (cpf === '222.222.222-22'){
            return userMockCOMPRADOR
        }else{
            undefined
        }
     }



    
}