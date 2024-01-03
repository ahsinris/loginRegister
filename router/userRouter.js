import express from 'express'
import Validation from '../validation/joi.js'
import Controller from '../controller/userController.js'
const router = express.Router()

router.post('/signup', Validation.registerValidation, Controller.SignupController)
router.post('/login', Validation.loginValidation, Controller.loginController)

export default router