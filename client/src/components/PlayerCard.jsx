import './PlayerCard.css';
import Avatar from './Avatar';

function PlayerCard({ player, chosenPlayers, onClick }) {
  return (
    <div
      className={'player-card'}
      style={
        chosenPlayers?.includes(player)
          ? {
              border: '2px solid transparent',
              backgroundColor: 'rgb(52, 54, 82)',
            }
          : { border: '2px solid ' + player.color, color: player.color }
      }
      onClick={onClick}
    >
      <Avatar
        avatar={player.avatar}
        player_id={player._id}
        onClick={() => {}}
        getClassName={() => {}}
      />
      {player.name}
    </div>
  );
}
export default PlayerCard;
