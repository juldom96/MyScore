import ScoreTableTotal from './ScoreTableTotal';
import ScoreTableRow from './ScoreTableRow';
import { useState, useEffect } from 'react';

function ScoreTableBody({
  chosenGame,
  chosenPlayers,
  score,
  onChange,
  totals,
}) {
  const [hasInfos, setHasInfos] = useState(false);
  useEffect(() => {
    chosenGame.rows.forEach((row) => {
      if (row.info) {
        setHasInfos(true);
        return;
      }
    });
  }, [chosenGame]);
  return (
    <>
      <tbody>
        {/* Eine Tabellen-Zeile pro row im chosenGame */}
        {chosenGame.rows.map((row, rowIndex) => (
          <ScoreTableRow
            row={row}
            key={rowIndex}
            rowIndex={rowIndex}
            chosenPlayers={chosenPlayers}
            score={score}
            onChange={onChange}
            hasInfos={hasInfos}
          />
        ))}
      </tbody>
      {/* letze Zeilt zum Summieren der Werte pro Spalte=Spieler */}
      <ScoreTableTotal totals={totals} />
    </>
  );
}
export default ScoreTableBody;
