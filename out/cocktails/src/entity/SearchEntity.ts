import { Search } from './Search'
import { Client } from '../Client'

export class SearchEntity {
  constructor(private client: Client) {}

  async list(params: Record<string, any>) {
    return this.client.request({
      path: '/api/v1/search',
      method: 'GET',
      params
    })
  }
}
