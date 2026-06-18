import Button from 'react-bootstrap/Button';
import ViewContainer from '../../components/ViewContainer';
import Podium from './components/Podium';
import './PodiumView.css';
import ScoreList from './components/ScoreList';
import { useEffect, useState } from 'react';

export default function PodiumView({
  goToStartView,
  game,
  resetGame,
  players,
  totals,
  addHistoryItem,
}) {
  const [playerOrder, setPlayerOrder] = useState([]);
  function clickHandler() {
    updateGameHistory(); //Partie in History speichern
    updatePlayerHistory(); //Spielerstatistik
    resetGame();
    goToStartView();
  }
  useEffect(getFinalPlayerOrder, [players, totals]);

  function getFinalPlayerOrder() {
    const finalPlayerOrder = totals.map((total, index) => {
      return { player: players[index], total: total };
    });
    finalPlayerOrder.sort((a, b) => b.total - a.total);

    let prevTotal;
    let prevPlacement;
    let iteration = 1;

    for (const player of finalPlayerOrder) {
      let placement;
      if (player.total === prevTotal) {
        placement = prevPlacement;
      } else {
        placement = iteration;
      }
      iteration++;
      prevTotal = player.total;
      prevPlacement = placement;
      player.placement = placement;
    }
    setPlayerOrder(finalPlayerOrder);
  }

  function updateGameHistory() {
    let playersArray = [];

    players.forEach((player, index) => {
      playersArray.push({
        player: player._id,
        score: totals[index],
        placement: playerOrder.filter(
          (element) => element.player._id === player._id
        )[0].placement,
      });
    });
    const date = new Date();
    const _id = crypto.randomUUID();
    const newHistoryEntry = {
      _id: _id,
      date: date,
      game: game.name,
      players: playersArray,
    };
    addHistoryItem(newHistoryEntry);
  }

  function updatePlayerHistory() {}

  return (
    <ViewContainer>
      <h1>Schlusswertung</h1>
      <Podium playerOrder={playerOrder} />
      <ScoreList playerOrder={playerOrder}></ScoreList>
      <div className="d-grid gap-2">
        <Button onClick={clickHandler}>
          <i className="bi bi-check-circle-fill"></i>Fertig
        </Button>
      </div>
    </ViewContainer>
  );
}
