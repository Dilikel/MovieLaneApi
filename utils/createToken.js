import jwt from 'jsonwebtoken'
import config from '../config/dotenv.config.js'

export const createToken = userId => {
	return jwt.sign({ _id: userId }, config.jwtSecret, { expiresIn: '30d' })
}
