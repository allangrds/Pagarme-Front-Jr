import React, { Component } from "react";
import styles from "./../../../assets/css/pages/done.styl";
import Numeral from "./../../helpers/Numeral";
import { store } from './../../flux';
import {
  Alert,
  Container,
  Row,
  Col,
  Card,
  CardText,
  CardBlock,
  CardTitle,
} from 'reactstrap';

export default class Done extends Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    const gamesList = store.checkout.getGamesList();
    const totalPrice = gamesList.reduce(
      (prevVal, elem) => prevVal + elem.price,
      0
    );

    this.setState({
      totalPrice
    });
  }

  render() {
    const { totalPrice } = this.state;

    return (
      <div className={styles.done}>
        <Container>
          <Row>
            <Col md="12">
              <h1 className={styles.done_title}>Pedido realizado</h1>
            </Col>
          </Row>
          <Row>
            <Col md="12">
              <Alert color="success">
                Parabéns! Você fechou seu pedido.
              </Alert>
            </Col>
          </Row>
          <Row>
            <Col md="4">
              <Card>
                <CardBlock>
                  <CardTitle>Fornecedor</CardTitle>
                  <CardText>
                    <p className={styles.done_card_rate_item}>Percentual: 60%</p>
                    <p className={styles.done_card_rate_item}>Valor a receber: {totalPrice && <Numeral value={totalPrice * 0.6} format="$ 0,0.00" />}</p>
                  </CardText>
                </CardBlock>
              </Card>
            </Col>
            <Col md="4">
              <Card>
                <CardBlock>
                  <CardTitle>Eu</CardTitle>
                  <CardText>
                    <p className={styles.done_card_rate_item}>Percentual: 25%</p>
                    <p className={styles.done_card_rate_item}>Valor a receber: {totalPrice && <Numeral value={totalPrice * 0.25} format="$ 0,0.00" />}</p>
                  </CardText>
                </CardBlock>
              </Card>
            </Col>
            <Col md="4">
              <Card>
                <CardBlock>
                  <CardTitle>Meu amigo</CardTitle>
                  <CardText>
                    <p className={styles.done_card_rate_item}>Percentual: 15%</p>
                    <p className={styles.done_card_rate_item}>Valor a receber: {totalPrice && <Numeral value={totalPrice * 0.15} format="$ 0,0.00" />}</p>
                  </CardText>
                </CardBlock>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
