import {
  addDataToCollection,
  getAllDataFromCollection,
  deleteDataFromCollection,
  getDataFromCollectionById,
  updateDataInCollection,
} from './indexedDb';
import { SELFIE } from '../util/enums';

export async function addPlayer(newPlayer) {
  await addDataToCollection(newPlayer, 'all_players');
  return await getAllDataFromCollection('all_players');
}

export async function deletePlayer(player) {
  if (player.avatar === SELFIE) {
    try {
      await deleteDataFromCollection({ _id: player._id }, 'images');
    } catch (error) {
      console.warn('No image deleted: ', error);
    }
  }
  await deleteDataFromCollection({ _id: player._id }, 'all_players');
  return await getAllDataFromCollection('all_players');
}

export async function updatePlayer(updatedPlayer) {
  const existingPlayer = await getDataFromCollectionById('all_players', {
    _id: updatedPlayer._id,
  });
  if (existingPlayer.avatar === SELFIE && updatedPlayer.avatar !== SELFIE) {
    try {
      await deleteDataFromCollection({ _id: updatedPlayer._id }, 'images');
    } catch (e) {
      console.warn('No selfie deleted.');
    }
  }
  await updateDataInCollection(updatedPlayer, 'all_players', {
    _id: updatedPlayer._id,
  });
  return await getAllDataFromCollection('all_players');
}

export async function addGame(newGame) {
  await addDataToCollection(newGame, 'all_games');
  return await getAllDataFromCollection('all_games');
}

export async function deleteGame(_id) {
  await deleteDataFromCollection({ _id: _id }, 'all_games');
  return await getAllDataFromCollection('all_games');
}

export async function addHistoryEntry(entry) {
  await addDataToCollection(entry, 'history');
  return await getAllDataFromCollection('history');
}

//Sehr übersichtliche Funktion, die die Spielhistorie (played_games) der an der Partie beteiligten Spieler aktualisiert
export async function updatePlayersHistories(newHistoryItem) {
  const allPlayers = await getAllDataFromCollection('all_players');
  const playersCopy = [...allPlayers];
  let updatedPlayers = [];

  //alle Spieler, die an der Partie beteiligt waren durchlaufen
  await newHistoryItem.players.forEach(async (player) => {
    //Spieler aus playersCopy heraussuchen
    let updatedPlayer = playersCopy.find(
      (playerCopy) => playerCopy._id === player.player
    );

    //Spielhistorie des Spielers
    const playedGame = updatedPlayer.played_games?.filter(
      (playedGame) => playedGame.game === newHistoryItem.game
    )[0];

    //aktualisierte Spielhistorie basierend auf dem newHistoryItem
    const updatedPlayedGame = {
      game: newHistoryItem.game,
      times_played: playedGame ? playedGame.times_played + 1 : 1,
      wins:
        +player.placement === 1 //gewonnen?
          ? playedGame //gewonnen -> wurde das spiel schon einmal gespielt?
            ? playedGame.wins + 1
            : 1
          : playedGame //verloren -> wurde das spiel schon einmal gespielt?
          ? playedGame.wins
          : 0,
    };

    if (updatedPlayer.played_games) {
      //Spieler hat schon eine Spielhistorie
      const index = updatedPlayer.played_games.indexOf(playedGame);
      const finalIndex = index > -1 ? index : updatedPlayer.played_games.length;
      updatedPlayer.played_games[finalIndex] = updatedPlayedGame;
    } else {
      //Spieler hat noch keine Spielhistorie
      updatedPlayer = {
        ...updatedPlayer,
        played_games: [updatedPlayedGame],
      };
    }
    await updateDataInCollection(
      { played_games: updatedPlayer.played_games },
      'all_players',
      { _id: updatedPlayer._id }
    );

    updatedPlayers.push(updatedPlayer);
  });

  //Spieler, die in updatedPlayers enthalten sind, ersetzen
  const updatedPlayersMap = new Map(
    updatedPlayers.map((player) => [player._id, player])
  );

  return allPlayers.map((player) =>
    updatedPlayersMap.has(player._id)
      ? updatedPlayersMap.get(player._id)
      : player
  );
}
