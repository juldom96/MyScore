const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//InnerSchema
const rowSchema = new Schema({
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  info: {
    type: String,
    required: false,
  },
});

//Hauptschema
const gamesSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    rows: [rowSchema],
  },
  // Zusätzliches Arument, das einen Timestamp des Erstellens und des letzten Update des Dokuments erstellt
  { timestamps: true }
);

module.exports = mongoose.model('Game', gamesSchema);
