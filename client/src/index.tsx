import 'reflect-metadata';

import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import App from './App';
import StoreProvider from './providers/StoreProvider';

ReactDOM.render(
  <StoreProvider>
    <App />
  </StoreProvider>,
  document.getElementById('root'),
);
