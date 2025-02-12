# Fullstack Challenge A+ Educação (Backend)

Api desenvolvida em Nodejs com o framework Nest e Typescript.

## Configuração do projeto

Para instalar as dependências.

```bash
$ yarn install
```

Configura o arquivo de variáveis de ambiente (.env).

```
DATABASE_URL=postgres_url_connection
JWT_SECRET=secret_example
```

Para configurar o banco de dados, criando todas as tabelas e criado o primeiro usuário administrador.

```bash
$ yarn migrations
$ yarn seeders
```

## Como rodar o projeto

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn build
$ yarn run start:prod
```

## Rodar os testes

```bash
# unit tests
$ yarn run test
```
