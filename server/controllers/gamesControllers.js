const Games = require('../models/gamesModel');
const mongoose = require('mongoose')
const {
    getAll,
    getById,
    updateOneById,
    deleteOneById
} = require('../controllers/universalControllers');

//GET all ascending by name
const getGames = async (req, res) => {
    getAll(req, res, Games, ({name: 1}))
}

//GET a game by ID
const getGameById = async (req, res) => {
    getById(req, res, Games, 'Spiel')
}

//UPDATE a game by id
const updateGameById = async (req, res) => {
    updateOneById(req,res, Games, 'Spiel')
}

//DELETE a game by id
const deleteGameById = async (req, res) => {
    deleteOneById(req, res, Games, 'Spiel')
}

//CREATE a game by id
const createGame = async (req, res) => {
    const {name, rows} = req.body
    try{
        //Nutzt das Game-Model, um eine neues Game-Objekt anzulegen...
        const game = await Games.create({name, rows})
        res.status(200).json(game)
    } catch (error){
        //... und wirft einen Fehler, wenn das nicht klappt
        res.status(400).json({error: error.message})
    }
}


module.exports = {
    getGames,
    getGameById,
    updateGameById,
    deleteGameById,
    createGame
}