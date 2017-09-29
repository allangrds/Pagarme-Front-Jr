import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './config/Routes';
import 'bootstrap/dist/css/bootstrap.css';

const renderDiv = document.getElementById('App');

ReactDOM.render(<Routes />, renderDiv);
