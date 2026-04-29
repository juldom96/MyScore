import Tooltip from 'react-bootstrap/Tooltip';
import { useState, useRef } from 'react';
import Overlay from 'react-bootstrap/Overlay';

export default function ScoreTableRow({
  row,
  rowIndex,
  chosenPlayers,
  score,
  onChange,
  hasInfos,
}) {
  const [show, setShow] = useState(false);

  const target = useRef(null);

  function clickHandler() {
    setShow((prev) => !prev);
    setTimeout(() => setShow(false), 4000);
  }
  return (
    <tr key={rowIndex}>
      {hasInfos && (
        <>
          {row.info && (
            <>
              <td className="no-right-border" key={rowIndex + '-name'}>
                {row.name}
              </td>
              <td className="no-left-border" key={rowIndex + '-info'}>
                <div ref={target} onClick={clickHandler}>
                  <i className="bi bi-info-circle-fill"></i>
                </div>
                <Overlay target={target.current} show={show} placement="right">
                  {(props) => (
                    <Tooltip
                      id={rowIndex + '-tooltip'}
                      key={rowIndex + '-tooltip'}
                      {...props}
                    >
                      {row.info}
                    </Tooltip>
                  )}
                </Overlay>
              </td>
            </>
          )}
          {!row.info && (
            <td colSpan={2} key={rowIndex + '-name'}>
              {row.name}
            </td>
          )}
        </>
      )}
      {!hasInfos && (
        <td colSpan={2} key={rowIndex + '-name'}>
          {row.name}
        </td>
      )}

      {/* Eine Tabellen-Zelle pro Spieler in chosenPlayers */}
      {chosenPlayers.map((player, playerIndex) => {
        return (
          <td key={row.name + playerIndex + 'td'}>
            {/* Input zum eintragen von Werten */}
            <input
              key={row.name + playerIndex}
              type="number"
              autoComplete="off"
              placeholder="0"
              onChange={(e) => {
                onChange(e, rowIndex, playerIndex);
              }}
              value={score[rowIndex][playerIndex]}
            ></input>
          </td>
        );
      })}
    </tr>
  );
}
