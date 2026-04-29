const express = require('express');
const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const Joi = require('joi');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
require('dotenv').config();
const ObjectId = mongoose.Types.ObjectId;

// Routes fuer die PLAYER
const playerRoutes = require('./routes/players');
const gameRoutes = require('./routes/games');
const historyRoutes = require('./routes/history');

const httpPort = 80;
const httpsPort = 443;
const staticFilesPath = path.join(__dirname, 'build/static/');

const app = express();

// Middleware

app.use(bodyParser.json()); // Body-Parser

app.use(
  helmet.contentSecurityPolicy({
    directives: { imgSrc: ["'self'", 'data:', 'blob:'] },
  })
); // Helmet für Sicherheitsheader

// Rate Limiting -> maximal 100 Anfragen einer IP in 15 Minuten entgegennehmen
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 Minuten
  max: 1000,
});
app.use(limiter);

app.use(express.json()); // Express JSON

// Middleware fuer statische Dateien
app.use('/static', express.static(staticFilesPath));
//Standard-Route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.get('/:file', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', req.params.file));
});

// Routes fuer MongoDB-API
app.use('/_api/players', playerRoutes);
app.use('/_api/games', gameRoutes);
app.use('/_api/history', historyRoutes);

// SSL-Zertifikate
const privateKey = fs.readFileSync('/var/www/certs/lyra/privkey.pem', 'utf8');
const certificate = fs.readFileSync(
  '/var/www/certs/lyra/fullchain.pem',
  'utf8'
);

const credentials = {
  key: privateKey,
  cert: certificate,
};

// Server
const httpServer = http.createServer(app);
const httpsServer = https.createServer(credentials, app);

httpServer.listen(httpPort, () => {
  console.log(`HTTP Server laeuft auf Port ${httpPort}`);
});

httpsServer.listen(httpsPort, () => {
  console.log(`HTTPS Server laeuft auf Port ${httpsPort}`);
});

// MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('MongoDB Verbindung erfolgreich');
  })
  .catch((err) => {
    console.error('Fehler bei der Verbindung mit MongoDB:', err);
  });

// Verbindung schließen
async function closeMongoDB() {
  await mongoose.connection.close();
  console.log('MongoDB Verbindung geschlossen');
}

const Player = require('./models/playerModel');
const Game = require('./models/gamesModel');
const History = require('./models/historyModel');

// Endpunkt /_api/sync definieren
// Joi Validierungsschemas definieren
// == Patterns zur Wiederverwendung ==
// === NOT required ===
const joiHexColor = Joi.string().pattern(/^#[0-9a-fA-F]{6}$/);
const joiId = Joi.string().pattern(/^[0-9a-fA-F]{24}$/);
const joiImg = Joi.string().pattern(
  /^.+\.(jpg|jpeg|png|gif|bmp|svg)$|^selfie$/
);
const joiIntegerIncludingNull = Joi.number().integer().allow(null);
const joiIsoDate = Joi.string().isoDate();
const joiNr = Joi.number();
const joiNrMinOne = Joi.number().integer().min(1);
const joiNrMinZero = Joi.number().integer().min(0);
const joiStringOneToOnehundred = Joi.string().min(1).max(100);

// === required() ===
/** .required() wird, damit es ein JOI-Validation-Objekt bleibt, einfach direkt
 * angehängt und nicht als String konkatiniert
 */
const joiIdReq = joiId.required();
const joiNrReq = joiNr.required();
const joiNrMinZeroReq = joiNrMinZero.required();
const joiNrMinOneReq = joiNrMinOne.required();
const joiImgReq = joiImg.required();
const joiHexColorReq = joiHexColor.required();
const joiIsoDateReq = joiIsoDate.required();
const joiStringOneToOnehundredReq = joiStringOneToOnehundred.required();
const joiIntegerIncludingNullReq = joiIntegerIncludingNull.required();

// == PLAYER ==
const playerSchema = Joi.object({
  _id: joiIdReq,
  __v: joiNrMinZero,
  avatar: joiImgReq,
  color: joiHexColorReq,
  createdAt: joiIsoDate,
  name: joiStringOneToOnehundredReq,
  // Definition des JOI-Schemas für ein optionales Array von JSON-Objekten
  played_games: Joi.array()
    .items(
      Joi.object({
        game: joiStringOneToOnehundredReq,
        times_played: joiNrMinOneReq,
        wins: joiNrMinZeroReq,
        _id: joiId,
      })
    )
    .min(0), // min(0) erlaubt auch ein leeres Array
  updatedAt: joiIsoDate,
});

// == GAME ==
const gameSchema = Joi.object({
  _id: joiIdReq,
  name: joiStringOneToOnehundredReq,
  __v: joiNrMinZero,
  createdAt: joiIsoDate,
  rows: Joi.array()
    .items(
      Joi.object({
        id: joiNrMinOneReq,
        name: joiStringOneToOnehundredReq,
        info: joiStringOneToOnehundredReq,
        default: joiIntegerIncludingNull,
        _id: joiId,
      })
    )
    .min(1), // min(1) stellt sicher, dass mindestens ein Objekt im Array enthalten ist
  updatedAt: joiIsoDate,
});

const historySchema = Joi.object({
  _id: joiIdReq,
  __v: joiNrMinZero,
  createdAt: joiIsoDate,
  date: joiIsoDateReq,
  game: joiStringOneToOnehundredReq,
  players: Joi.array()
    .items(
      Joi.object({
        score: joiNrReq,
        placement: joiNrMinOneReq,
        _id: joiId,
        player: joiStringOneToOnehundred,
      })
    )
    .min(1),
  updatedAt: joiIsoDate,
});

// Datenvalidierungsfunktion
function validateData(data) {
  const { players, games, history } = data;

  // Validierung der einzelnen Datenarrays
  for (const player of players) {
    const { error } = playerSchema.validate(player);
    if (error) {
      console.error(
        `Ungültige Daten für Spieler*in: ${error.details[0].message}`
      );
      return false;
    }
  }

  for (const game of games) {
    const { error } = gameSchema.validate(game);
    if (error) {
      console.error(`Ungültige Daten für Spiel: ${error.details[0].message}`);
      return false;
    }
  }

  for (const entry of history) {
    const { error } = historySchema.validate(entry);
    if (error) {
      console.error(
        `Ungültige Daten für History-Eintrag: ${error.details[0].message}`
      );
      return false;
    }
  }

  return true; // Alle Daten sind gültig
}

// Sync-Endpoint
app.post('/_api/sync', async (req, res) => {
  const { players, games, history } = req.body;

  if (!validateData({ players, games, history })) {
    return res.status(400).json('Ungültige Daten');
  }

  try {
    // Spieler synchronisieren
    for (const player of players) {
      if (ObjectId.isValid(player._id)) {
        await Player.findOneAndUpdate(
          { _id: new ObjectId(player._id) },
          player,
          {
            upsert: true,
            new: true,
          }
        );
      } else {
        throw new Error(`Ungültige ObjectId für Spieler*in: ${player._id}`);
      }
    }

    // Spiele synchronisieren
    for (const game of games) {
      if (ObjectId.isValid(game._id)) {
        await Game.findOneAndUpdate({ _id: new ObjectId(game._id) }, game, {
          upsert: true,
          new: true,
        });
      } else {
        throw new Error(`Ungültige ObjectId für Spiel: ${game._id}`);
      }
    }

    // History synchronisieren
    for (const entry of history) {
      if (ObjectId.isValid(entry._id)) {
        await History.findOneAndUpdate(
          { _id: new ObjectId(entry._id) },
          entry,
          {
            upsert: true,
            new: true,
          }
        );
      } else {
        throw new Error(`Ungültige ObjectId für History-Eintrag: ${entry._id}`);
      }
    }

    // Alte Datensätze entfernen, die nicht in den eingehenden Daten sind
    const playerIds = players
      .map((p) => (ObjectId.isValid(p._id) ? new ObjectId(p._id) : null))
      .filter((_id) => _id !== null);
    await Player.deleteMany({ _id: { $nin: playerIds } });

    const gameIds = games
      .map((g) => (ObjectId.isValid(g._id) ? new ObjectId(g._id) : null))
      .filter((_id) => _id !== null);
    await Game.deleteMany({ _id: { $nin: gameIds } });

    const historyIds = history
      .map((h) => (ObjectId.isValid(h._id) ? new ObjectId(h._id) : null))
      .filter((_id) => _id !== null);
    await History.deleteMany({ _id: { $nin: historyIds } });

    res.status(200).json('Daten erfolgreich synchronisiert');
  } catch (error) {
    console.error('Fehler beim Synchronisieren der Daten:', error);
    res.status(500).json('Interner Serverfehler');
  }
});

process.on('SIGINT', async () => {
  console.log('SIGINT empfangen. Server wird heruntergefahren...');
  await closeMongoDB();
  server.close(() => {
    console.log('HTTP-Server geschlossen');
    process.exit(0);
  });
});
