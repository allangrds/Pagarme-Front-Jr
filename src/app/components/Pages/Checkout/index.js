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
    const totalPrice = this.calculateTotalPrice(gamesList);

    this.setState({
      gamesList,
      amount,
      totalPrice
    });
  }

  calculateTotalPrice(gamesList) {
    const totalPrice = gamesList.reduce(
      (prevVal, elem) => prevVal + elem.price,
      0
    );

    return totalPrice;
  }

  parseToCents(value) {
    value *= 100;
    value = parseInt(value.toFixed(0));

    return value;
  }

  createTransactionItems(gamesList) {
    const items = gamesList.map(({ id, name, price }) => {
      price = this.parseToCents(price);

      return {
        id: id.toString(),
        title: name,
        unit_price: price,
        quantity: 1,
        tangible: true
      };
    });

    return items;
  }

  makePagarmeTransaction() {
    let { totalPrice, gamesList } = this.state;
    const items = this.createTransactionItems(gamesList);

    totalPrice = this.parseToCents(totalPrice);

    this.setState({ loading: true });

    let transactionObj = {
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
    };
    transactionObj['items'] = items;

    pagarme.client
      .connect({ api_key: 'ak_test_LruwUrqpEUK9qhGhSKDteaFg894egM' })
      .then(client =>
        client.transactions
          .create(transactionObj)
          .then(res => {
            actions.transaction
              .registerTransaction(res)
              .then(() => {
                this.redirectToDone();
              })
              .catch(() => {
                this.redirectToDone();
              });
          })
          .catch(() => {
            this.setState({ loading: false });
            this.showNotification('Erro', 'Pedido não concluido', 'error');
          })
      );
  }

  redirectToDone() {
    const url = '/done';
    this.props.history.push(url);
  }

  findGameToRemove(array, length, gameToRemoveId) {
    let gameToRemoveInArray = null;

    for (let i = 0; i < length; i++) {
      if (array[i].id == gameToRemoveId) {
        gameToRemoveInArray = i;
        break;
      }
    }

    return gameToRemoveInArray;
  }

  removeGame(e) {
    const button = e.currentTarget;
    const gameToRemoveId = button.getAttribute('data-id');
    const gamesList = store.checkout.getGamesList();
    let gamesListLength = gamesList.length;
    let gameToRemoveInArray = this.findGameToRemove(
      gamesList,
      gamesListLength,
      gameToRemoveId
    );

    gamesList.splice(gameToRemoveInArray, 1);
    gamesListLength = gamesList.length;

    const totalPrice = this.calculateTotalPrice(gamesList);

    this.overwriteCheckout(gamesList, gamesListLength, totalPrice);
  }

  overwriteCheckout(gamesList, gamesListLength, totalPrice) {
    this.setState({
      gamesList,
      amount: gamesListLength,
      totalPrice
    });

    actions.checkout.overwriteCheckout(gamesList).then(() => {
      store.checkout.emit('checkoutGamesModified');
      this.showNotification('Sucesso', 'Game excluído', 'success');
    });
  }

  showNotification(title, message, type) {
    const options = {
      closeButton: true,
      timeOut: 1000
    };

    if (type === 'success')
      this.refs.container.success(message, title, options);
    else this.refs.container.error(message, title, options);
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
                      <th />
                      <th>Nome do jogo</th>
                      <th>Quantidade</th>
                      <th>Preço</th>
                    </tr>
                  </thead>
                  <tfoot>
                    <tr>
                      <td
                        colSpan="4"
                        className={classNames(styles.checkout_total_price)}
                      >
                        <Numeral value={totalPrice} format="$ 0,0.00" />
                      </td>
                    </tr>
                  </tfoot>
                  <tbody>
                    {gamesList.map(({ id, name, image, price }) => [
                      <tr>
                        <td>
                          <Button
                            data-id={id}
                            size="md"
                            color="danger"
                            onClick={this.removeGame.bind(this)}
                          >
                            <i className="fa fa-times" aria-hidden="true" />
                            <span
                              className={
                                styles.checkout_item_remove_button_text
                              }
                            >
                              Remover
                            </span>
                          </Button>
                        </td>
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
