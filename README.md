# TypeScript GraphQL Starter

Before start please give some time to these reading material

- [TypeGraphQL field](https://typegraphql.com/docs/types-and-fields.html)
- [TypeORM migration](https://typeorm.io/#/migrations)


### Developer instructions

- After latest pull schema migration required
`npm run build`
`typeorm migration:run`
- Preferred commands for developers
`npm run watch`
- When developer add a new entity and fields then developer have to follow the migration process
`npm run build`
`typeorm migration:generate -n <name of changes>`
`typeorm migration:run`
it'll generate new table and alter column changes
- Developer must need to build his code before push
`npm run build` 
it'll check any type error (main reason for run this command before push ) and build code.

Need more details about this started ? check here [TypeScript graphQL starter ](starter-details.md)