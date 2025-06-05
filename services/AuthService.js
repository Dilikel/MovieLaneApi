import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'
import config from '../config/dotenv.config.js'

export const registerUser = async userData => {
	const { name, email, password, age } = userData
	const passwordHash = await bcrypt.hash(password, 10)
	const user = new User({ name, email, passwordHash, age })
	await user.save()
	return user
}

export const loginUser = async (email, password) => {
	const user = await User.findOne({ email })
	if (!user) {
		throw new Error('Пользователь не найден')
	}
	const isPasswordValid = await bcrypt.compare(password, user.passwordHash)
	if (!isPasswordValid) {
		throw new Error('Неверный пароль')
	}
	const token = jwt.sign({ _id: user._id }, config.jwtSecret, {
		expiresIn: '30d',
	})
	return { token, user }
}
