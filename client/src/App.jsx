import './App.css';
import StartView from './views/StartView/StartView';
import GamesView from './views/GamesView/GamesView';
import NewGameView from './views/NewGameView/NewGameView';
import PlayerView from './views/PlayerView/PlayerView';
import HistoryView from './views/HistoryView/HistoryView';
import RunningGameView from './views/RunningGameView/RunningGameView';
import { useEffect, useState } from 'react';
import { getAllDataFromCollection, addDataToCollection } from './util/indexedDb.js';
import * as CRUD from './util/crud.js';
import { dummyGames, dummyPlayers } from './util/dummyData.js';
import {
  GAMES_VIEW,
  PLAYER_VIEW,
  NEW_GAME_VIEW,
  RUNNING_GAME_VIEW,
  HISTORY_VIEW,
} from './util/enums.js';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

function App() {
  const [showView, setShowView] = useState(null);
  const [gameIsRunning, setGameIsRunning] = useState(false);
  const [chosenGame, setChosenGame] = useState(null);
  const [chosenPlayers, setChosenPlayers] = useState([]);
  const [score, setScore] = useState(null);
  const [totals, setTotals] = useState(null);
  const [players, setPlayers] = useState([]);
  const [games, setGames] = useState([]);
  const [history, setHistory] = useState([]);
  async function addPlayer(player) {
    setPlayers(await CRUD.addPlayer(player));
  }

  async function addGame(game) {
    setGames(await CRUD.addGame(game));
  }

  async function addEntryToHistory(entry) {
    setHistory(await CRUD.addHistoryEntry(entry));
  }

  async function addEntrytoPlayersHistory(entry) {
    setPlayers(await CRUD.updatePlayersHistories(entry));
  }

  async function deletePlayer(player) {
    setPlayers(await CRUD.deletePlayer(player));
  }

  async function deleteGame(game) {
    setGames(await CRUD.deleteGame(game));
  }
  async function handleAddHistoryEntry(entry) {
    await addEntryToHistory(entry);
    await addEntrytoPlayersHistory(entry);
  }

  async function updatePlayer(updatedPlayer) {
    setPlayers(await CRUD.updatePlayer(updatedPlayer));
  }

  //schreibt Daten aus IndexedDB in States, sobald der SW fertig installiert ist
  useEffect(() => {
    async function fetchData() {
      let playersData = await getAllDataFromCollection('all_players');
      let gamesData = await getAllDataFromCollection('all_games');
      const historyData = await getAllDataFromCollection('history');

      if (gamesData.length === 0) {
        for (const game of dummyGames) {
          await addDataToCollection(game, 'all_games');
        }
        gamesData = await getAllDataFromCollection('all_games');
      }
      if (playersData.length === 0) {
        for (const player of dummyPlayers) {
          await addDataToCollection(player, 'all_players');
        }
        playersData = await getAllDataFromCollection('all_players');
      }

      setPlayers(playersData);
      setGames(gamesData);
      setHistory(historyData);
    }

    async function checkSW() {
      if ('serviceWorker' in navigator) {
        try {
          const registration = await navigator.serviceWorker.ready;
          if (
            registration &&
            registration.active &&
            registration.active.state === 'activated'
          ) {
            console.log('Service Worker ist installiert und aktiviert.');
            fetchData();
          } else {
            console.log(
              'Service Worker ist installiert, aber noch nicht aktiviert.'
            );
            // Erneut überprüfen in 100ms
            setTimeout(checkSW, 100);
          }
        } catch (error) {
          console.error('Fehler beim Überprüfen des Service Workers:', error);
          // Erneut überprüfen in 100ms
          setTimeout(checkSW, 100);
        }
      } else {
        console.log('Service Worker wird vom Browser nicht unterstützt.');
        // Fallback: Daten ohne Service Worker laden
        fetchData();
      }
    }

    checkSW();
  }, []);
  const runningGameItems = ['players', 'game', 'score', 'totals'];

  //liest aktuelle Partie beim Start der PWA aus dem local Storage aus
  useEffect(() => {
    const game = JSON.parse(localStorage.getItem('game'));
    const players = JSON.parse(localStorage.getItem('players'));
    const score = JSON.parse(localStorage.getItem('score'));
    const totals = JSON.parse(localStorage.getItem('totals'));

    if (game && players && totals && score) {
      setChosenGame(game);
      setChosenPlayers(players);
      setScore(score);
      setTotals(totals);
      setGameIsRunning(true);
    }
  }, []);

  function goToStartView() {
    setShowView(null);
  }

  function resetGame() {
    removeRunningGameItemsFromLocalStorage();
    setChosenGame('');
    setChosenPlayers([]);
    setGameIsRunning(false);
    setScore([]);
    setTotals([]);
  }
  //wenn ein Spiel beendet oder abgebrochen wird
  function removeRunningGameItemsFromLocalStorage() {
    runningGameItems.forEach((item) => {
      localStorage.removeItem(item);
    });
  }

  function renderSwitch() {
    switch (showView) {
      case RUNNING_GAME_VIEW:
        return (
          <RunningGameView
            goToStartView={goToStartView}
            resetGame={resetGame}
            chosenGame={chosenGame}
            chosenPlayers={chosenPlayers}
            score={score}
            setScore={setScore}
            totals={totals}
            setTotals={setTotals}
            addHistoryItem={handleAddHistoryEntry}
          ></RunningGameView>
        );

      case NEW_GAME_VIEW:
        return (
          <NewGameView
            games={games}
            players={players}
            goToStartView={goToStartView}
            gameIsRunning={gameIsRunning}
            setGameIsRunning={setGameIsRunning}
            setShowView={setShowView}
            chosenGame={chosenGame}
            setChosenGame={setChosenGame}
            chosenPlayers={chosenPlayers}
            setChosenPlayers={setChosenPlayers}
            setScore={setScore}
            setTotals={setTotals}
            resetGame={resetGame}
          />
        );

      case GAMES_VIEW:
        return (
          <GamesView
            games={games}
            addGame={addGame}
            deleteGame={deleteGame}
            goToStartView={goToStartView}
          />
        );

      case PLAYER_VIEW:
        return (
          <PlayerView
            players={players}
            goToStartView={goToStartView}
            addPlayer={addPlayer}
            deletePlayer={deletePlayer}
            updatePlayer={updatePlayer}
          />
        );

      case HISTORY_VIEW:
        return (
          <HistoryView
            history={history}
            goToStartView={goToStartView}
            players={players}
          />
        );

      default:
        return (
          <StartView gameIsRunning={gameIsRunning} setShowView={setShowView} />
        );
    }
  }
  return <>{renderSwitch()}</>;
}

export default App;
