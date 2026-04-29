import NavBar from '../../components/NavBar';
import GamesList from '../../components/GamesList';
import GameCard from '../../components/GameCard';
import PlayerList from '../../components/PlayerList';
import ViewContainer from '../../components/ViewContainer';
import { Button } from 'react-bootstrap';
import './NewGameView.css';
import { RUNNING_GAME_VIEW, NEW_GAME_VIEW } from '../../util/enums';
import Modal from '../../components/Modal';

function NewGameView({
  games,
  players,
  goToStartView,
  gameIsRunning,
  setGameIsRunning,
  setShowView,
  chosenGame,
  setChosenGame,
  chosenPlayers,
  setChosenPlayers,
  setScore,
  setTotals,
  resetGame,
}) {
  function generateTotals(score) {
    const numCols = score[0].length;

    // Array zum Speichern der Summen jeder Spalte erstellen
    const totals = new Array(numCols).fill(0);

    return totals;
  }
  //beim Click auf die PlayerCard wird der Player zu setChosenPlayerIds hinzugefügt oder entfernt
  const togglePlayer = (player) => {
    if (!chosenPlayers) {
      setChosenPlayers([player]);
      return;
    }

    if (chosenPlayers.includes(player)) {
      setChosenPlayers((prevChosenPlayers) =>
        prevChosenPlayers.filter(
          (prevChosenPlayer) => prevChosenPlayer._id !== player._id
        )
      );
    } else {
      setChosenPlayers((prevChosenPlayers) => [...prevChosenPlayers, player]);
    }
  };

  //für Navigation über "Zurück"-Icon
  const goBack = () => {
    if (chosenGame) {
      setChosenGame(null);
      setChosenPlayers([]);
    } else {
      goToStartView();
    }
  };

  const startGame = async () => {
    const score = generateScore(chosenGame);
    setScore(score);
    const totals = generateTotals(score);
    setTotals(totals);

    localStorage.setItem('players', JSON.stringify(chosenPlayers));
    localStorage.setItem('game', JSON.stringify(chosenGame));
    localStorage.setItem('score', JSON.stringify(score));
    localStorage.setItem('totals', JSON.stringify(totals));

    setShowView(RUNNING_GAME_VIEW);
    setGameIsRunning('true');
  };

  /**
      geht die Wertungsspalten des game durch und erstellt ein zweidimensionales array[spalte][spieler] 
      mit den gespeicherten default-Werten bzw "" als Start-Array für den score
   **/
  const generateScore = (game) => {
    let scoreArray = [];
    for (let i = 0; i < game.rows.length; i++) {
      scoreArray[i] = [];
      for (let j = 0; j < chosenPlayers.length; j++) {
        scoreArray[i][j] = game.rows[i].default ? +game.rows[i].default : '';
      }
    }
    return scoreArray;
  };

  return (
    <>
      <NavBar returnToView={goBack}></NavBar>
      <ViewContainer>
        {gameIsRunning && (
          <Modal
            onSubmit={() => {
              resetGame();
              setShowView(NEW_GAME_VIEW);
            }}
            onCancel={goToStartView}
          >
            <h1>Es läuft bereits ein Spiel</h1>
            <p>
              Laufendes Spiel löschen und ein neues beginnen? Der aktuelle
              Spielstand geht unwiderruflich verloren.
            </p>
          </Modal>
        )}

        {/* Wenn noch kein Spiel läuft */}
        {!gameIsRunning && (
          <>
            <h1>Neue Partie erstellen</h1>
            {/* Wenn noch kein Spiel ausgewählt wurde, wird die GamesList zum Auswählen des Game gezeigt */}
            {!chosenGame && players?.length > 0 && (
              <>
                <h2>Spiel wählen:</h2>
                <GamesList games={games} clickHandler={setChosenGame} />
              </>
            )}
            {chosenGame && players?.length > 0 && (
              <>
                <h2>Ausgewähltes Spiel:</h2>
                <GameCard name={chosenGame.name} onClick={() => {}} />
                <div className="spacer" />
                <h2>Spieler wählen:</h2>
                <PlayerList
                  players={players}
                  chosenPlayers={chosenPlayers}
                  clickHandler={togglePlayer}
                />
              </>
            )}
            {/* Wenn mindestens ein Spieler ausgewählt wurde, wird der Start-Button angezeigt */}
            {chosenPlayers.length > 0 && (
              <>
                <div className="spacer"></div>
                <div className="d-grid gap-2">
                  <Button size="lg" onClick={startGame}>
                    <i className="bi bi-play-circle-fill"></i>Start
                  </Button>
                </div>
              </>
            )}
            {(!games || games?.length === 0) && (
              <>
                <h2>Noch keine Spiele vorhanden</h2>
                <p>
                  Gehe zunächst in die Spielelsammlung und füge ein Spiel hinzu.
                </p>
              </>
            )}
            {(!players || players?.length === 0) && (
              <>
                <h2>Noch keine Spieler vorhanden</h2>
                <p>
                  Gehe zunächst in die Spielerliste und füge einen Spieler
                  hinzu.
                </p>
              </>
            )}
          </>
        )}
      </ViewContainer>
    </>
  );
}
export default NewGameView;
