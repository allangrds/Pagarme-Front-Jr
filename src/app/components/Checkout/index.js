import React, { Component } from "react";
import { Container, Row, Col, Button, Table, Alert } from "reactstrap";
import styles from "./../../../assets/css/pages/checkout.styl";
import { actions, store } from "./../../flux";
import Numeral from "./../../helpers/Numeral";
import classNames from "classnames";

export default class Checkout extends Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    const gamesList = store.checkout.getGamesList();
    const amount = gamesList.length;
    const totalPrice = gamesList.reduce(
      (prevVal, elem) => prevVal + elem.price,
      0
    );

    this.setState({
      gamesList,
      amount,
      totalPrice
    });
  }

  render() {
    const { amount, totalPrice, gamesList } = this.state;

    return (
      <div className={styles.checkout}>
        <Container>
          <Row>
            <h1 className={styles.checkout_title}>Checkout</h1>
            {amount > 0 ? (
              <Col md="12">
                <Table>
                  <thead>
                    <tr>
                      <th>Nome do jogo</th>
                      <th>Quantidade</th>
                      <th>Preço</th>
                    </tr>
                  </thead>
                  <tfoot>
                    <tr>
                      <td
                        colSpan="3"
                        className={classNames(styles.checkout_total_price)}
                      >
                        <Numeral value={totalPrice} format="$ 0,0.00" />
                      </td>
                    </tr>
                  </tfoot>
                  <tbody>
                    {gamesList.map(({ name, image, price }) => [
                      <tr>
                        <td>
                          <img
                            className={styles.checkout_item_image}
                            src={image.cover}
                            alt={name}
                          />
                          <p>{name}</p>
                        </td>
                        <td>1</td>
                        <td>
                          <Numeral value={price} format="$ 0,0.00" />
                        </td>
                      </tr>
                    ])}
                  </tbody>
                </Table>
                <Col md="12">
                  <Button className="pull-right" size="lg" color="success">
                    Fechar pedido
                  </Button>
                </Col>
              </Col>
            ) : (
              <Col md="12">
                <Alert color="info">
                  Hey! Você ainda não tem jogos no carrinho.
                </Alert>
              </Col>
            )}
          </Row>
        </Container>
      </div>
    );
  }
}
