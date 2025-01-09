import express from 'express'
import {
	registerValidation,
	loginValidation,
} from '../validation/authValidation.js'
import { handleValidationErrors } from '../middlewares/handleValidationErrors.js'
import { register, login, getMe } from '../controllers/UserController.js'
import CheckAuth from '../middlewares/CheckAuth.js'
import { checkApiPassword } from '../middlewares/checkApiPassword.js'

const router = express.Router()

router.post(
	'/login',
	checkApiPassword,
	loginValidation,
	handleValidationErrors,
	login
)
router.post(
	'/register',
	checkApiPassword,
	registerValidation,
	handleValidationErrors,
	register
)
router.get('/auth', CheckAuth, getMe)

export default router
