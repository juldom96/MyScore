const express=require('express')
const {
    getGames,
    getGameById,
    updateGameById,
    deleteGameById,
    createGame
}=require('../controllers/gamesControllers')

const router = express.Router()

router.get('/', getGames)
router.get('/:id', getGameById)
router.post('/', createGame)
router.patch('/:id', updateGameById)
router.delete('/:id', deleteGameById)

module.exports=router