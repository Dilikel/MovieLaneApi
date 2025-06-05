import config from '../config/dotenv.config.js'
import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
	service: 'yandex',
	auth: {
		user: config.emailSender,
		pass: config.emailPassword,
	},
	maxConnections: 5,
	maxMessages: 10,
})

export const sendEmail = async (email, subject, text) => {
	try {
		await transporter.sendMail({
			from: config.emailSender,
			to: email,
			subject,
			text,
			replyTo: config.emailSender,
		})
	} catch (error) {
		console.error('Ошибка при отправке письма:', error)
	}
}
