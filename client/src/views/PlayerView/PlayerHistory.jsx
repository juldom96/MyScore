export default function PlayerHistory({ player }) {
  return (
    <>
      <table className="styled-table">
        <thead>
          <tr key="head">
            <th key="game-name">Spiel</th>
            <th key="game-count">Partien</th>
            <th key="win-count">Siege</th>
          </tr>
        </thead>
        <tbody>
          {player.played_games?.map((game) => {
            return (
              <tr key={game.game + '-row'}>
                <td key={game.game}>{game.game}</td>
                <td key={game.game + '-count'} className="count">
                  {game.times_played}
                </td>
                <td key={game.game + '-wins'} className="count">
                  {game.wins}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
