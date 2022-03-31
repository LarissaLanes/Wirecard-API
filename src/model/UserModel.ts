import { CustomError } from "../error/CustomError";


export class User{

    constructor(
        private id: string,
        private name: string,
        private email: string,
        private cpf: string,
        private type: USER_ROLES
    ){}

    public getId(): string{
        return this.id;
    }

    public getName(): string{
        return this.name;
    }

    public getEmail(): string{
        return this.email;
    }

    public getCpf(): string{
        return this.cpf;
    }

    public getType(): USER_ROLES{
        return this.type;
    }

}

export enum USER_ROLES{
    VENDEDOR = "VENDEDOR",
    COMPRADOR = "COMPRADOR"
}

export const stringToUserRole = (input: string): USER_ROLES => {
    switch (input) {
       case "COMPRADOR":
          return USER_ROLES.COMPRADOR;
       case "VENDEDOR":
          return USER_ROLES.VENDEDOR;
       default:
          throw new CustomError(422, "Tipo de usuário inválido");
    }
 };
 