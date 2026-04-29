const express=require('express')

const {
    getPlayers,
    getPlayerById,
    createPlayer,
    updatePlayerById,
    deletePlayerById
} = require('../controllers/playerControllers')

const router = express.Router()

router.get('/', getPlayers)
router.get('/:id', getPlayerById)
router.post('/', createPlayer)
router.patch('/:id', updatePlayerById)
router.delete('/:id', deletePlayerById)

module.exports=router