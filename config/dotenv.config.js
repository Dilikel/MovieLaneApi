import dotenv from 'dotenv'

dotenv.config()

export default {
	jwtSecret: process.env.SECRET_JWT_TOKEN,
	mongoUrl: process.env.MONGODB_URL,
}
