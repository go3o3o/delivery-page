import React, { Component } from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import autobind from 'autobind-decorator';

import { Layout } from 'antd';

import './css/style.css';
import 'antd/dist/antd.css';

import { STORES, PAGE_PATHS } from './constants';
import Header from './components/Header';

import Login from './pages/Signin';
import Signup from './pages/Signup';
import CategoryList from './pages/CategoryList';
import StoreList from './pages/StoreList';
import MenuList from './pages/MenuList';

@inject(STORES.AUTH_STORE)
@observer
@autobind
export default class App extends Component {
  render() {
    return (
      <Layout>
        <Router>
          <Header />

          <Switch>
            <Route path={PAGE_PATHS.SIGNIN} component={Login} />
            <Route path={PAGE_PATHS.SIGNUP} component={Signup} />

            <Route path={`${PAGE_PATHS.CATEGORY_LISTS}`} component={CategoryList} />
            <Route path={`${PAGE_PATHS.STORE_LISTS}/:category_seq`} component={StoreList} />
            <Route path={`${PAGE_PATHS.MENU_LISTS}/:store_seq `} component={MenuList} />

            <Redirect from="/" to={`${PAGE_PATHS.CATEGORY_LISTS}`} />
          </Switch>
        </Router>
      </Layout>
    );
  }
}
