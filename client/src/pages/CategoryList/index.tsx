import React, { Component } from 'react';
import Header from '../../components/Header';

import { Layout, Menu } from 'antd';

import { PAGE_PATHS, STORES } from '../../constants';

type InjectedProps = {
  [STORES.CATEGORY_STORE];
};

class CategoryList extends Component {
  render() {
    return (
      <>
        <Layout>
          <div style={{ width: '100%', height: '100%', backgroundColor: '#5FBEBB' }}>
            <Header />
            <div>CategoryList</div>
          </div>
        </Layout>
      </>
    );
  }
}

export default CategoryList;
