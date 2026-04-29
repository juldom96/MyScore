import PlayerCard from './PlayerCard';

export default function PlayerList({ players, chosenPlayers, clickHandler }) {
  return (
    <>
      {players && (
        <>
          {players.map((player) => {
            return (
              <PlayerCard
                player={player}
                chosenPlayers={chosenPlayers}
                key={player._id + '-card'}
                onClick={() => {
                  clickHandler(player);
                }}
              ></PlayerCard>
            );
          })}
        </>
      )}
    </>
  );
}
