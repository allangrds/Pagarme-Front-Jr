import React, { Component } from 'react';
import styles from './NotFound.styl';

export default class NotFound extends Component {
  render() {
    return (
      <div className={styles.not_found}>
        <h1 className={styles.alert_message}>Página não encontrada :(</h1>
      </div>
    );
  }
}
