import { registerUser, loginUser } from '../services/AuthService.js'
import { createToken } from '../utils/createToken.js'
import User from '../models/User.js'

export const register = async (req, res) => {
	try {
		const user = await registerUser(req.body)
		const token = createToken(user._id)
		res.json({ token })
	} catch (error) {
		res
			.status(500)
			.json({ message: 'Регистрация не удалась', error: error.message })
	}
}

export const login = async (req, res) => {
	try {
		const { token, user } = await loginUser(req.body.email, req.body.password)
		res.json({ token })
	} catch (error) {
		res.status(400).json({ message: 'Ошибка при входе', error: error.message })
	}
}

export const getMe = async (req, res) => {
	try {
		const user = await User.findById(req.userId).select('-passwordHash')
		if (!user) {
			return res.status(404).json({ message: 'Пользователь не найден' })
		}
		res.json(user)
	} catch (error) {
		res.status(500).json({
			message: 'Не удалось получить данные пользователя',
			error: error.message,
		})
	}
}
