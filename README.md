# Projeto de Extração de Dados de Faturas de Energia Elétrica

Este projeto foi desenvolvido como parte do teste de conhecimento para a vaga de Desenvolvedor Full Stack Pleno na empresa Lumi. O objetivo do projeto é extrair os dados relevantes de faturas de energia elétrica, organizar esses dados em um banco de dados PostgreSQL e apresentá-los em uma aplicação web usando React como frontend e Node.js como backend.

## Versões dos Softwares Utilizados
  - Node.js: v18.17.0
  - Yarn: 1.22.19
  - npm: v9.8.1
  - Docker: 20.10.17
  - Docker Compose: 1.25.0

## Como Utilizar o Projeto
Siga os passos abaixo para utilizar o projeto:

1. Crie o banco de dados com o nome `energy` ou execute o comando `docker-compose up -d` na pasta raiz do projeto.
   - Obs: No desenvolvimento, foi utilizado o PostgreSQL.

2. Altere o nome do arquivo `.env.example` para `.env` e coloque os seguintes dados:
   - `API_PORT`: Porta na qual a API rodará.
   - `DB_HOST`: Host utilizado para acessar o banco de dados (caso utilize o Docker Compose, será "localhost").
   - `DB_DATABASE`: Nome do banco de dados (caso utilize o Docker Compose, será "social").
   - `DB_USER`: Usuário ADM que terá acesso ao banco (caso utilize o Docker Compose, será "root").
   - `DB_PASSWORD`: Senha do usuário (caso utilize o Docker Compose, será "docker").

3. Rode o seguinte comando na pasta raiz do projeto para baixar as dependências das bibliotecas (node_modules):
   - ```yarn```

4. Rode o seguinte comando na pasta raiz do projeto para criar a tabela no banco de dados:
   - ```yarn typeorm migration:run -d src/database/typeorm/index.ts```

5. Rode o seguinte comando na pasta raiz do projeto para iniciar o backend:
   - ```yarn dev:server```
## Testes
O projeto inclui testes unitários e end-to-end para garantir o correto funcionamento e a qualidade do código. Para executar os testes, utilize o seguinte comando:    
   - ```yarn test```

## Telas da Aplicação
As telas da aplicação foram elaboradas no Figma e podem ser visualizadas nos seguintes links:
- [Dashboard](https://www.figma.com/proto/likZ1nDep21Bes7UDiCKvK/Untitled?type=design&node-id=50-921&t=GQ1TdwxyusHyzuWG-1&scaling=contain&page-id=0%3A1&starting-point-node-id=50%3A921&mode=design)
- [Histórico de Faturas](https://www.figma.com/proto/likZ1nDep21Bes7UDiCKvK/Untitled?type=design&node-id=3-13&t=JsO7cXfvEgh2JEzz-1&scaling=contain&page-id=0%3A1&starting-point-node-id=50%3A921&mode=design)

# Estrutura do Projeto

O projeto está organizado seguindo uma estrutura bem definida para facilitar o desenvolvimento e a manutenção. Abaixo, será explicada a estrutura do projeto:

## src: Página Raiz do Projeto

Dentro da pasta "src", temos os seguintes diretórios:

### assets:
Este diretório contém arquivos temporários que não estão diretamente relacionados ao backend. Normalmente, aqui ficariam arquivos de imagem, fontes ou outros recursos utilizados pela aplicação.

### configs:
Neste diretório, encontram-se funções e variáveis de configuração da API. Aqui você pode definir as configurações do servidor, como portas, chaves de API, configurações de autenticação, entre outras.

### container:
A pasta "container" utiliza o `tsyringe`, que é um injetor de dependências, para realizar a injeção de dependências na aplicação. A injeção de dependências é uma técnica que permite fornecer as dependências de um objeto de forma externa, tornando o código mais modular e facilitando a manutenção e os testes.

### e2e:
O diretório "e2e" contém testes de integração (end-to-end) da aplicação. Os testes de integração são usados para verificar a interação entre os diferentes componentes da aplicação e garantir que tudo esteja funcionando corretamente em conjunto.

### middlewares:
Os middlewares são funções que podem ser executadas antes que as rotas da aplicação sejam processadas. Neste diretório, ficam os middlewares utilizados pelas rotas para executar tarefas comuns, como autenticação, validação de dados ou registro de logs.

### routes:
Neste diretório, estão definidas as rotas da aplicação. As rotas são responsáveis por mapear as URLs para os controladores apropriados, de acordo com a solicitação do cliente.

### utils:
A pasta "utils" contém funções auxiliares que podem ser utilizadas em diferentes partes da aplicação. Essas funções normalmente não têm uma relação direta com a lógica de negócio, mas fornecem utilidades que podem ser reutilizadas em vários lugares.

### modules:
O diretório "modules" contém a lógica da aplicação, seguindo os princípios SOLID. Os princípios SOLID são um conjunto de princípios de design de software que buscam criar um código mais robusto, fácil de manter e escalável. Cada módulo dentro desta pasta representa uma entidade ou recurso específico da aplicação.

Dentro de cada pasta de módulo, temos a seguinte estrutura:

  - Controllers:
  Nesta pasta, estão os controladores da aplicação, que são responsáveis por receber as requisições HTTP, processá-las e retornar as respostas apropriadas. Os controladores interagem com os casos de uso (use cases) para executar as operações solicitadas pelo cliente.

  - DTOs (Data Transfer Objects):
  Os DTOs são objetos que transportam dados entre a camada de serviço (Use Case) e a camada de persistência (Repository). Eles são usados para evitar que entidades específicas do domínio sejam expostas diretamente na API.

  - Entities:
  As entidades representam objetos de negócio da aplicação. Elas encapsulam a lógica e o comportamento das regras de negócio.

  - Repository:
  O diretório "Repository" contém a implementação da camada de persistência da aplicação. Aqui estão os métodos para interagir com o banco de dados, realizar consultas e operações de CRUD nas entidades.

  - UseCase:
  Os casos de uso representam as operações ou funcionalidades da aplicação. Eles contêm a lógica de negócio e utilizam as entidades, os repositórios e outros componentes da aplicação para executar as operações solicitadas pelos controladores.

## Considerações Finais
A estrutura do projeto foi planejada para facilitar a organização do código, tornando-o mais legível, modular e fácil de manter. Ao seguir os princípios SOLID, buscamos criar uma aplicação escalável e de alta qualidade.

Caso você tenha alguma dúvida sobre a estrutura do projeto ou precise de mais informações, fique à vontade para entrar em contato. Agradeço a oportunidade de participar do teste e espero que essa explicação sobre a estrutura do projeto tenha sido útil.


  
