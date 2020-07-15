import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router';
import { inject, observer } from 'mobx-react';
import InfiniteScroll from 'react-infinite-scroll-component';

import { Layout, List, Avatar, Spin } from 'antd';

import { PAGE_PATHS, STORES } from '../../constants';
import Header from '../../components/Header';
import StoreStore from '../../stores/store/StoreStore';

const { Content } = Layout;

type InjectedProps = {
  [STORES.STORE_STORE]: StoreStore;
} & RouteComponentProps<{ category: string }>;

class StoreList extends Component<InjectedProps & RouteComponentProps> {
  constructor(props: any) {
    super(props);
    this.state = {
      stores: [],
      loadStores: [],
      startIndex: 0,
      endIndex: 19,
      loading: false,
      hasMore: true,
    };

    let category_seq = this.props.match.params.category;
    this.props[STORES.STORE_STORE].getStoreByCategory(category_seq);

    this.handleInfiniteOnLoad = this.handleInfiniteOnLoad.bind(this);
  }

  handleInfiniteOnLoad = () => {
    const { stores } = this.props[STORES.STORE_STORE];
    this.setState({ stores: stores });

    let storeLength = stores.length;
    let startIndex = this.state['startIndex'];
    let endIndex = this.state['endIndex'];

    if (storeLength < 20) {
      this.setState({ endIndex: storeLength });
    }

    if (storeLength < startIndex) {
      this.setState({ hasMore: false, loading: false });
      return;
    }

    if (storeLength < endIndex) {
      this.setState({ endIndex: storeLength, hasMore: false, loading: false });
    }

    setTimeout(() => {
      this.setState({
        loadStores: this.state['loadStores'].concat(
          this.state['stores'].slice(startIndex, endIndex),
        ),
      });
    }, 500);

    this.setState({ startIndex: startIndex + 20 });
    this.setState({ endIndex: endIndex + 20 });
  };

  render() {
    return (
      <>
        <Header />
        <Content style={{ backgroundColor: '#FFF', height: '100vh', position: 'relative' }}>
          <InfiniteScroll
            dataLength={this.state['loadStores'].length}
            next={this.handleInfiniteOnLoad}
            hasMore={!this.state['loading'] && this.state['hasMore']}
            loader={
              <div style={{ bottom: 40, width: '100%', textAlign: 'center' }}>
                <Spin />
              </div>
            }
          >
            <List
              dataSource={this.state['loadStores']}
              bordered
              renderItem={store => (
                <List.Item key={store['seq']}>
                  <img src={require(`../../components/assets/logo.png`)} alt="logo" />
                  <List.Item.Meta
                    // avatar={}
                    title={<a href="https://ant.design">{store['store_name']}</a>}
                    description={store['description']}
                  />
                </List.Item>
              )}
            ></List>
          </InfiniteScroll>
        </Content>
      </>
    );
  }
}

export default inject(STORES.STORE_STORE)(observer(StoreList));
