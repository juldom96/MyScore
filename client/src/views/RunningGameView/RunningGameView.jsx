import NavBar from '../../components/NavBar';
import ViewContainer from '../../components/ViewContainer';
import ScoreTable from './components/ScoreTable';
import Button from 'react-bootstrap/Button';
import PodiumView from '../PodiumView/PodiumView';
import { useState } from 'react';
import './RunningGameView.css';

function RunningGameView({
  goToStartView,
  resetGame,
  chosenGame,
  chosenPlayers,
  score,
  setScore,
  totals,
  setTotals,
  addHistoryItem,
}) {
  function clickHandler() {
    setShowPodium(true);
  }
  function updateTotals() {
    const totalsCopy = [...totals];
    // Über jede Zeile des Arrays iterieren
    for (let i = 0; i < score.length; i++) {
      // Über jede Spalte der aktuellen Zeile iterieren
      for (let j = 0; j < score[0].length; j++) {
        // Die Elemente jeder Spalte summieren
        totalsCopy[j] += score[i][j] ? +score[i][j] : 0;
      }
    }
    setTotals(totalsCopy);
    localStorage.setItem('totals', totalsCopy);
  }
  //Alle Werte aus dem localStore einlesen
  const [showPodium, setShowPodium] = useState(false);

  return (
    <>
      {/*NavBar abwandeln/Löschen ?*/}
      <NavBar
        returnToView={showPodium ? () => setShowPodium(false) : goToStartView}
      ></NavBar>
      {!showPodium && (
        <>
          <ViewContainer>
            <h1>Laufende Partie</h1>
            <h2>{chosenGame.name}</h2>
          </ViewContainer>
          <ScoreTable
            chosenGame={chosenGame}
            chosenPlayers={chosenPlayers}
            score={score}
            setScore={setScore}
            totals={totals}
            setTotals={setTotals}
            updateTotals={updateTotals}
          ></ScoreTable>
          <ViewContainer>
            <div className="d-grid gap-2">
              <Button onClick={clickHandler}>
                <i className="bi bi-bar-chart-fill"></i>Auswerten
              </Button>
            </div>
          </ViewContainer>
        </>
      )}
      {showPodium && (
        <PodiumView
          goToStartView={goToStartView}
          game={chosenGame}
          resetGame={resetGame}
          players={chosenPlayers}
          totals={totals}
          addHistoryItem={addHistoryItem}
        />
      )}
    </>
  );
}
export default RunningGameView;
