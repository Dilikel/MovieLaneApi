import { registerUser, loginUser } from '../services/AuthService.js'
import { createToken } from '../utils/createToken.js'
import User from '../models/User.js'
import { sendEmail } from '../services/SendEmailService.js'

export const register = async (req, res) => {
	try {
		const user = await registerUser(req.body)
		const token = createToken(user._id)
		res.json({ token })
		sendEmail(
			user.email,
			'Добро пожаловать в MovieLane',
			`Добро пожаловать в MovieLane, ${user.name}!\n\nМы рады приветствовать вас в нашем сообществе киноманов! Теперь вы можете наслаждаться лучшими фильмами прямо сейчас на нашем сайте.\n\nПриятного просмотра!\n\nКоманда MovieLane\nТехподдержка - movielane@yandex.ru`
		)
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
		sendEmail(
			user.email,
			'Успешный вход на MovieLane',
			`Привет, ${user.name}!\n\nВы успешно вошли в систему\n\nЕсли это были не вы, пожалуйста, свяжитесь с нашей поддержкой немедленно.\n\nПриятного дня!\nКоманда MovieLane\nТехподдержка - movielane@yandex.ru`
		)
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
