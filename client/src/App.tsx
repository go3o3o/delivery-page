import React, { Component } from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import autobind from 'autobind-decorator';

import { Layout } from 'antd';

import './css/style.css';
import 'antd/dist/antd.css';

import { STORES } from './constants';
import Header from './components/Header';
import Body from './components/Body';

@inject(STORES.AUTH_STORE)
@observer
@autobind
export default class App extends Component {
  render() {
    return (
      <Layout>
        <Router>
          <Header />
          <Body />
        </Router>
      </Layout>
    );
  }
}
