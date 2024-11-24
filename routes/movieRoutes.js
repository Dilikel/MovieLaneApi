import express from 'express'
import { getMovies, getMovieById } from '../controllers/MovieController.js'

const router = express.Router()

router.get('/', getMovies)
router.get('/:id', getMovieById)

/**
 * @swagger
 * /movie:
 *   get:
 *     summary: Get all movies or search by name
 *     tags:
 *       - Movies
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: The name of the movie to search for
 *     responses:
 *       200:
 *         description: A list of movies
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 *                   genre:
 *                     type: string
 *                   year:
 *                     type: integer
 *       404:
 *         description: No movies found
 */

/**
 * @swagger
 * /movie/{id}:
 *   get:
 *     summary: Get a movie by ID
 *     tags:
 *       - Movies
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the movie
 *     responses:
 *       200:
 *         description: A single movie
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 genre:
 *                   type: string
 *                 year:
 *                   type: integer
 *       404:
 *         description: Movie not found
 */

export default router
