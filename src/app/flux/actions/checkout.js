import { GET } from './../../helpers/http';

const checkout = {
  addGame(game) {
    return {
      data: game,
      actionType: 'CHECKOUTADDGAME'
    };
  }
};

export default checkout;
