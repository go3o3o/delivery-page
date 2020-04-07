import React, { Component } from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import autobind from 'autobind-decorator';

import 'antd/dist/antd.css';

import { PAGE_PATHS, STORES } from './constants';
import Login from './pages/Signin';
import CategoryList from './pages/CategoryList';

import 'antd/dist/antd.css';

@inject(STORES.AUTH_STORE)
@observer
@autobind
export default class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path={PAGE_PATHS.CATEGORY_LISTS} component={CategoryList} />
          <Route path={PAGE_PATHS.SIGNIN} component={Login} />

          <Route path={`${PAGE_PATHS.CATEGORY_LISTS}`} component={CategoryList} />

          <Redirect from="/" to={PAGE_PATHS.CATEGORY_LISTS} />
        </Switch>
      </Router>
    );
  }
}
