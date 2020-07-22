import React, { Component } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { inject, observer } from 'mobx-react';

import { Layout, message } from 'antd';

import { PAGE_PATHS, STORES } from '../../constants';
import Header from '../../components/Header';
import StoreStore from '../../stores/store/StoreStore';
import AddressStore from '../../stores/address/AddressStore';
import { observable, action } from 'mobx';

const { Content } = Layout;

type InjectedProps = {
  [STORES.STORE_STORE]: StoreStore;
  [STORES.ADDRESS_STORE]: AddressStore;
};

@inject(STORES.STORE_STORE)
@inject(STORES.ADDRESS_STORE)
@observer
class CategoryList extends Component<InjectedProps & RouteComponentProps> {
  @observable
  goToLink = true;

  constructor(props: any) {
    super(props);
    this.onClickCategory = this.onClickCategory.bind(this);
  }

  componentWillMount(): void {
    this.props[STORES.STORE_STORE].getCategories();
  }

  @action
  onClickCategory = () => {
    let address = this.props[STORES.ADDRESS_STORE].address;
    if (address.length === 0) {
      this.goToLink = false;
    } else {
      this.goToLink = true;
    }

    if (!this.goToLink) {
      message.warn('주소를 입력해 주셔야 해용');
    }
  };

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
    const { address } = this.props[STORES.ADDRESS_STORE];
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
              <Link
                to={
                  this.goToLink && address.length > 0
                    ? `${PAGE_PATHS.STORE_LISTS}/${category['seq']}`
                    : undefined
                }
              >
                <div style={menuStyle} onClick={this.onClickCategory}>
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
