import { GET } from './../../helpers/http';

const games = {
  get(params) {
    return GET('https://demo9635479.mockable.io/games').then(res => ({
      data: res,
      actionType: 'GAMESGET'
    }));
  }
};

export default games;
