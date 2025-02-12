# Backend

## Arquitetura

O principal motivo na escolha da arquitetura foi selecionar uma moderna, organizada e que facilite os testes unitários.  
Tendo isso em vista foi escolhida uma arquitetura baseada em camadas (**Layered Architecture**) onde as funções de cada parte do código são muito bem definidas, sendo elas Controllers, Services e Repositories.

A estrutura das pastas se organiza da seguinte forma dentro da `src`:

- `constants` para salvar constantes como chaves secretas.
- `database` para configurações do banco de dados.
- `decorators` para salvar decorators customizados.
- `dtos` para tipagens
- `repositories` para interagir diretamente com o ORM.
- `utils` para salvar funções utilitárias que podem ser utilizadas em todo o projeto.
- `validators` para salvar funções de validação customizadas.
- O restante das pastas separam as funcionalidades em módulos.

## Bibliotecas

- **Nest**: moderno framework para projetos em Nodejs que facilita vários tipos de arquitetura, já que tudo está separado em módulos, e com sua Injeção de Dependências.
  - Criando o projeto com sua CLI já inclui JWT para tokens de autenticação.
- **Prisma**: ORM para gerenciamento das funções do banco de dados e flexível caso precise trocar o tipo do banco.
- **Bcrypt**: para encriptação de senhas.
- **Class validator**: facilitar tratamento de erros em relação a validação dos dados.
- **Jest**: para realizar os testes unitários.
- **Typescript**: para garantir tipagem durante o desenvolvimento facilitando-o.
- **Eslint e Prettier**: para formatação do código e highlight de alguns erros.

## O que pode melhorar

- Adicionaria testes End to End para garantir as rotas da API como um todo.
- Adicionaria as sessões de usuário para renovação do token de autenticação.

## Falta entregar

- A rota de listagem de estudantes falta funcionalidade de pesquisa para filtrar por qualquer um dos campos do estudante.

# Frontend

## Arquitetura

A arquitetura escolhida é baseada em componentes, ou seja, a aplicação é dividida em pequenas partes reutilizáveis.  
Além de estar um pouco otimizada pelo `Vue Router` onde as rotas e alguns imports são feitos de forma automática, sem a necessidade de serem declaradas.

A estrutura das pastas se organiza da seguinte forma dentro da `src`:

- `assets` para arquivos estáticos como imagens e fontes.
- `components` para salvar componentes reutilizáveis.
- `layouts` para definir uma estrutura padrão de interface que também pode ser reutilizada.
- `pages` para definir as páginas da aplicação, assim como suas rotas dependendo da estrutura das pastas.
  - Exemplo: se na pasta tiver `pages/user/create/index.vue`, esta página será acessível pela rota `/user/create` (assim como o Next faz na sua arquitetura)
- `plugins` para configuração de qualquer biblioteca externa.
- `router` para configuração das rotas.
- `services` para serviços que podem ser reutilizados.
- `stores` para salvar os estados globais reativos criados pelo Pinia.
- `styles` para estilização.
- `utils` para salvar funções utilitárias que podem ser utilizadas em todo o projeto.

## Bibliotecas

- **Axios**: para requisições HTTP.
- **Eslint**: para formatação do código e highlight de alguns erros.
- **Pinia**: para gerenciamento de estados globais reativos.
- **Typescript**: para garantir tipagem durante o desenvolvimento facilitando-o.
- **Vue Router**: para facilitar gerenciamento das rotas.

## O que pode melhorar

- Adicionar testes unitários e de integração (com Jest e Cypress por exemplo).
- Adicionar propriedades de carregamento aos componentes.
- Tipagem dos erros recebidos da API.
- Gerenciamento de usuário.
- UI/UX em geral.
- Máscaras para o campo de CPF.

## Falta entregar

- Pesquisa de estudantes por qualquer campo.
- Ordenação da listagem dos estudanter por qualquer campo.
