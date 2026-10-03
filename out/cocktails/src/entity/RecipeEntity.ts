import { Recipe } from './Recipe'
import { Client } from '../Client'

export class RecipeEntity {
  constructor(private client: Client) {}

  async load(params: Record<string, any>) {
    return this.client.request({
      path: '/api/v1/recipe/{slug}',
      method: 'GET',
      params
    })
  }
}
