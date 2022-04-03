import { User, USER_ROLES } from './../../../src/model/UserModel';


export const userMockVENDEDOR = new User (
    "id_mockVENDEDOR",
    "user1",
    "user1@gmail.com",
    "111.111.111-11",
    USER_ROLES.VENDEDOR
)

export const userMockCOMPRADOR = new User (
    "id_mockCOMPRADOR",
    "user2",
    "user2@gmail.com",
    "222.222.222-22",
    USER_ROLES.COMPRADOR
)