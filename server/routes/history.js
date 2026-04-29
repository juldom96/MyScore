const express=require('express')
const {
    getHistory,
    createHistoryItem,
    updateHistoryItemById,
    deleteHistoryItemById
}=require('../controllers/historyControllers')

const router = express.Router()

router.get('/', getHistory)
router.post('/', createHistoryItem)
router.patch('/:id', updateHistoryItemById)
router.delete('/:id', deleteHistoryItemById)

module.exports = router