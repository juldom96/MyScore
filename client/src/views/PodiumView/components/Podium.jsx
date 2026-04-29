import Avatar from '../../../components/Avatar';
import { useEffect, useState } from 'react';
import SoundComponent from '../../../components/SoundComponent';

export default function Podium({ playerOrder }) {
  const [topPlayers, setTopPlayers] = useState([]);
  useEffect(() => {
    async function getTopPlayers() {
      if (playerOrder.length === 0) {
        return;
      }
      let topPlayersArray = [];

      const first = +playerOrder[0].total;
      const second = +playerOrder[1]?.total;
      const third = +playerOrder[2]?.total;
      const fourth = +playerOrder[3]?.total;

      //1 1 1 1
      if (first === second && first === third && first === fourth) {
        return;
        //(1) 2 2 2
      } else if (second === third && third === fourth) {
        topPlayersArray.push(playerOrder[0]);
        // (1 1) 2 2 oder (1 2) 3 3
      } else if (third === fourth) {
        topPlayersArray.push(playerOrder[0]);
        if (playerOrder[1]) topPlayersArray.push(playerOrder[1]);
      } else {
        topPlayersArray.push(playerOrder[0]);
        if (playerOrder[1]) topPlayersArray.push(playerOrder[1]);
        if (playerOrder[2]) topPlayersArray.push(playerOrder[2]);
      }

      await setTopPlayers(topPlayersArray);
    }
    getTopPlayers();
  }, [playerOrder]);

  return (
    <>
      <div id="podium-container">
        {topPlayers?.length > 0 &&
          topPlayers.map((player) => (
            <div className="podium" key={player.player._id + '-podium'}>
              <Avatar
                avatar={player.player.avatar}
                player_id={player.player._id}
                onClick={() => {}}
                getClassName={() => {}}
              />
              <p>{player.player.name}</p>
              <div
                key={player.player._id}
                className={`solid placement-${player.placement}`}
                style={{ backgroundColor: player.player.color }}
              >
                {player.placement + '.'}
              </div>
            </div>
          ))}
      </div>
      <SoundComponent />
    </>
  );
}
