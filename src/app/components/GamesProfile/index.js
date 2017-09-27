import React, { Component } from 'react';
import { actions, store } from './../../flux';
import { Container, Row, Col, Button } from 'reactstrap';
import styles from './../../../assets/css/pages/games_detail.styl';
import Numeral from './../../helpers/Numeral';
import classNames from 'classnames';

export default class GamesProfile extends Component {
  constructor() {
    super();
    this.state = {};
  }

  filterArray(array, gameId) {
    const game = array.filter(arr => {
      return arr.id == gameId;
    });

    return game[0];
  }

  componentDidMount() {
    actions.games.get().then(() => {
      const gamesList = store.games.getGamesList();
      const gameId = this.props.match.params.id;
      const game = this.filterArray(gamesList, gameId);

      this.setState({
        id: game.id,
        name: game.name,
        image: game.image,
        price: game.price,
        description: game.description
      });
    });
  }

  render() {
    const { id, name, image, price, description } = this.state;

    return (
      <div className={styles.game_detail}>
        <Container>
          <Row>
            <Col md="4" xs="12">
              <img src={image && image.cover} alt={name} className={styles.game_detail_cover}/>
            </Col>
            <Col md="8" xs="12">
              <h1>{name ? name : 'Carregando nome...'}</h1>
              <p className={styles.game_detail_description}>{description ? description.long : 'Carregando descrição...'}</p>
              <p className={styles.game_detail_price}>{price ? <Numeral value={price} format="$ 0,0.00" /> : 'Carregando preço...'}</p>
              <Button color="primary" size="lg">
                <i className={classNames("fa fa-shopping-cart", styles.game_detail_add_icon)}aria-hidden="true" />
                Adicionar ao carrinho
              </Button>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
