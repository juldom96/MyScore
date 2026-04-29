import { Button } from 'react-bootstrap';
import { useState } from 'react';
import Modal from '../../components/Modal';
export default function SingleGameView({ game, deleteGame, closeView }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {!showModal && (
        <>
          <h1>{game.name}</h1>
          <h2>Kategorien</h2>
          <ul>
            {game.rows.map((row) => {
              return (
                <li key={row.name}>
                  {row.name}
                  {row.info && <>: {row.info}</>}
                </li>
              );
            })}
          </ul>
          <div className="d-grid gap-2">
            <Button variant="danger" onClick={() => setShowModal(true)}>
              Löschen
            </Button>
          </div>
        </>
      )}

      {showModal && (
        <Modal
          onSubmit={() => {
            deleteGame(game._id);
            closeView();
          }}
          onCancel={() => setShowModal(false)}
        >
          <h1>Spiel {game.name} wirklich löschen?</h1>
        </Modal>
      )}
    </>
  );
}
