import Movie from '../models/Movie.js'

export const getMovies = async (req, res) => {
	try {
		const { name } = req.query

		if (name) {
			const matchingMovies = await Movie.find({
				name: { $regex: name, $options: 'i' },
			})

			if (matchingMovies.length > 0) {
				return res.json(matchingMovies)
			} else {
				return res.status(204).json({ message: 'Фильмы не найдены' })
			}
		}

		const movies = await Movie.find({})
		res.json(movies)
	} catch (err) {
		console.error(err)
		res.status(500).json({ message: 'Server Error' })
	}
}

export const getMovieById = async (req, res) => {
	try {
		const movie = await Movie.findOne({ id: Number(req.params.id) })

		if (!movie) {
			return res.status(404).json({ message: 'Фильм не найден' })
		}

		res.json(movie)
	} catch (err) {
		console.error(err)
		res.status(500).json({ message: `Server Error: ${err}` })
	}
}
