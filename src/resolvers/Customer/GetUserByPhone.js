const axios = require('axios')

/**
 * @description Rota para consultar usuário por telefone
 * @param {String} phone
 * @author Moisés Maldaner de Lima
 *
 * @returns {Object} User
 */

const getUserByPhone = async ({ phone }) => {
    const platformHeader = { 'Content-Type': 'application/json' }

    let getUser = await axios
        .get(process.env.TEST_API, {
            params: {
                phone,
            },
            headers: {
                platformHeader,
            },
        })
        .then(res => {
            return res.data
        })

    if (getUser.length < 1) {
        throw new Error('Usuário não encontrado')
    } else {
        return getUser[0]
    }
}

module.exports = getUserByPhone
