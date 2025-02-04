import express from 'express'
import connectDB from './config/db.js'
import authRoutes from './routes/authRoutes.js'
import movieRoutes from './routes/movieRoutes.js'
import userRoutes from './routes/userRoutes.js'
import cors from 'cors'

const app = express()
const PORT = process.env.PORT || 8000

connectDB()

const corsOptions = {
	origin: [
		'http://localhost:3000',
		'https://movie-lane.vercel.app/',
		'http://localhost:5173',
		'https://movie-lane-nuxt.vercel.app/',
	],
	methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
	allowedHeaders: '*',
	preflightContinue: false,
}

app.use(cors(corsOptions))
app.use(express.json())
app.use(authRoutes)
app.use('/user', userRoutes)
app.use('/movie', movieRoutes)

app.listen(PORT, () => {
	console.log(`Сервер запущен на порту ${PORT}`)
})
