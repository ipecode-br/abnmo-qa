# Testes Automatizados - FrontEnd - ABNMO

Automação dos testes regressivos do sistema Viver Bem da ABNMO.


### Tecnologias:
 - Cypress ^15.3.0
 - Node ^24.6.1
 - Java (precisa ter o java instalado na maquina para rodar o relatório)

### Limguagem:
 - TypeScript

### Ambiente:
 - Os testes são executados olhando para o ambiente de homologação.
    https://homolog.abnmo.ipecode.com.br

## Instalação:
Após baixar o projeto do GitHub, abra o terminal e execute o comando abaixo
> npm install

## Execução:
Para executar o projeto via terminal, execute o comando abaixo:
> npm run test:run

Para executar o projeto abrindo o cypress, execute o comando abaixo:
> npm run test:open

## Relatório:
Para gerar o relatório do Allure execute o comando abaixo
> npm run report:allure

Para abrir o relatório no navegador
> npm run report:open