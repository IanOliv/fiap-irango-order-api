# iRango Order API
![typescript](https://shields.io/badge/TypeScript-3178C6?logo=TypeScript&logoColor=FFF&style=flat-square)
![Node 20.10](https://shields.io/badge/Node-20.10.0-339933?logo=Node.js&logoColor=FFF&style=flat-square)
![nestjs](https://shields.io/badge/NestJS-E0234E?logo=NestJS&logoColor=FFF&style=flat-square)
![mysql](https://shields.io/badge/MySQL-4479A1?logo=MySQL&logoColor=FFF&style=flat-square)
![redis](https://shields.io/badge/Redis-DC382D?logo=Redis&logoColor=FFF&style=flat-square)
![docker](https://shields.io/badge/Docker-2496ED?logo=Docker&logoColor=FFF&style=flat-square)
![swagger](https://shields.io/badge/Swagger-85EA2D?logo=Swagger&logoColor=FFF&style=flat-square)
![make](https://shields.io/badge/Make-00CC00?logo=Make&logoColor=FFF&style=flat-square)
![jest](https://shields.io/badge/Jest-C21325?logo=Jest&logoColor=FFF&style=flat-square)
![eslint](https://shields.io/badge/ESLint-4B32C3?logo=ESLint&logoColor=FFF&style=flat-square)
![editorconfig](https://shields.io/badge/EditorConfig-000000?logo=EditorConfig&logoColor=FFF&style=flat-square)
![typeorm](https://shields.io/badge/TypeORM-F37626?logo=TypeORM&logoColor=FFF&style=flat-square)
[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=IanOliv_fiap-irango-order-api&metric=code_smells)](https://sonarcloud.io/summary/new_code?id=IanOliv_fiap-irango-order-api)
[![Duplicated Lines (%)](https://sonarcloud.io/api/project_badges/measure?project=IanOliv_fiap-irango-order-api&metric=duplicated_lines_density)](https://sonarcloud.io/summary/new_code?id=IanOliv_fiap-irango-order-api)
[![Lines of Code](https://sonarcloud.io/api/project_badges/measure?project=IanOliv_fiap-irango-order-api&metric=ncloc)](https://sonarcloud.io/summary/new_code?id=IanOliv_fiap-irango-order-api)
[![Reliability Rating](https://sonarcloud.io/api/project_badges/measure?project=IanOliv_fiap-irango-order-api&metric=reliability_rating)](https://sonarcloud.io/summary/new_code?id=IanOliv_fiap-irango-order-api)
[![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=IanOliv_fiap-irango-order-api&metric=security_rating)](https://sonarcloud.io/summary/new_code?id=IanOliv_fiap-irango-order-api)
[![Technical Debt](https://sonarcloud.io/api/project_badges/measure?project=IanOliv_fiap-irango-order-api&metric=sqale_index)](https://sonarcloud.io/summary/new_code?id=IanOliv_fiap-irango-order-api)
[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=IanOliv_fiap-irango-order-api&metric=sqale_rating)](https://sonarcloud.io/summary/new_code?id=IanOliv_fiap-irango-order-api)
[![Vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=IanOliv_fiap-irango-order-api&metric=vulnerabilities)](https://sonarcloud.io/summary/new_code?id=IanOliv_fiap-irango-order-api)


This project is a part of a fast food self-service system, proposed as a Tech Challenge for the Software Architecture Postgraduate Course at FIAP.

For this project, we utilized the [TypeScript](https://www.typescriptlang.org/) programming language with [Node.js](https://nodejs.org/) and the [Nest.js](https://nestjs.com/) framework. The database management includes [MySQL 5.7](https://www.mysql.com/) to handle information related to Consumidor, Produto, and Pedido. Additionally, an in-memory [Redis](https://redis.io/) database is employed for caching.

To build the API documentation, we've used [Swagger](https://swagger.io/) tool integrated with Nest.js, accessible through the endpoint: {irango_order_host}/docs

## Workspace Dependencies
- [Node 20.10](https://nodejs.org/)
- [Docker](https://www.docker.com/get-started/)
- Make
  - [Windows](https://gnuwin32.sourceforge.net/packages/make.htm)
  - Linux
  ```bash
  sudo apt update
  sudo apt install make
  ```

## Project Dependencies
Install project dependencies with:
```bash
npm run install
```

* Create MySQL and Redis databases or start [fiap-irango-database/docker-compose.yml](https://github.com/FIAP-Tech-Challenge-53/fiap-irango-database/blob/main/docker-compose.yml) file.

* Start [fiap-irango-payment-api](https://github.com/FIAP-Tech-Challenge-53/fiap-irango-payment-api) service. It can be run after fiap-irango-order-api starts.

* Start [fiap-irango-cook-api](https://github.com/FIAP-Tech-Challenge-53/fiap-irango-cook-api) service. It can be run after fiap-irango-order-api starts.

## Start Project using Docker
Configure all docker containers and volumes and start the application
```bash
make setup

# or try without make

docker network create -d bridge local-network
cp .env.example .env
cp .env.local.test.example .env.test
docker compose build --progress=plain
docker compose up
docker compose exec -it irango-order-api npm run migration:run
docker compose exec -it irango-order-api npm run seed:run
```

## Start project using npm
Watch mode:
```bash
npm run start:dev
```

Compiled mode:
```bash
npm run build
npm run start
```

Migrations and Seeds:
```bash
npm run migration:run
npm run seed:run
```

## How to Use
We developed a seed to populate database with some products and one Consumidor with CPF `123.456.789-00`. You can use it or create a new Consumidor.

## Endpoints
We developed few endpoints which can be found in [consumidores.controller.ts](./src/adapter/driver/nestjs/consumidores/consumidores.controller.ts), [produtos.controller.ts](./src/adapter/driver/nestjs/produtos/produtos.controller.ts) and [pedidos.controller.ts](./src/adapter/driver/nestjs/pedidos/pedidos.controller.ts) files

## Business Requirements:
1. Cadastro do Cliente
> POST {irango_order_host}/v1/consumidores
2. Identificação do Cliente via CPF
> GET {irango_order_host}/v1/consumidores/cpf
3. Criar, editar e remover de produto
> POST {irango_order_host}/v1/produtos

> PUT {irango_order_host}/v1/produtos/:id

> DELETE {irango_order_host}/v1/produtos/:id
4. Buscar produtos por categoria
> GET {irango_order_host}/v1/produtos/categorias/:termo
5. Checkout
> POST {irango_order_host}/v1/pedidos
6. Verificar status do Pedido
> GET {irango_order_host}/v1/pedidos/:id
7. Atualizar status do pedido
> PUT {irango_order_host}/v1/produtos/:id
8. Listar os pedidos
> GET {irango_order_host}/v1/pedidos

## Automated Tests
### Unit Tests
```bash
npm run test:unit
```

### Test Coverage
```bash
npm run test:coverage
```

### Integration Tests
```bash
npm run test:integration
```

### BDD Tests
```bash
npm run test:bdd:local
```

<img src="./docs/test_suite.png" alt="Test Suite Coverage" width="900" />


## Make commands
### Using Docker
- Setup Project: `make setup`. This command will create docker network, containers and volumes. It will also start the project and show its logs.
- Start Project: `make up`
- Stop Projects: `make down`
- Show logs: `make logs`
- Add Migration: `make migration.generate name=MigrationName`
- Run Migrations: `make migration.run`
- Add Seed: `make seed.generate name=SeedName`
- Run Seeds: `make seed.run`
- Access container bash: `make bash`
- Access Redis container: `make redis`
