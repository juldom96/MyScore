const Players = require('../models/playerModel');
const mongoose = require('mongoose')
const {
    getAll,
    getById,
    updateOneById,
    deleteOneById
} = require('../controllers/universalControllers')

//GET ALL ascending by name
const getPlayers = async (req, res) => {
    await getAll(req, res, Players, ({name: 1}))
  } 

//GET one by id
const getPlayerById = async (req,res) => {
    await getById(req, res, Players, 'Spieler*in')
}

    
//UPDATE a player identified by ID
const updatePlayerById = async (req,res) =>{
    await updateOneById(req, res, Players, 'Spieler*in')
}

//DELETE a Player specified by id
const deletePlayerById = async (req, res) => {
    await deleteOneById(req, res, Players, 'Spieler*in')
}

//CREATE a new player
//Bleibt hier, wird nicht ausgelagert 
const createPlayer = async (req, res) => {
    const{name, color, avatar} = req.body

    //Beim erstellen ist player_games stets leer
    const played_games = []

    try{
        const player = await Players.create({name, color, avatar, played_games})
        res.status(200).json(player)
    } catch (error){
        res.status(400).json({error: error.message})
    }
}

  module.exports = {
    getPlayers,
    getPlayerById,
    createPlayer,
    updatePlayerById,
    deletePlayerById
  }