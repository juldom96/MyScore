import Button from 'react-bootstrap/Button';
import './StartView.css';
import {
  HISTORY_VIEW,
  GAMES_VIEW,
  NEW_GAME_VIEW,
  PLAYER_VIEW,
  RUNNING_GAME_VIEW,
} from '../../util/enums';

function StartView({ gameIsRunning, setShowView }) {
  return (
    <div className="d-grid gap-2" id="start-view-container">
      {gameIsRunning && (
        <Button
          onClick={() => setShowView(RUNNING_GAME_VIEW)}
          variant="primary"
          size="lg"
        >
          Fortsetzen<i className="bi bi-play-circle-fill"></i>
        </Button>
      )}
      <Button
        onClick={() => {
          setShowView(NEW_GAME_VIEW);
        }}
        variant="success"
        size="lg"
      >
        Neue Partie<i className="bi bi-plus-circle-fill"></i>
      </Button>
      <Button
        onClick={() => setShowView(GAMES_VIEW)}
        variant="warning"
        size="lg"
      >
        Spiele<i className="bi bi-dice-5-fill"></i>
      </Button>
      <Button onClick={() => setShowView(PLAYER_VIEW)} variant="info" size="lg">
        Spieler<i className="bi bi-people-fill"></i>
      </Button>
      <Button
        onClick={() => setShowView(HISTORY_VIEW)}
        variant="danger"
        size="lg"
      >
        Historie<i className="bi bi-hourglass-bottom"></i>
      </Button>
    </div>
  );
}
export default StartView;
