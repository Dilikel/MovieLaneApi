import jwt from 'jsonwebtoken'
import config from '../config/dotenv.config.js'

export default (req, res, next) => {
	const token = (req.headers.authorization || '').replace(/Bearer\s?/, '')

	if (!token) {
		return res.status(403).json({ message: 'Пользователь не авторизован' })
	}

	try {
		const decoded = jwt.verify(token, config.jwtSecret)
		req.userId = decoded._id
		next()
	} catch (error) {
		return res.status(403).json({ message: 'Пользователь не авторизован' })
	}
}
