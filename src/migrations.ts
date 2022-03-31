import { table_user, table_product, table_payment } from './data/BaseDatabase';
import dotenv from 'dotenv';
import knex from "knex";


dotenv.config();

export const connection = knex({
    client: 'mysql',
    connection: {
        host: process.env.DB_HOST,
          user: process.env.DB_USER,
          password: process.env.DB_PASSWORD,
          database: process.env.DB_SCHEMA,
          port: 3306,
          multipleStatements: true,
    },
});

    connection.raw(`
        CREATE TABLE IF NOT EXISTS ${table_user}(
            id VARCHAR(255) PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL UNIQUE,
            cpf VARCHAR(255) NOT NULL UNIQUE,
            type VARCHAR(255) NOT NULL DEFAULT "COMPRADOR"
        );  

       
    `).then(() => console.log(
        'Tabelas criadas com sucesso!'
    )).catch(error => 
        console.log('Algo deu errado', error.message)
        ).finally(() => {
            connection.destroy()
        })


           // CREATE TABLE IF NOT EXISTS ${table_payment}(
        //     id VARCHAR(255) PRIMARY KEY,
        //     amount INT NOT NULL,
        //     type ENUM("BOLETO", "CREDITO") DEFAULT "BOLETO"
        // );

        // CREATE TABLE IF NOT EXISTS ${table_product}(
        //     id VARCHAR(255) PRIMARY KEY,
        //     seller VARCHAR(255) NOT NULL,
        //     price VARCHAR(255) NOT NULL,
        //     description VARCHAR(255)
        // );