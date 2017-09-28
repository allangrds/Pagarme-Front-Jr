import React, { Component } from 'react';
import { Container, Button, Jumbotron } from 'reactstrap';
import styles from './../../../assets/css/pages/call_to_action_game.styl';
import { actions, store } from './../../flux';
import { Link } from 'react-router-dom';

export default class CallToActionGame extends Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    actions.games.get().then(() => {
      store.games.emit('loadGamesList');

      const gamesList = store.games.getGamesList();

      this.setState({
        id: gamesList[0].id,
        name: gamesList[0].name,
        image: gamesList[0].image,
        description: gamesList[0].description
      });
    });
  }

  render() {
    const { id, name, image, description } = this.state;
    const headerStyle = {
      backgroundImage: `url(${image && image.long})`
    };

    return (
      <div className={styles.call_to_action_game} style={headerStyle}>
        <Jumbotron className={styles.dark_jumbotron}>
          <Container>
            <h1 className="display-6">{name ? name : 'Carregando nome...'}</h1>
            <p className="lead">
              {description ? description.short : 'Carregando descrição...'}
            </p>
            <p className="lead">
              <Link className="btn btn-lg btn-primary" to={{ pathname: `/games/${id}` }}>
                Ver detalhes
              </Link>
            </p>
          </Container>
        </Jumbotron>
      </div>
    );
  }
}
