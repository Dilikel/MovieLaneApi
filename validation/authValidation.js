import { body } from 'express-validator'

export const registerValidation = [
	body('email', 'Неверный формат почты').isEmail(),
	body('password', 'Пароль должен быть больше 6 символов').isLength({ min: 6 }),
	body('name', 'Имя должно быть больше 3 символов').isLength({ min: 3 }),
]

export const loginValidation = [
	body('email', 'Неверный формат почты').isEmail(),
	body('password', 'Пароль должен быть больше 6 символов').isLength({ min: 6 }),
]
