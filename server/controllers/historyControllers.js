const History = require('../models/historyModel');
const mongoose = require('mongoose')

const {
    getAll,
    updateOneById,
    deleteOneById
} = require('../controllers/universalControllers');

//GET all descending by time of creation
const getHistory = async (req, res) => {
    await getAll (req, res, History,({createdAt: -1}))
}

//UPDATE a certain item in the history, chosen by id
const updateHistoryItemById = async (req, res) => {
    await updateOneById(req, res, History, 'History-Eintrag')
}

//DELETE a certain item from the history, chosen by id
const deleteHistoryItemById = async (req, res) =>{
    await deleteOneById(req, res, History, 'History-Eintrag') 
}

//CREATE a new item for the history
const createHistoryItem = async (req, res) => {
    const {date, game, players}=req.body

    try{
        const historyItem = await History.create({date, game, players})
        res.status(200).json(historyItem)
    } catch (error){
        res.status(400).json({error: error.message})
    }
}

module.exports = {
    getHistory,
    createHistoryItem,
    updateHistoryItemById,
    deleteHistoryItemById
}