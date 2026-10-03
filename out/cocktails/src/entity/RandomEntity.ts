import { Random } from './Random'
import { Client } from '../Client'

export class RandomEntity {
  constructor(private client: Client) {}

  async load(params: Record<string, any>) {
    return this.client.request({
      path: '/api/v1/random',
      method: 'GET',
      params
    })
  }
}
