const chai = require('chai')

const expect = chai.expect
const request = require('supertest')

describe('getUserByPhone', () => {
    it('Retorna dados do usuário', () => {
        request.post('/graphql').send({ query: '{}' })
        expect
    })
    it('Não aceita null como telefone', () => {
        request.post('/graphql').send({ query: '{}' })
        expect
    })
})
