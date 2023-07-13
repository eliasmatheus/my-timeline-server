<img src="./public/images/lagomarca-positiva-background.png" alt="remember logo">

# remember - backend

Backend do _remember_, um app voltado para casais que desejam guardar momentos especiais e lembranças de sua história e poder ver tudo isso em uma linha do tempo.

Este projeto de API foi desenvolvido em Node.js para a disciplina de **Desenvolvimento Full Stack Avançado** do programa de pós-graduação em Desenvolvimento Full Stack da [PUC-Rio](https://www.puc-rio.br/index.html).

O objetivo deste projeto é fornecer uma interface de programação de aplicativos para um blog, permitindo que os desenvolvedores criem, leiam, atualizem e excluam conteúdo do _app_ de forma programática.

## Screenshots

<div align="center">
  <img style="width: 100%; float: left;" src="./public/images/screenshot-1.png" alt="My Project GIF">
</div>

<div style="clear: both; margin-bottom: 28px;"></div>

## Design da UI no Figma

Clique [aqui](https://www.figma.com/file/LzmrgQhMM9FRWNr9KKECdP/Remember?type=design&node-id=24%3A9431&mode=design&t=M1w0crDfKkarrZtB-1) para visualizar o design da UI no Figma.

---

## Technologias

- [Node.js](https://nodejs.org/en/)
- [TypeScript](https://www.typescriptlang.org/)
- [fastify](https://www.fastify.io/)
- [Prisma](https://www.prisma.io/)
- [SQLite](https://www.sqlite.org/index.html)
- [Axios](https://axios-http.com/ptbr/docs/intro)
- [Zod](https://zod.dev/)
- [GitHub OAuth](https://docs.github.com/pt/developers/apps/building-oauth-apps/authorizing-oauth-apps)

## Como executar

### Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
[Git](https://git-scm.com), [Node.js](https://nodejs.org/en/) e uma conta no [Github](https://github.com/).
Além disto é bom ter um editor para trabalhar com o código como [VSCode](https://code.visualstudio.com/)

### Rodando a aplicação

```bash
# Clone este repositório
$ git clone https://github.com/eliasmatheus/remember-app-server

# Acesse a pasta do projeto no terminal/cmd
$ cd remember-app-server

# Instale as dependências
$ npm install

# Copie o arquivo de variáveis ambiente .env.example para .env
$ cp .env.example .env
```

Neste momento, você deve preencher as variáveis de ambiente com os valores corretos. Veja a seção [Prenchendo as variáveis de ambiente](#prenchendo-as-variáveis-de-ambiente) para mais detalhes.

Após preencher as variáveis ambiente, rode as migrations do banco de dados e inicie a aplicação:

```bash
# Execute as migrations do banco de dados
$ npx prisma migrate dev

# Execute a aplicação em modo de desenvolvimento
$ npm run dev

# A aplicação inciará na porta:3333 🚀
```

### Prenchendo as variáveis de ambiente

Para que a parte de autenticação da aplicação funcione corretamente é necessário preencher as variáveis `GITHUB_CLIENT_ID` e `GITHUB_CLIENT_SECRET` de acordo com o seu Github OAuth App.

Para conseguir um client id do Github OAuth App, siga as instruções [deste link](https://docs.github.com/pt/apps/oauth-apps/building-oauth-apps/creating-an-oauth-app).

> ⚠️ **Atenção**
>
> O campo `Authorization callback URL` deve ser preenchido com o endereço de autenticação da aplicação (api/auth/callback). Este é o endereço que para o qual o Github irá redirecionar o usuário após a autenticação.
>
> Se o frontend estiver rodando em localhost:3000, a URL deve ser: `http://localhost:3000/api/auth/callback`.

Após criado, seu `Client ID` estará disponível na página do seu OAuth App. Para gerar o seu `Client Secret`, clique no botão `Generate a new client secret`. Copie e cole os dois valores nas respectivas variáveis do arquivo `.env`:

```bash
GITHUB_CLIENT_ID=cole_aqui_o_client_id
GITHUB_CLIENT_SECRET=cole_aqui_o_client_secret
```

A variável `DATABASE_URL` já vem preenchida com o endereço do banco de dados SQLite. Caso queira utilizar outro banco de dados, altere o valor desta variável para o endereço do seu banco de dados.

### Rodando o frontend

Para rodar a interface web, acesse o repositório do [frontend](https://github.com/eliasmatheus/remember-app-web) e siga as instruções.
