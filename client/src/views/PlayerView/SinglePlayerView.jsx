import Button from 'react-bootstrap/Button';
import PlayerHistory from './PlayerHistory';
import Modal from '../../components/Modal';
import { useState } from 'react';
import Avatar from '../../components/Avatar';

export default function SinglePlayerView({
  player,
  editPlayer,
  deletePlayer,
  closeView,
}) {
  const [showModal, setShowModal] = useState(false);

  function deletePlayerHandler(player) {
    deletePlayer(player);
    closeView();
  }
  return (
    <>
      {player && (
        <>
          {showModal && (
            <Modal
              onSubmit={() => deletePlayerHandler(player)}
              onCancel={() => setShowModal(false)}
            >
              <h1>SpielerIn {player.name} wirklich löschen?</h1>
              <p>
                Alle Spielstände gehen
                <br />
                unwiderruflich verloren.
              </p>
              <div className="small-spacer" />
            </Modal>
          )}
          {!showModal && (
            <>
              <hr></hr>
              <div id="player-header">
                <Avatar
                  avatar={player.avatar}
                  player_id={player._id}
                  onClick={() => {}}
                  getClassName={() => {}}
                ></Avatar>
                <div>
                  <h1 style={{ color: player.color }}>{player.name}</h1>
                </div>
              </div>
              <hr></hr>
              {player.played_games && player.played_games.length > 0 && (
                <PlayerHistory player={player} />
              )}
              <div className="d-grid gap-2">
                <Button variant="primary" size="lg" onClick={editPlayer}>
                  Bearbeiten
                </Button>
                <Button
                  variant="danger"
                  size="lg"
                  onClick={() => setShowModal(true)}
                >
                  Löschen
                </Button>
              </div>
            </>
          )}
        </>
      )}
    </>
  );
}
