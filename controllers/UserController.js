import User from '../models/User.js'

export const addMovieTime = async (req, res) => {
	try {
		const userId = req.userId
		const { id, currentTime } = req.body

		console.log('Запрос на добавление времени для фильма:', { id, currentTime })

		const user = await User.findById(userId)
		if (!user) {
			console.log('Пользователь не найден')
			return res.status(404).json({ message: 'Пользователь не найден' })
		}

		user.movieTimes.push({ id, currentTime })
		await user.save()

		console.log('Данные успешно добавлены')
		res.json({
			message: 'Данные добавлены успешно',
			movieTimes: user.movieTimes,
		})
	} catch (error) {
		console.error('Ошибка при добавлении времени:', error)
		res.status(500).json({
			message: 'Не удалось обновить данные',
			error: error.message,
		})
	}
}

export const updateMovieTime = async (req, res) => {
	try {
		const userId = req.userId
		const { id, currentTime } = req.body
		const user = await User.findById(userId)
		if (!user) {
			return res.status(404).json({ message: 'Пользователь не найден' })
		}

		const movieTime = user.movieTimes.find(movie => movie.id === id)
		if (!movieTime) {
			return res.status(404).json({ message: 'Время для фильма не найдено' })
		}

		movieTime.currentTime = currentTime
		await user.save()

		res.json({
			message: 'Время обновлено успешно',
			movieTimes: user.movieTimes,
		})
	} catch (error) {
		res.status(500).json({
			message: 'Не удалось обновить данные',
			error: error.message,
		})
	}
}

export const getMovieTimes = async (req, res) => {
	try {
		const userId = req.userId

		const user = await User.findById(userId)
		if (!user) {
			return res.status(404).json({ message: 'Пользователь не найден' })
		}

		res.json({
			message: 'Данные получены успешно',
			movieTimes: user.movieTimes,
		})
	} catch (error) {
		res.status(500).json({
			message: 'Не удалось получить данные',
			error: error.message,
		})
	}
}
