import React, { Component } from 'react';
import CallToActionGame from './CallToActionGame';
import List from './List';

export default class GamesList extends Component {
  render() {
    return (
      <div>
        <CallToActionGame />
        <List />
      </div>
    );
  }
}
