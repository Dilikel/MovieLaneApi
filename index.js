import express from 'express'
import connectDB from './config/db.js'
import authRoutes from './routes/authRoutes.js'
import movieRoutes from './routes/movieRoutes.js'
import userRoutes from './routes/userRoutes.js'
import cors from 'cors'

const app = express()
const PORT = process.env.PORT || 8000

connectDB()
app.use(cors())
app.use(express.json())
app.use('/v1/auth', authRoutes)
app.use('/v1/user', userRoutes)
app.use('/v1/movie', movieRoutes)

app.listen(PORT, () => {
	console.log(`Сервер запущен на порту ${PORT}`)
})
