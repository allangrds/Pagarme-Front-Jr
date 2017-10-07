import React, { PropTypes, Component } from 'react';
import numeral from 'numeral';

numeral.locale('pt-br', require('numeral/locales/pt-br'));

const Numeral = ({ format, value }) => {
  return <span>{numeral(value).format(format)}</span>;
};

Numeral.propTypes = {
  format: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired
};

export default Numeral;
