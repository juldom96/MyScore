//Mongoose, um ein Schema vorgeben zu können
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Wir erstellen hier also ein Schema, nach dem wir uns richten wollen

//Schema für playedGames, das später auf das Array in playedGames angewendet wird
const playedGamesSchema = new Schema({
  game: {
    type: String,
    required: true,
  },
  times_played: {
    type: Number,
    required: true,
    default: 1,
  },
  wins: {
    type: Number,
    required: false,
    default: 0,
  },
});

//Hauptschema für den Eintrag an sich
const playerSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      required: true,
    },
    played_games: [playedGamesSchema],
  },
  // Zusätzliches Arument, das einen Timestamp beim Erstellen und für das letzte Update des Dokuments erstellt
  { timestamps: true }
);

//'Player' im Name singular, da es später automatisch zum Plural wird beim automatischen Erstellen der Collection in der DB
//Erstellt ein Player-Model, das wir später importieren, um mit der Player-Collection zu interagrieren und dabei das Schema einzuhalten
module.exports = mongoose.model('Player', playerSchema);
