const games = function() {
  let gamesList = {};

  return {
    setGamesList(data) {
      gamesList = data;
    },

    getGamesList() {
      return gamesList;
    }
  };
};

export default games();
