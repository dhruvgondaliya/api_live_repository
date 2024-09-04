const response = (res, code, message, data = null) => {
    return res.status(code).send({
        data,
        code,
        message
    })
}

module.exports = {
    response
}