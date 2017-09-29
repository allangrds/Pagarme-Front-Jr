import React, { Component } from 'react';
import { Container, Row, Col, Button, Table, Alert } from 'reactstrap';
import styles from './Checkout.styl';
import { actions, store } from './../../../flux';
import Numeral from './../../../helpers/Numeral';
import classNames from 'classnames';
import pagarme from 'pagarme';
import { Redirect } from 'react-router-dom';
import Loading from './Loading';
import { ToastContainer, ToastMessage } from 'react-toastr';
const ToastMessageFactory = React.createFactory(ToastMessage.animation);

export default class Checkout extends Component {
  constructor() {
    super();
    this.state = { loading: false };
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

  makePagarmeTransaction() {
    let { totalPrice } = this.state;

    totalPrice *= 100;
    totalPrice = parseInt(totalPrice.toFixed(0));

    this.setState({ loading: true });

    pagarme.client
      .connect({ api_key: 'ak_test_LruwUrqpEUK9qhGhSKDteaFg894egM' })
      .then(client =>
        client.transactions
          .create({
            amount: totalPrice,
            customer: {
              external_id: '#3311',
              name: 'Morpheus Fishburne',
              type: 'individual',
              country: 'br',
              email: 'mopheus@nabucodonozor.com',
              documents: [
                {
                  type: 'cpf',
                  number: '00000000000'
                }
              ],
              phone_numbers: ['+5511999998888', '+5511888889999'],
              birthday: '1965-01-01'
            },
            billing: {
              name: 'Trinity Moss',
              address: {
                country: 'br',
                state: 'sp',
                city: 'Cotia',
                neighborhood: 'Rio Cotia',
                street: 'Rua Matrix',
                street_number: '9999',
                zipcode: '06714360'
              }
            },
            items: [
              {
                id: 'r123',
                title: 'Red pill',
                unit_price: 10000,
                quantity: 1,
                tangible: true
              },
              {
                id: 'b123',
                title: 'Blue pill',
                unit_price: 10000,
                quantity: 1,
                tangible: true
              }
            ],
            card_number: '4111111111111111',
            card_holder_name: 'abc',
            card_expiration_date: '1225',
            card_cvv: '123',
            split_rules: [
              {
                recipient_id: 're_cj83vzn8y02p4jb6exgeepjvn',
                percentage: 60,
                liable: true,
                charge_processing_fee: true
              },
              {
                recipient_id: 're_cj83vxw0z02l0jp6etrgf6y2q',
                percentage: 25,
                liable: true,
                charge_processing_fee: true
              },
              {
                recipient_id: 're_cj83vz1ce02giof6dyduizo7b',
                percentage: 15,
                liable: true,
                charge_processing_fee: true
              }
            ]
          })
          .then(res => {
            this.resetCheckoutValues()
              .then(() => {
                store.checkout.emit('insertedGameToCheckout');

                this.redirectToDone();
              })
              .catch(() => {
                this.redirectToDone();
              });
          })
          .catch(() => {
            this.setState({ loading: false });
            this.refs.container.error('Erro', 'Pedido não concluido', 'error');
          })
      );
  }

  redirectToDone() {
    const url = '/done';
    this.props.history.push(url);
  }

  resetCheckoutValues() {
    return actions.checkout.resetCheckout();
  }

  render() {
    const { amount, totalPrice, gamesList, loading } = this.state;

    return loading ? (
      <Loading />
    ) : (
      <div className={styles.checkout}>
        <ToastContainer
          toastMessageFactory={ToastMessageFactory}
          ref="container"
          className="toast-top-right"
        />
        <Container>
          <Row>
            <Col md="12">
              <h1 className={styles.checkout_title}>Checkout</h1>
            </Col>
          </Row>
          <Row>
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
                  <Button
                    className="pull-right"
                    size="lg"
                    color="success"
                    onClick={this.makePagarmeTransaction.bind(this)}
                  >
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
