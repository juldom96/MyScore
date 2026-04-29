export default function SingleHistoryEntry({ historyElement, players }) {
  const date = new Date(historyElement.date);
  const formattedDate = date.toLocaleString('de-DE', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <>
      <h2>{historyElement.game}</h2>
      <h3>({formattedDate})</h3>
      <table className="styled-table">
        <thead>
          <tr>
            <th>
              <i className="bi bi-bar-chart-fill"></i>
            </th>
            <th>Spieler</th>
            <th>Punkte</th>
          </tr>
        </thead>
        <tbody>
          {historyElement.players
            // sort sortiert die Player nach Platzierung
            .sort((a, b) => a.placement - b.placement)
            .map((player) => {
              // Name des Players raussuchen
              const playerDetails = players.find(
                (p) => p._id === player.player
              );
              return (
                <tr key={player.player + ' ' + historyElement.date}>
                  <td>{player.placement}.</td>
                  <td>{playerDetails ? playerDetails.name : 'Unbekannt'}</td>
                  <td>{player.score}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
      <hr></hr>
    </>
  );
}
