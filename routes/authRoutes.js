import express from 'express'
import {
	registerValidation,
	loginValidation,
} from '../validation/authValidation.js'
import { handleValidationErrors } from '../middlewares/handleValidationErrors.js'
import { register, login, getMe } from '../controllers/UserController.js'
import CheckAuth from '../middlewares/CheckAuth.js'

const router = express.Router()

router.post('/login', loginValidation, handleValidationErrors, login)
router.post('/register', registerValidation, handleValidationErrors, register)
router.get('/auth', CheckAuth, getMe)

export default router
