import React, { Component } from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';

import { PAGE_PATHS, STORES } from '../../constants';
import Login from '../../pages/Signin';
import Signup from '../../pages/Signup';
import CategoryList from '../../pages/CategoryList';
import StoreList from '../../pages/StoreList';

class Body extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path={PAGE_PATHS.SIGNIN} component={Login} />
          <Route path={PAGE_PATHS.SIGNUP} component={Signup} />

          <Route path={`${PAGE_PATHS.STORE_LISTS}/:category`} component={StoreList} />
          <Route path={`${PAGE_PATHS.CATEGORY_LISTS}`} component={CategoryList} />
          <Route path={`${PAGE_PATHS.STORE}/:seq`} component={CategoryList} />

          <Redirect from="/" to={`${PAGE_PATHS.CATEGORY_LISTS}`} />
        </Switch>
      </Router>
    );
  }
}

export default Body;
