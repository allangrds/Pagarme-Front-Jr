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
import styles from './../../assets/css/components/menu.styl';
import classNames from 'classnames';
import { store } from './../flux';
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
    store.checkout.on('insertedGameToCheckout', () =>
      this.setState({
        amount: store.checkout.getTotalAmount()
      })
    );
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
          <NavbarToggler right onClick={this.toggle} />
          <Container>
            <Link className={classNames('navbar-brand', styles.navbar_link_white)} to='/'>
              Jogar.me
            </Link>
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <NavLink
                    href="/components/"
                    className={classNames(
                      styles.navbar_link_white,
                      styles.navbar_basket
                    )}
                  >
                    <i className="fa fa-shopping-basket" aria-hidden="true" />
                    Meu carrinho ({amount})
                  </NavLink>
                </NavItem>
              </Nav>
            </Collapse>
          </Container>
        </Navbar>
      </div>
    );
  }
}
