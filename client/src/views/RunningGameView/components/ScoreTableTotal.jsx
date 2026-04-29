function ScoreTableTotal({ totals }) {
  return (
    <tfoot key="totals-row">
      <tr>
        <td className="totals" colSpan={2}>
          Gesamt
        </td>

        {/* Eine Tabellen-Zelle pro Gesamtwert = pro Spieler */}
        {totals.map((total, index) => (
          <td key={index + '-total'} className="centered totals">
            {total}
          </td>
        ))}
      </tr>
    </tfoot>
  );
}

export default ScoreTableTotal;
