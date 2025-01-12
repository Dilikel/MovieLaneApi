import express from 'express'
import CheckAuth from '../middlewares/CheckAuth.js'
import {
	addMovieTime,
	updateMovieTime,
	getMovieTimes,
} from '../controllers/UserController.js'

const router = express.Router()

router.post('/save/movie/time', CheckAuth, addMovieTime)
router.put('/update/movie/time', CheckAuth, updateMovieTime)
router.get('/movie/times', CheckAuth, getMovieTimes)

export default router
