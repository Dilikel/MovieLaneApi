import mongoose from 'mongoose'

const movieSchema = new mongoose.Schema(
	{
		id: {
			type: Number,
			required: true,
		},
		imageUrl: {
			type: String,
			required: true,
		},
		grade: {
			type: Number,
			required: true,
		},
		name: {
			type: String,
			required: true,
		},
		genres: {
			type: String,
			required: true,
		},
		info: {
			type: String,
			required: true,
		},
		year: {
			type: String,
			required: true,
		},
		country: {
			type: String,
			required: true,
		},
		originalName: {
			type: String,
			required: true,
		},
		categories: {
			type: String,
			required: true,
		},
		director: {
			type: String,
			required: true,
		},
		actors: {
			type: String,
			required: true,
		},
		videoLink: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
	}
)

const Movie = mongoose.model('Movie', movieSchema)
export default Movie
