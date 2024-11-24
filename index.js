import express from 'express'
import connectDB from './config/db.js'
import authRoutes from './routes/authRoutes.js'
import movieRoutes from './routes/movieRoutes.js'
import cors from 'cors'
import swaggerJSDoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'

const app = express()
const PORT = process.env.PORT || 8000

const swaggerOptions = {
	definition: {
		openapi: '3.0.0',
		info: {
			title: 'MovieLane API',
			version: '1.0.0',
		},
	},
	apis: ['./routes/*.js'],
}

const swaggerDocs = swaggerJSDoc(swaggerOptions)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))

connectDB()

app.use(cors(), express.json())
app.use(authRoutes)
app.use('/movie', movieRoutes)

app.listen(PORT, () => {
	console.log(`Сервер запущен`)
})
