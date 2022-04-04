# Wirecard-API

### Projeto em node.js com typescript fazendo uma API com solicitações de compras
#

[Documentação](https://documenter.getpostman.com/view/18390054/UVysxbQ1)
[Deploy](https://wirecard-app.herokuapp.com/)

Clone o repositorio em sua maquina usando o comando git clone
em seguida use npm i para puxar os arquivos.
adicione os dados do seu banco de dados em um arquivo env
use o arquivo request.rest para popular o seu banco de dados e fazer as requições

### ENDPOINTS:

* signup
* login
* createProducts
* paymentTicket
* paymentCredit
* getProductById

### TESTES: 

USER
* Nome vazio
* Email inválido
* CPF incorreto

PRODUCT
* Falta dados

PAYMENT
* Error por falta do id do produto
