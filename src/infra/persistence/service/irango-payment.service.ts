import { Injectable } from '@nestjs/common'

import axios from 'axios'

import Pedido from '@/core/domain/entities/pedido'
import IPaymentService from '@/core/domain/services/ipayment.service'
import { Environment as envs } from '@/infra/web/nestjs/environment'

@Injectable()
export default class IRangoPaymentService implements IPaymentService {
  constructor (
  ) {}

  async registerOrder (pedido: Pedido): Promise<string> {
    console.log(`Register order for pedido ${pedido.id} at IRango Payment Service`)

    const url = `${envs.SERVICE_IRANGO_PAYMENT_API}/v1/pedidos/register`
    try {
      const response = await axios.post(url, pedido)

      const pagamentoId = response.data.data.pagamentoId
      console.log(`Pagamento ID: ${pagamentoId}`)

      return pagamentoId
    } catch (error) {
      console.log(`Error: ${error}`)
      console.log(error.response?.data)
      return 'null'
    }
  }
}
