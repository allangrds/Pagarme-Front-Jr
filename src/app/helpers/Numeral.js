import React, { Component, PropTypes } from 'react';
import numeral from 'numeral';

export default class Numeral extends Component {
  constructor() {
    super();
    numeral.locale('pt-br', require('numeral/locales/pt-br'));
  }

  render() {
    const { format, value } = this.props;
    const validValue = !isNaN(value) ? value : 0;

    return <p>{numeral(validValue).format(format)}</p>;
  }
}

Numeral.propTypes = {
  format: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired
};
