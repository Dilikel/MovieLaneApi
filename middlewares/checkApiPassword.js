import config from '../config/dotenv.config.js'

export const checkApiPassword = (req, res, next) => {
	const apiPassword = req.headers['x-api-password']
	if (!apiPassword) {
		return res.status(403).json({ message: 'API password is missing' })
	}

	if (apiPassword !== config.apiPassword) {
		return res.status(403).json({ message: 'Invalid API password' })
	}

	next()
}
