import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import InfiniteScroll from 'react-infinite-scroller';

import { Layout, List, Avatar, Spin } from 'antd';

import { PAGE_PATHS, STORES } from '../../constants';
import StoreStore from '../../stores/store/StoreStore';
import AddressStore from '../../stores/address/AddressStore';
import { observable } from 'mobx';

const { Content } = Layout;

type InjectedProps = {
  [STORES.STORE_STORE]: StoreStore;
  [STORES.ADDRESS_STORE]: AddressStore;
} & RouteComponentProps<{ category_seq: string }>;

@inject(STORES.STORE_STORE)
@inject(STORES.ADDRESS_STORE)
class StoreList extends Component<InjectedProps & RouteComponentProps> {
  constructor(props: any) {
    super(props);

    let category_seq = this.props.match.params.category_seq;
    let address = this.props[STORES.ADDRESS_STORE].address;

    this.state = {
      stores: [],
      items: 20,
      hasMoreItems: true,
    };

    this.props[STORES.STORE_STORE]
      .getStoreByCategoryAndAddress({
        category_seq: category_seq,
        address: address,
      })
      .then(data => {
        if (data.length < this.state['items']) {
          this.setState({ items: data.length });
        }
        this.setState({ stores: data });
      });
  }

  showItems = () => {
    let items = [];

    for (var i = 0; i < this.state['items']; i++) {
      if (this.state['stores'][i] !== undefined) {
        items.push(
          <Link
            key={this.state['stores'][i]['seq']}
            to={`${PAGE_PATHS.MENU_LISTS}/${this.state['stores'][i]['seq']}`}
          >
            <li>{this.state['stores'][i]['store_name']}</li>
          </Link>,
        );
      }
    }
    return items;
  };

  loadMore = () => {
    if (this.state['items'] >= this.state['stores'].length) {
      this.setState({ hasMoreItems: false });
    } else {
      setTimeout(() => {
        this.setState({ items: this.state['items'] + 20 });
      }, 1000);
    }
  };

  render() {
    return (
      <Content style={{ backgroundColor: '#FFF', height: '100vh', position: 'relative' }}>
        {this.state['stores'].length > 0 && (
          <InfiniteScroll
            initialLoad
            loadMore={this.loadMore.bind(this)}
            hasMore={this.state['hasMoreItems']}
            loader={<div>loading...</div>}
          >
            {this.showItems()}
          </InfiniteScroll>
        )}
      </Content>
    );
  }
}

export default StoreList;
