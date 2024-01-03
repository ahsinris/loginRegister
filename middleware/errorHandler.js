import logger from "../logger/logger.js"
function errorHandler(err, req, res, next) {
    console.log(err)
    logger.error(`error:${err.message}`)
    return res.status(500).json({
        status: 500,
        message: 'internal server error' + e
    })
}

export default errorHandler