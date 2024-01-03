import Joi from "joi";

class Validation {
    async registerValidation(req, res, next) {
        try {
            const schema = Joi.object({
                userName: Joi.string().required(),
                email: Joi.string().email().required(),
                password: Joi.string().min(1).max(10).required()
            })
            await schema.validateAsync(req.body)
            next()

        }
        catch (err) {
            next(err)
        }

    }
    async loginValidation(req, res, next) {
        try {
            const schema = Joi.object({
                email: Joi.string().email().required(),
                password: Joi.string().min(1).max(10).required()
            })
            await schema.validateAsync(req.body)
            next()

        }
        catch (err) {
            next(err)
        }

    }
}

export default new Validation()
