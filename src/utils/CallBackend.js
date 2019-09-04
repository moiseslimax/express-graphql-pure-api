//Axios
const axios = require('axios')

//Timeout das consultas AXIOS
const TIMEOUT = 60000

const parametrosInvalidos = {
    status: {
        code: '1010',
        message: 'Parametros Invalidos',
    },
}

/**
 * Funcao para acesso assincrono a servicos e APIs
 * @param {*} body Dados a passar no Body
 * @param {*} httpMethod Metodo HTTP
 * @param {*} headers Headers utilizados
 * @param {*} serviceURL URL do servico / API
 */
const CallBackend = async (body, httpMethod, headers, serviceURL) => {
    let parms
    if (!body || !httpMethod || !headers || !serviceURL) {
        return res.status(404).send(parametrosInvalidos)
    }

    if (headers && headers !== '') {
        parms = {
            method: httpMethod,
            url: serviceURL,
            timeout: TIMEOUT,
            headers: headers,
            data: body,
        }
    } else {
        parms = {
            method: httpMethod,
            url: serviceURL,
            timeout: TIMEOUT,
            data: body,
        }
    }

    let customer = await axios(parms)
        .then(response => {
            if (response.status === 200 && response.data === null) {
                return {
                    status: {
                        code: '1200',
                        message: 'OK',
                    },
                }
            } else {
                const data = response.data
                return data
            }
        })
        .catch(err => {
            if (err.response) {
                //Response code fora do range 2xx, no caso do startLogin o retorno eh 500

                if (err.response.status === 500) {
                    if (err.response.data.error) {
                        return {
                            code: '1500',
                            message: err.response.data.error.message,
                        }
                    } else {
                        return {
                            code: '1501',
                            message: err.response.data,
                        }
                    }
                } else {
                    return err.response.data
                }
            } else if (err.request) {
                //Request foi feita mas nao obteve retorno

                if (err.code === 'ECONNREFUSED') {
                    return {
                        code: '1999',
                        message: 'Erro ao acessa Backend',
                    }
                } else {
                    return {
                        code: '1002',
                        message: 'Request sem retorno',
                    }
                }
            } else {
                //Algo no setup do request gerou erro
                return {
                    code: '1003',
                    message: 'Possivel erro no setup do request',
                }
            }
        })

    return customer
}

module.exports = CallBackend
