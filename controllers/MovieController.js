import movies from '../items.json' assert { type: 'json' }

export const getMovies = (req, res) => {
	res.json(movies)
}

export const getMovieById = (req, res) => {
	const id = parseInt(req.params.id)
	const movie = movies.find(movie => movie.id === id)

	if (!movie) {
		return res.status(404).json({ message: 'Фильм не найден' })
	}

	res.json(movie)
}
