import express from 'express'
import { getMovies, getMovieById } from '../controllers/MovieController.js'
import { checkApiPassword } from '../middlewares/checkApiPassword.js'

const router = express.Router()

router.get('/', checkApiPassword, getMovies)
router.get('/:id', checkApiPassword, getMovieById)

export default router
