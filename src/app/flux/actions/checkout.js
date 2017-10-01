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
  },

  overwriteCheckout(game) {
    return {
      data: game,
      actionType: 'CHECKOUTOVERWRITE'
    };
  }
};

export default checkout;
