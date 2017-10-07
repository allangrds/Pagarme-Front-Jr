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

    this.state = { isOpen: false };
  }

  componentDidMount() {
    store.checkout.on('checkoutGamesModified', () => {
      this.forceUpdate();
    });
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    const gamesList = store.checkout.getGamesList();
    const amount = gamesList.length;

    return (
      <div>
        <Navbar toggleable className={styles.navbar_dark}>
          <NavbarToggler
            right
            onClick={this.toggle.bind(this)}
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
