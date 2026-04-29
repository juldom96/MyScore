import ScoreTableHeader from './ScoreTableHeader';
import ScoreTableBody from './ScoreTableBody';
import { useEffect } from 'react';

function ScoreTable({
  chosenGame,
  chosenPlayers,
  score,
  setScore,
  totals,
  setTotals,
}) {
  //aktualisiert den score im localstroage, sobald sich dieser ändert
  useEffect(() => {
    localStorage.setItem('score', JSON.stringify(score));
  }, [score]);
  useEffect(() => {
    localStorage.setItem('totals', JSON.stringify(totals));
  }, [totals]);

  //Eintrag in Input aktualisiert state "score"
  function handleScoreChange(e, row, col) {
    const newScore = [...score];
    newScore[row][col] = e.target.value;
    setScore(newScore);
    updateTotals(col, newScore);
  }
  function updateTotals(col, newScore) {
    const newTotals = [...totals];
    let newTotal = 0;
    for (let i = 0; i < newScore.length; i++) {
      newTotal += +score[i][col] ? +score[i][col] : 0;
    }
    newTotals[col] = newTotal;
    setTotals(newTotals);
  }

  return (
    <div id="score-table-container">
      <table id="score" className="styled-table">
        <ScoreTableHeader chosenPlayers={chosenPlayers} />
        <ScoreTableBody
          chosenGame={chosenGame}
          chosenPlayers={chosenPlayers}
          score={score}
          onChange={handleScoreChange}
          totals={totals}
          setTotals={setTotals}
        />
      </table>
      <span></span>
    </div>
  );
}
export default ScoreTable;
