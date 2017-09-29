const checkout = function() {
  let gamesList = [];
  let totalAmount = 0;
  let totalPrice = 0;

  return {
    //gamesList
    setGamesList(data) {
      gamesList.push(data);
    },

    getGamesList() {
      return gamesList;
    },

    resetGamesList() {
      gamesList = [];
    },

    //totalAmount
    increaseTotalAmount(data) {
      totalAmount += 1;
    },

    decreaseTotalAmount(data) {
      if (totalAmount > 0) totalAmount -= 1;
    },

    getTotalAmount() {
      return totalAmount;
    },

    resetTotalAmount() {
      totalAmount = 0;
    },

    //totalPrice
    increaseTotalPrice(data) {
      totalPrice = data;
    },

    decreaseTotalPrice(data) {
      if (totalPrice > 0) totalPrice -= data;
    },

    getTotalPrice() {
      return totalPrice;
    },

    resetTotalPrice() {
      totalPrice = 0;
    }
  };
};

export default checkout();
