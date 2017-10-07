import React, { Component } from 'react';
import styles from './NotFound.styl';

const NotFound = () => {
  return (
    <div className={styles.not_found}>
      <h1 className={styles.alert_message}>Página não encontrada :(</h1>
    </div>
  );
};

export default NotFound;
