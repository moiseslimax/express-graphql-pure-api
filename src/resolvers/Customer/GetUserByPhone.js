const CallBackend = require('../../utils/CallBackend')

/**
 * @description Rota para consultar usuário por telefone
 * @param {String} phone
 * @author Moisés Maldaner de Lima
 *
 * @returns {Object} User
 */

const getUserByPhone = async ({ phone }) => {
    try {
        const platformHeader = { 'Content-Type': 'application/json' }

        let parametrosGetUser = {
            phone,
        }

        let callGetUser = await CallBackend(
            parametrosGetUser,
            'POST',
            platformHeader,
            process.env.TEST_API
        )

        if (callGetUser.error) {
            throw callGetUser
        } else {
            return callGetUser.user
        }
    } catch (error) {
        throw new Error('Erro ao executar Query!', error)
    }
}

module.exports = getUserByPhone
