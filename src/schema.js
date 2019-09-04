//** Configuração de schemas do graphQL */x
const { buildSchema } = require('graphql')
const fs = require('fs')
const path = require('path')

const schemaFile = path.join(__dirname, '/schema.graphql')

let schema = fs.readFileSync(schemaFile).toString()

module.exports = buildSchema(schema)
