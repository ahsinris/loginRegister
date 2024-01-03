import User from "../model/user.js";
import httpcodes from "../codes/httpcodes.js";
import message from "../message/message.js";
import bcrypt from 'bcrypt'
import Jwt from "jsonwebtoken";

class Service {
    async SignupService(req) {
        const { userName, email, password } = req
        const isEmailExist = await User.findOne({ email: email })
        console.log(isEmailExist)
        if (isEmailExist) {
            return {
                sucess: false,
                status: httpcodes.HTTP_BAD_REQUEST,
                message: message[100]
            }
        }
        const hashPassword = await bcrypt.hash(password, Number(process.env.SALTROUND))
        const data = {
            userName: userName,
            email: email,
            password: hashPassword
        }

        const result = await User.create(data)
        return {
            sucess: true,
            status: httpcodes.HTTP_OK,
            message: message[200],
            data: result
        }
    }
    async loginService(req) {
        const { email, password } = req
        const isEmailExist = await User.findOne({ email: email })
        if (!isEmailExist) {
            return {
                sucess: false,
                status: httpcodes.HTTP_BAD_REQUEST,
                message: message[101]
            }
        }
        const isValidPassword = await bcrypt.compare(password, isEmailExist.password)
        if (!isValidPassword) {
            return {
                sucess: false,
                status: httpcodes.HTTP_BAD_REQUEST,
                message: message[102]
            }
        }

        if (isEmailExist.isActive === false || isEmailExist.isDeleted) {
            return {
                sucess: false,
                status: httpcodes.HTTP_NOT_FOUND,
                message: message[109]
            }

        }

        const payload = {
            user_id: isEmailExist._id,
            userName: isEmailExist.userName,
            email: isEmailExist.email
        }

        payload.accesstoken = Jwt.sign(payload, process.env.SECERETKEY)

        return {
            sucess: true,
            status: httpcodes.HTTP_OK,
            message: message[200],
            data: payload
        }
    }
}

export default new Service()