import React, { Component } from 'react';

import { Layout, Menu } from 'antd';

import { PAGE_PATHS, STORES } from '../../constants';
import Header from '../../components/Header';

const { Content } = Layout;

type InjectedProps = {
  [STORES.CATEGORY_STORE];
};

class CategoryList extends Component {
  render() {
    return (
      <>
        <Header />
        <Content style={{ backgroundColor: '#FFF' }}>CategoryList</Content>
      </>
    );
  }
}

export default CategoryList;
