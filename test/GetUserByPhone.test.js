/* eslint-disable no-useless-escape */
//importa os módulos e aqruivos necessários
const request = require('supertest')
const app = require('../index.js')

describe('getUserByPhone', () => {
    test('Should return name', async () => {
        const req = request(app)
            .post('/graphql')
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .send({
                query:
                    'query {getUserByPhone(phone: "51192301926" ) { name } }',
            })

        const res = await req
        const data = res.body.data.getUserByPhone
        expect(res.statusCode).toBe(200)
        expect(data.name).toBeTruthy()
    })

    test('Should return error', async () => {
        const req = request(app)
            .post('/graphql')
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .send({
                query:
                    'query {getUserByPhone(phone: "5sadasd01926" ) { name } }',
            })

        const res = await req
        const data = res.error
        expect(res.statusCode).toBe(500)
        expect(data).toBeTruthy()
    })
})
