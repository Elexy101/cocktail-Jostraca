import { Jostraca, Project, Folder, File, Content, cmp } from 'jostraca'

// --- the model ---
const model = {
  sdk: {
    name: 'cocktails',
    version: '0.0.1',
    description: 'Unofficial TypeScript SDK for the 24cocktails Recipe API'
  },
  entities: [
    {
      name: 'Search',
      path: '/api/v1/search',
      operation: 'list',
      returnType: 'SearchSummary[]'
    },
    {
      name: 'Recipe',
      path: '/api/v1/recipe/{slug}',
      operation: 'load',
      returnType: 'Recipe'
    },
    {
      name: 'ByIngredient',
      path: '/api/v1/by-ingredients',
      operation: 'list',
      returnType: 'ByIngredientResponse'
    },
    {
      name: 'Random',
      path: '/api/v1/random',
      operation: 'load',
      returnType: 'Recipe'
    }
  ]
}

// --- the component ---
const EntityFile = cmp(function EntityFile(props) {
  const { entity } = props

  File({ name: `${entity.name}Entity.ts` }, () => {
    Content(`import { ${entity.name} } from './${entity.name}'\n`)
    Content(`import { Client } from '../Client'\n\n`)
    Content(`export class ${entity.name}Entity {\n`)
    Content(`  constructor(private client: Client) {}\n\n`)
    Content(`  async ${entity.operation}(params: Record<string, any>) {\n`)
    Content(`    return this.client.request({\n`)
    Content(`      path: '${entity.path}',\n`)
    Content(`      method: 'GET',\n`)
    Content(`      params\n`)
    Content(`    })\n`)
    Content(`  }\n`)
    Content(`}\n`)
  })
})

// --- the generator ---
const jostraca = Jostraca({ model })

await jostraca.generate({ folder: './out' }, () => {
  Project({ folder: model.sdk.name }, () => {
    Folder({ name: 'src' }, () => {
      Folder({ name: 'entity' }, () => {
        for (const entity of model.entities) {
          EntityFile({ entity })
        }
      })
    })
  })
})