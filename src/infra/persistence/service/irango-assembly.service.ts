import { Injectable } from '@nestjs/common'

import axios from 'axios'

import Pedido from '@/core/domain/entities/pedido'
import IAssemblyService from '@/core/domain/services/iassembly.service'
import { Environment as envs } from '@/infra/web/nestjs/environment'

@Injectable()
export default class IRangoAssemblyService implements IAssemblyService {
  constructor (
  ) {}

  async registerOrder (pedido: Pedido): Promise<void> {
    console.log(`Register order for pedido ${pedido.id} at IRango Assembly Service`)

    try {
      const url = `${envs.SERVICE_IRANGO_ASSEMBLY_API}/v1/pedidos/register`
      await axios.post(url, pedido)
    } catch (error) {
      console.log(`Error: ${error}`)
      console.log(error.response?.data)
    }
  }
}
