import './GameCard.css';

function GameCard({ name, onClick }) {
  return (
    <div key={name} className="game-card" onClick={onClick}>
      {name}
    </div>
  );
}
export default GameCard;
