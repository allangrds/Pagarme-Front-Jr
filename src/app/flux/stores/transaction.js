const transaction = function() {
  let transaction = {};

  return {
    setTransaction(data) {
      transaction = data;
    },

    getTransaction() {
      return transaction;
    },

    resetTransaction() {
      transaction = {};
    }
  };
};

export default transaction();
