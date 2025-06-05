import dotenv from 'dotenv'

dotenv.config()

export default {
	jwtSecret: process.env.SECRET_JWT_TOKEN,
	mongoUrl: process.env.MONGODB_URL,
	emailSender: process.env.EMAIL_SENDER,
	emailPassword: process.env.EMAIL_PASSWORD,
	port: process.env.PORT,
	apiPassword: process.env.API_PASSWORD,
}
