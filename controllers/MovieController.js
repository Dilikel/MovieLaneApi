import fs from 'fs';

export const getMovies = (req, res) => {
	try {
		const movies = JSON.parse(fs.readFileSync('./items.json', 'utf8'));
		res.json(movies)
	} catch (err) {
		res.status(404).send('Not Found');
	}
}

export const getMovieById = (req, res) => {
	try {
		const movies = JSON.parse(fs.readFileSync('./items.json', 'utf8'));
		const id = parseInt(req.params.id)
		const movie = movies.find(movie => movie.id === id)
		if (!movie) {
			return res.status(404).json({ message: 'Фильм не найден' })
		}

		res.json(movie)
	} catch (err) {
		res.status(404).send('Not Found');
	}
}
