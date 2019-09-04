const graphqlHttp = require('express-graphql')
const express = require('express')
const bodyParser = require('body-parser')
const buildSchema = require('./src/schema.js')
const rootValue = require('./src/resolvers')

//Carregando variaveis de ambiente
require('dotenv').config({ encoding: 'utf8' })

//Confirmando ambiente
const IN_PROD = process.env.development === 'production'

//Carregando o Express
const app = express()

//Registrando um parser de JSON
app.use(bodyParser.json())

app.use(
    '/graphql',
    graphqlHttp({ schema: buildSchema, rootValue, graphiql: !IN_PROD })
)

//Para prevenir erros nos testes
if (!module.parent) {
    app.listen(process.env.PORT, () => {
        console.log('Server ativo na porta:', process.env.PORT)
    })
}
