const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//InnerSchema
const playerSchema = new Schema({
  player: {
    type: String,
    required: true,
  },
  score: {
    type: Number,
    required: true,
  },
  placement: {
    type: Number,
    required: true,
  },
});

//Hauptschema
const historySchema = new Schema(
  {
    date: {
      type: Date,
      required: true,
    },
    game: {
      type: String,
      required: true,
    },
    players: [playerSchema],
  },
  // Zusätzliches Arument, das einen Timestamp des Erstellens und des letzten Update des Dokuments erstellt
  { timestamps: true }
);

module.exports = mongoose.model('Historie', historySchema);
