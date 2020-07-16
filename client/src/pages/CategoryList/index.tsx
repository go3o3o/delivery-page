import React, { Component } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { inject, observer } from 'mobx-react';

import { Layout } from 'antd';

import { PAGE_PATHS, STORES } from '../../constants';
import Header from '../../components/Header';
import StoreStore from '../../stores/store/StoreStore';
import AddressStore from '../../stores/address/AddressStore';

const { Content } = Layout;

type InjectedProps = {
  [STORES.STORE_STORE]: StoreStore;
};

@inject(STORES.STORE_STORE)
@observer
class CategoryList extends Component<InjectedProps & RouteComponentProps> {
  constructor(props: any) {
    super(props);
  }

  componentWillMount(): void {
    this.props[STORES.STORE_STORE].getCategories();
  }

  render() {
    let menuStyle = {
      display: 'table',
      borderRadius: '70%',
      backgroundColor: '#FFF',
      margin: 20,
      width: 200,
      height: 200,
      textAlign: 'center',
      float: 'left',
    };

    const { categories } = this.props[STORES.STORE_STORE];

    return (
      <>
        <Content
          style={{
            backgroundColor: '#5FBEBB',
            height: '100%',
            position: 'relative',
          }}
        >
          <div style={{ textAlign: 'center' }}>
            {categories.map(category => (
              <Link to={`${PAGE_PATHS.STORE_LISTS}/${category['seq']}`}>
                <div style={menuStyle}>
                  <span style={{ display: 'table-cell', verticalAlign: 'middle' }}>
                    {category['category_name']}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </Content>
      </>
    );
  }
}

export default CategoryList;
