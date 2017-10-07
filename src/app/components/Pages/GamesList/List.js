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
  Button
} from 'reactstrap';
import { actions, store } from './../../../flux';
import styles from './GamesList.styl';
import styles_others from './../../../../assets/css/others/classes.styl';
import Numeral from './../../../helpers/Numeral';
import { Link } from 'react-router-dom';

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
                  <Col
                    lg="3"
                    md="6"
                    sm="6"
                    xs="12"
                    key={id}
                    className={styles_others.margin_bottom_20}
                  >
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
                        <Link
                          className="btn btn-lg btn-primary btn-block"
                          to={{ pathname: `/games/${id}` }}
                        >
                          Ver detalhes
                        </Link>
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
