import { GET } from './../../helpers/http';

const checkout = {
  addGame(game) {
    return {
      data: game,
      actionType: 'CHECKOUTADDGAME'
    };
  },

  resetCheckout() {
    return {
      actionType: 'CHECKOUTRESETLIST'
    };
  }
};

export default checkout;
