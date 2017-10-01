const transaction = {
  registerTransaction(game) {
    return {
      data: game,
      actionType: 'TRANSACTIONREGISTER'
    };
  },

  resetTransaction() {
    return {
      actionType: 'TRANSACTIONRESET'
    };
  }
};

export default transaction;
