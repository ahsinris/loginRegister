import httpcodes from "../codes/httpcodes.js";
import message from "../message/message.js";
import userService from "../service/userService.js";
import Response from "../response/response.js"
import logger from "../logger/logger.js"


class Controller {
    async SignupController(req, res, next) {
        try {

            const result = await userService.SignupService(req.body)
            if (!result.sucess) {
                logger.error(`signup failed :${result.message}`)
                return Response.error(req, res, result.status, null, result.message)
            }
            logger.info(`signup sucessfull:${result.message}`)
            return Response.sucess(req, res, result.status, result.data, result.message)

        }
        catch (err) {
            logger.error(`Error in usercontroller:${err.message}`)
            console.log(err)
            next(err)
        }
    }
    async loginController(req, res, next) {
        try {

            const result = await userService.loginService(req.body)
            if (!result.sucess) {
                logger.error(`login failed :${result.message}`)
                return Response.error(req, res, result.status, null, result.message)
            }
            logger.info(`login sucessfull:${result.message}`)
            return Response.sucess(req, res, result.status, result.data, result.message)

        }
        catch (err) {
            logger.error(`Error in loginController:${err.message}`)
            console.log(err)
            next(err)
        }
    }
}


export default new Controller()