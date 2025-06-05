import { registerUser, loginUser } from '../services/AuthService.js'
import { createToken } from '../utils/createToken.js'
import User from '../models/User.js'
import { sendEmail } from '../services/SendEmailService.js'

export const register = async (req, res) => {
	try {
		const user = await registerUser(req.body)
		const token = createToken(user._id)
		const { passwordHash, ...userWithoutPassword } = user._doc
		res.json({ token, user: userWithoutPassword })
		try {
			sendEmail(
				user.email,
				'Добро пожаловать в MovieLane',
				`Добро пожаловать в MovieLane, ${user.name}!

Мы рады приветствовать вас в нашем сообществе киноманов! Теперь вы можете наслаждаться лучшими фильмами прямо сейчас на нашем сайте.

Приятного просмотра!

Команда MovieLane
Техподдержка - movielane@yandex.ru`
			)
		} catch (error) {
			console.error('Ошибка при отправке письма:', error)
		}
	} catch (error) {
		res
			.status(500)
			.json({ message: 'Регистрация не удалась', error: error.message })
	}
}

export const login = async (req, res) => {
	try {
		const { token, user } = await loginUser(req.body.email, req.body.password)
		const { passwordHash, ...userWithoutPassword } = user._doc
		res.json({ token, user: userWithoutPassword })
		try {
			sendEmail(
				user.email,
				'Успешный вход на MovieLane',
				`Привет, ${user.name}!

Вы успешно вошли в систему.

Если это были не вы, пожалуйста, свяжитесь с нашей поддержкой немедленно.

Приятного дня!
Команда MovieLane
Техподдержка - movielane@yandex.ru`
			)
		} catch (error) {
			console.error('Ошибка при отправке письма:', error)
		}
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
		const token = createToken(user._id)
		res.json({ user, token })
	} catch (error) {
		res.status(500).json({
			message: 'Не удалось получить данные пользователя',
			error: error.message,
		})
	}
}
