import { ByIngredient } from './ByIngredient'
import { Client } from '../Client'

export class ByIngredientEntity {
  constructor(private client: Client) {}

  async list(params: Record<string, any>) {
    return this.client.request({
      path: '/api/v1/by-ingredients',
      method: 'GET',
      params
    })
  }
}
