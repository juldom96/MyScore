function ScoreTableHeader({ chosenPlayers }) {
  return (
    <thead>
      <tr>
        <th colSpan={2}>Kategorie</th>
        {/* Ein Spaltenkopf pro Spieler */}
        {chosenPlayers.map((player) => (
          <th
            key={player._id + '-th'}
            className="centered"
            style={{ color: player.color }}
          >
            {player.name}
          </th>
        ))}
      </tr>
    </thead>
  );
}
export default ScoreTableHeader;
