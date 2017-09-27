import McFly from 'mcfly';

import actionsGames from './actions/games';
import storeGames from './stores/games';

const Flux = new McFly();

const GamesStores = Flux.createStore(storeGames, function(payload) {
  switch (payload.actionType) {
    case 'GAMESGET':
      GamesStores.setGamesList(payload.data);
      break;

    default:
      return false;
  }

  return true;
});

const aliases = {
  actions: {
    games: Flux.createActions(actionsGames)
  },

  store: {
    games: GamesStores
  }
};

module.exports = aliases;
