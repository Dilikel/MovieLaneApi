import fs from 'fs'

export const getMovies = (req, res) => {
	try {
		const movies = JSON.parse(fs.readFileSync('./items.json', 'utf8'))
		const { name } = req.query

		if (name) {
			const matchingMovies = movies.filter(movie =>
				movie.name.toLowerCase().includes(name.toLowerCase())
			)
			if (matchingMovies.length > 0) {
				return res.json(matchingMovies)
			} else {
				return res.status(204).json({ message: 'Фильмы не найдены' })
			}
		}
		res.json(movies)
	} catch (err) {
		res.status(404).send('Not Found')
	}
}

export const getMovieById = (req, res) => {
	try {
		const movies = JSON.parse(fs.readFileSync('./items.json', 'utf8'))
		const id = parseInt(req.params.id)
		const movie = movies.find(movie => movie.id === id)
		if (!movie) {
			return res.status(404).json({ message: 'Фильм не найден' })
		}

		res.json(movie)
	} catch (err) {
		res.status(404).send('Not Found')
	}
}
