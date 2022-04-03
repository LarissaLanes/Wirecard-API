import { USER_ROLES } from "../../../src/model/UserModel";

export class TokenGeneratorMock {

  public generate = (input: AuthenticationData): string => {
    return "token_mock";
  };

  public verify(token: string) {
    return{
        id: "id_mock",
        type: USER_ROLES.VENDEDOR
    }
  }
}

export interface AuthenticationData {
  id: string;
  type: string
}

