import React, { Component } from 'react';
import styles from './Done.styl';
import styles_others from './../../../../assets/css/others/classes.styl';
import styles_checkout from './../Checkout/Checkout.styl';
import Numeral from './../../../helpers/Numeral';
import { store, actions } from './../../../flux';
import {
  Alert,
  Container,
  Row,
  Col,
  Card,
  CardText,
  CardBlock,
  CardTitle,
  Table
} from 'reactstrap';

export default class Done extends Component {
  constructor() {
    super();
    this.state = { items: [] };
  }

  componentDidMount() {
    const gamesList = store.checkout.getGamesList();
    const totalPrice = gamesList.reduce(
      (prevVal, elem) => prevVal + elem.price,
      0
    );
    const transaction = store.transaction.getTransaction();

    actions.checkout.resetCheckout().then(() => {
      store.checkout.emit('checkoutGamesModified');
    });

    actions.transaction.resetTransaction();

    if (transaction.items) {
      this.setState({
        totalPrice,
        items: transaction.items
      });
    }
  }

  render() {
    const { totalPrice, items } = this.state;

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
              <Alert color="success">Parabéns! Você fechou seu pedido.</Alert>
            </Col>
          </Row>
          <Row>
            <Col
              xs="12"
              sm="12"
              md="4"
              className={styles_others.margin_bottom_20}
            >
              <Card>
                <CardBlock>
                  <CardTitle>Fornecedor</CardTitle>
                  <CardText>
                    <p className={styles.done_card_rate_item}>
                      Percentual: 60%
                    </p>
                    <p className={styles.done_card_rate_item}>
                      Valor a receber:{' '}
                      {totalPrice && (
                        <Numeral value={totalPrice * 0.6} format="$ 0,0.00" />
                      )}
                    </p>
                  </CardText>
                </CardBlock>
              </Card>
            </Col>
            <Col
              xs="12"
              sm="12"
              md="4"
              className={styles_others.margin_bottom_20}
            >
              <Card>
                <CardBlock>
                  <CardTitle>Eu</CardTitle>
                  <CardText>
                    <p className={styles.done_card_rate_item}>
                      Percentual: 25%
                    </p>
                    <p className={styles.done_card_rate_item}>
                      Valor a receber:{' '}
                      {totalPrice && (
                        <Numeral value={totalPrice * 0.25} format="$ 0,0.00" />
                      )}
                    </p>
                  </CardText>
                </CardBlock>
              </Card>
            </Col>
            <Col
              xs="12"
              sm="12"
              md="4"
              className={styles_others.margin_bottom_20}
            >
              <Card>
                <CardBlock>
                  <CardTitle>Meu amigo</CardTitle>
                  <CardText>
                    <p className={styles.done_card_rate_item}>
                      Percentual: 15%
                    </p>
                    <p className={styles.done_card_rate_item}>
                      Valor a receber:{' '}
                      {totalPrice && (
                        <Numeral value={totalPrice * 0.15} format="$ 0,0.00" />
                      )}
                    </p>
                  </CardText>
                </CardBlock>
              </Card>
            </Col>
          </Row>
          {items.length > 0 && (
            <Row>
              <Col md="12">
                <Table>
                  <thead>
                    <tr>
                      <th>Nome do jogo</th>
                      <th>Preço</th>
                    </tr>
                  </thead>
                  <tfoot>
                    <tr>
                      <td
                        colSpan="2"
                        className={styles_checkout.checkout_total_price}
                      >
                        <Numeral value={totalPrice} format="$ 0,0.00" />
                      </td>
                    </tr>
                  </tfoot>
                  <tbody>
                    {items.map(({ title, unit_price }) => [
                      <tr>
                        <td>
                          <p>{title}</p>
                        </td>
                        <td>
                          <Numeral value={unit_price / 100} format="$ 0,0.00" />
                        </td>
                      </tr>
                    ])}
                  </tbody>
                </Table>
              </Col>
            </Row>
          )}
        </Container>
      </div>
    );
  }
}
