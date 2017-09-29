import McFly from 'mcfly';

//Games
import actionsGames from './actions/games';
import storeGames from './stores/games';

//Checkout
import actionsCheckout from './actions/checkout';
import storeCheckout from './stores/checkout';

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

const CheckoutStores = Flux.createStore(storeCheckout, function(payload) {
  switch (payload.actionType) {
    case 'CHECKOUTADDGAME':
      CheckoutStores.setGamesList(payload.data);
      CheckoutStores.increaseTotalAmount();
      break;

    case 'CHECKOUTRESETLIST':
      CheckoutStores.resetTotalAmount();
      CheckoutStores.resetGamesList();
      break;

    default:
      return false;
  }

  return true;
});

const aliases = {
  actions: {
    games: Flux.createActions(actionsGames),
    checkout: Flux.createActions(actionsCheckout)
  },

  store: {
    games: GamesStores,
    checkout: CheckoutStores
  }
};

module.exports = aliases;
