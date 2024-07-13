
import { When, Then, Given, After, AfterAll, Before, BeforeAll } from '@cucumber/cucumber'
import { faker } from '@faker-js/faker'
import * as assert from 'assert'

import Consumidor from '@/core/domain/entities/consumidor'
import { PedidoStatusEnum } from '@/core/domain/enums/pedido-status.enum'
import { Produto } from '@/infra/persistence/typeorm/entities/produto'
import CreatePedidoRequest from '@/infra/web/nestjs/pedidos/dto/create-pedido.request'

import { Factory } from '@/test/integration/setup/utils/FactoryUtils'

import IntegrationTestSetup, { ITestSetup } from '../../integration/setup/IntegrationTestSetup'

let setup: ITestSetup
let consumidor: Consumidor | undefined
let produtoFactory: Factory<Produto>
let produtos: Produto[]

BeforeAll(async () => {
  setup = await IntegrationTestSetup.getInstance()
  produtoFactory = setup.factory.produtoFactory()
  await setup.db.truncateAll()
  await setup.app.init()
})

Before(async () => {
  produtos = await produtoFactory.createMany(faker.number.int({ min: 1, max: 10 }))
})

AfterAll(async () => {
  setup = await IntegrationTestSetup.getInstance()
  await setup.db.truncateAll()
  await setup.module.close()
  await setup.app.close()
})

After(async () => {
  setup = await IntegrationTestSetup.getInstance()
  await setup.db.truncateAll()
})

const buildRequestBody = (consu?: Consumidor) => {
  const itens = produtos
    .map((produto: Produto) => {
      const ingredientesCount = faker.number.int({ min: 0, max: produto.ingredientes.length })
      const ingredientesRemovidos = faker.helpers.arrayElements(produto.ingredientes, ingredientesCount)
        .map((ingrediente) => ingrediente.id)
      return {
        produtoId: produto.id,
        ingredientesRemovidos
      }
    })

  const requestBody: CreatePedidoRequest = {
    consumidorId: consu?.id,
    itens
  }

  return requestBody
}

let response: any

Given('que sou consumidor identificado', async function () {
  consumidor = await setup.factory.consumidor()
})

Given('que sou consumidor não identificado', function () {
  consumidor = undefined
})

When('criar um pedido', async function () {
  const requestBody = buildRequestBody(consumidor)

  response = await setup.server
    .request('/v1/pedidos')
    .post(requestBody)
})

Then('o pedido é criado com sucesso', function () {
  assert.equal(response.status, 201)

  assert.equal(response.body.data.status, PedidoStatusEnum.PAGAMENTO_PENDENTE)
})
