const checkout = function() {
  let gamesList = [];
  let totalAmount = 0;

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

    overwriteGamesList(data) {
      gamesList = data;
    }
  };
};

export default checkout();
