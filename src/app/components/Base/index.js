import React, { Component } from 'react';
import {
  Navbar,
  Container,
  NavbarToggler,
  NavbarBrand,
  Collapse,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';
import styles from './Base.styl';
import classNames from 'classnames';
import { store } from './../../flux';
import { Link } from 'react-router-dom';

export default class Base extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
      amount: 0
    };
  }

  componentDidMount() {
    store.checkout.on('insertedGameToCheckout', () => {
      const gamesList = store.checkout.getGamesList();
      const amount = gamesList.length;
      
      this.setState({
        amount
      });
    });
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    const { amount } = this.state;

    return (
      <div>
        <Navbar toggleable className={styles.navbar_dark}>
          <NavbarToggler
            right
            onClick={this.toggle}
            className={styles.navbar_toggler_light}
          />
          <Container className={styles.container_min_width}>
            <Link
              className={classNames('navbar-brand', styles.navbar_link_white)}
              to="/"
            >
              Jogar.me
            </Link>
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <Link
                    className={classNames(
                      'nav-link',
                      styles.navbar_link_white,
                      styles.navbar_basket
                    )}
                    to="/checkout"
                  >
                    <i className="fa fa-shopping-basket" aria-hidden="true" />
                    Meu carrinho ({amount})
                  </Link>
                </NavItem>
              </Nav>
            </Collapse>
          </Container>
        </Navbar>
      </div>
    );
  }
}
