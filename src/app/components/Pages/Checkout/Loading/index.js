import React, { Component } from 'react';
import styles from './Loading.styl';
import ReactLoading from 'react-loading';
import { Row, Col } from 'reactstrap';

export default class Loading extends Component {
  render() {
    return (
      <div className={styles.dark_background}>
        <Row>
          <Col md="3" className={styles.modal}>
            <h4 className={styles.processing_message}>
              Processando seu pedido
            </h4>
            <ReactLoading
              className={styles.processing_image}
              type="spin"
              color="#444"
            />
          </Col>
        </Row>
      </div>
    );
  }
}
