import config from '../config/dotenv.config.js'

import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
	service: 'yandex',
	auth: {
		user: config.emailSender,
		pass: config.emailPassword,
	},
})

export const sendEmail = async (email, subject, text) => {
	await transporter.sendMail({
		from: config.emailSender,
		to: email,
		subject,
		text,
	})
}
