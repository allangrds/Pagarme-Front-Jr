import React, { Component } from 'react';
import {
  Container,
  Row,
  Col,
  Card,
  CardImg,
  CardText,
  CardBlock,
  CardTitle,
  CardSubtitle,
  Button
} from 'reactstrap';
import { actions, store } from './../../flux';
import styles from './../../../assets/css/pages/call_to_action_game.styl';
import Numeral from './../../helpers/Numeral';

export default class List extends Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    store.games.on('loadGamesList', () =>
      this.setState({
        gamesList: store.games.getGamesList()
      })
    );
  }

  render() {
    const { gamesList } = this.state;

    return (
      <div>
        <Container>
          <Row>
            {gamesList &&
              gamesList.map(
                ({ id, name, description, price, image }, index) => (
                  <Col lg="3" md="4" sm="6" xs="6" key={id}>
                    <Card>
                      <CardImg
                        top
                        src={image && image.cover}
                        alt={name}
                        className={styles.game_item_image}
                      />
                      <CardBlock>
                        <CardTitle>{name}</CardTitle>
                        <CardText>{description.short}</CardText>
                        <CardText className={styles.game_item_price}>
                          <Numeral value={price} format="$ 0,0.00" />
                        </CardText>
                        <a
                          className="btn btn-md btn-primary"
                          href={`/games/${id}`}
                        >
                          Ver detalhes
                        </a>
                      </CardBlock>
                    </Card>
                  </Col>
                )
              )}
          </Row>
        </Container>
      </div>
    );
  }
}