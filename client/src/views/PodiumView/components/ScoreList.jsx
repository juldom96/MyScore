export default function ScoreList({ playerOrder }) {
  return (
    <table className="styled-table">
      <thead>
        <tr key="ScoreListHeader">
          <th key="placement">
            <i className="bi bi-bar-chart-fill"></i>
          </th>
          <th key="player" className="player">
            Spieler
          </th>
          <th key="score">Punkte</th>
        </tr>
      </thead>
      <tbody>
        {playerOrder.map((player) => {
          return (
            <tr key={player.player._id + '-totals-tr'}>
              <td key={player.player._id + '-playcement'}>
                {player.placement + '.'}
              </td>
              <td key={player.player._id} className="player">
                {player.player.name}
              </td>
              <td key={player.player._id + '-total'}>{player.total}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
