import NavBar from '../../components/NavBar';
import NewGameForm from './NewGameForm';
import SingleGameView from './SingleGameView';
import GamesList from '../../components/GamesList';
import ViewContainer from '../../components/ViewContainer';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import './GamesView.css';

function GamesView({ games, addGame, deleteGame, goToStartView }) {
  const SHOW_GAME = 'showGame';
  const [game, setGame] = useState(null);
  const [mode, setMode] = useState(null);
  const ADD_NEW = 'add_new_game';

  function openGame(game) {
    setGame(game);
    setMode(SHOW_GAME);
  }
  function getNavigation() {
    switch (mode) {
      case ADD_NEW:
        setMode(null);
        break;
      case SHOW_GAME:
        setMode(null);
        break;
      default:
        goToStartView();
    }
  }
  function renderSwitch() {
    switch (mode) {
      case ADD_NEW:
        return (
          <NewGameForm
            games={games}
            addGame={addGame}
            goBack={getNavigation}
          ></NewGameForm>
        );
      case SHOW_GAME:
        return (
          <SingleGameView
            game={game}
            deleteGame={deleteGame}
            closeView={() => setMode(null)}
          ></SingleGameView>
        );
      default:
        return (
          <>
            <h1>Spielesammlung</h1>
            <GamesList games={games} clickHandler={openGame} />
            <div className="spacer" />
            <div className="d-grid gap-2">
              <Button
                variant="primary"
                size="lg"
                onClick={() => setMode(ADD_NEW)}
              >
                +<i className="bi bi-dice-5"></i>Neues Spiel
              </Button>
            </div>
          </>
        );
    }
  }
  return (
    <>
      <NavBar returnToView={getNavigation}> </NavBar>
      <ViewContainer>{renderSwitch()}</ViewContainer>
    </>
  );
}
export default GamesView;
