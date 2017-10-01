import McFly from 'mcfly';

//Games
import actionsGames from './actions/games';
import storeGames from './stores/games';

//Checkout
import actionsCheckout from './actions/checkout';
import storeCheckout from './stores/checkout';

//Transaction
import actionsTransaction from './actions/transaction';
import storeTransaction from './stores/transaction';

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
      break;

    case 'CHECKOUTRESETLIST':
      CheckoutStores.resetGamesList();
      break;

    case 'CHECKOUTOVERWRITE':
      CheckoutStores.overwriteGamesList(payload.data);
      break;

    default:
      return false;
  }

  return true;
});

const TransactionStores = Flux.createStore(storeTransaction, function(payload) {
  switch (payload.actionType) {
    case 'TRANSACTIONREGISTER':
      TransactionStores.setTransaction(payload.data);
      break;

    case 'TRANSACTIONRESET':
      TransactionStores.resetTransaction();
      break;

    default:
      return false;
  }

  return true;
});

const aliases = {
  actions: {
    games: Flux.createActions(actionsGames),
    checkout: Flux.createActions(actionsCheckout),
    transaction: Flux.createActions(actionsTransaction)
  },

  store: {
    games: GamesStores,
    checkout: CheckoutStores,
    transaction: TransactionStores,
  }
};

module.exports = aliases;
