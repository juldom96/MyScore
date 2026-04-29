import GameCard from './GameCard';

function GamesList({ games, clickHandler }) {
  return (
    <>
      {games &&
        games.map((game) => {
          return (
            <GameCard
              name={game.name}
              key={game._id}
              onClick={() => {
                clickHandler(game);
              }}
            />
          );
        })}
    </>
  );
}

export default GamesList;
