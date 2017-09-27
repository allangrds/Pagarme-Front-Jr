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

export default class Base extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    return (
      <div>
        <Navbar toggleable className={styles.navbar_dark}>
          <NavbarToggler right onClick={this.toggle} />
          <Container>
            <NavbarBrand href="/" className={styles.navbar_link_white}>
              Jogar.me
            </NavbarBrand>
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
                    Meu carrinho (2)
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
