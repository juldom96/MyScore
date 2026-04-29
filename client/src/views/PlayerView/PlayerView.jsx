import NavBar from '../../components/NavBar.jsx';
import ViewContainer from '../../components/ViewContainer.jsx';
import PlayerList from '../../components/PlayerList.jsx';
import SinglePlayerView from './SinglePlayerView.jsx';
import NewPlayerForm from './NewPlayerForm.jsx';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import './PlayerView.css';

export default function PlayerView({
  players,
  goToStartView,
  addPlayer,
  deletePlayer,
  updatePlayer,
}) {
  const EDIT = 'edit_player';
  const HISTORY = 'show_player_history';
  const ADD_NEW = 'add_new_player';

  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [mode, setMode] = useState(null);

  function openPlayerHistory(player) {
    setSelectedPlayer(player);
    setMode(HISTORY);
  }

  function getNavigation() {
    switch (mode) {
      case EDIT:
        setMode(HISTORY);
        break;
      case ADD_NEW:
      case HISTORY:
        setMode(null);
        break;
      default:
        goToStartView();
    }
  }
  function renderSwitch() {
    switch (mode) {
      case EDIT:
        return (
          <NewPlayerForm
            existingPlayer={selectedPlayer}
            updatePlayer={updatePlayer}
            closeForm={() => {
              setMode(null);
            }}
          />
        );
      case ADD_NEW:
        return (
          <NewPlayerForm
            addPlayer={addPlayer}
            closeForm={() => setMode(null)}
          />
        );
      case HISTORY:
        return (
          <SinglePlayerView
            player={selectedPlayer}
            editPlayer={() => setMode(EDIT)}
            deletePlayer={deletePlayer}
            closeView={() => setMode(null)}
          />
        );
      default:
        return (
          <>
            <h1>Spielerliste</h1>
            <PlayerList players={players} clickHandler={openPlayerHistory} />
            <div className="small-spacer" />
            <div className="d-grid gap-2">
              <Button
                variant="primary"
                size="lg"
                onClick={() => setMode(ADD_NEW)}
              >
                <i className="bi bi-person-plus-fill margin"></i>
                Neuer Spieler
              </Button>
            </div>
          </>
        );
    }
  }
  return (
    <>
      <NavBar returnToView={getNavigation} />
      <ViewContainer>{renderSwitch()}</ViewContainer>
    </>
  );
}
