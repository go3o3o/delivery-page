import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router';
import { inject, observer } from 'mobx-react';
import InfiniteScroll from 'react-infinite-scroller';
import reqwest from 'reqwest';

import { Layout, List, Avatar, Spin } from 'antd';

import { PAGE_PATHS, STORES } from '../../constants';
import Header from '../../components/Header';
import StoreStore from '../../stores/store/StoreStore';

const { Content } = Layout;

type InjectedProps = {
  [STORES.STORE_STORE]: StoreStore;
} & RouteComponentProps<{ category: string }>;

// How to I use Infinite Scroll
// 1. SELECT * FROM tb_store WHERE category_seq = ${category_seq} LIMIT ${index};
// 2. loadStores: loadStores.concat(stores.slice(startIndex, endIndex))
class StoreList extends Component<InjectedProps & RouteComponentProps> {
  constructor(props: any) {
    super(props);
    // this.state = {
    //   stores: [],
    //   loadStores: [],
    //   startIndex: 0,
    //   endIndex: 19,
    //   hasMore: true,
    // };
    this.state = {
      data: [],
      loading: false,
      hasMore: true,
    };

    let category_seq = this.props.match.params.category;
    this.props[STORES.STORE_STORE].getStoreByCategory(category_seq);

    // this.fetchData = this.fetchData.bind(this);
  }

  handleInfiniteOnLoad = () => {
    const { stores } = this.props[STORES.STORE_STORE];
    console.log(stores.length);
    if (stores.length > 14) {
      this.setState({
        hasMore: false,
        loading: false,
      });
      return;
    }
    this.setState({ data: stores });
  };

  /*
  fetchMoreData = () => {
    const { stores } = this.props[STORES.STORE_STORE];
    this.setState({ stores });

    if (this.state['stores'].length <= 20) {
      this.setState({ endIndex: this.state['stores'].length });
    }

    console.log(this.state['hasMore']);
    console.log(this.state['stores'].length, this.state['startIndex'], this.state['endIndex']);
    if (this.state['stores'].length < this.state['startIndex']) {
      this.setState({ hasMore: false });
      return;
    }

    if (this.state['stores'].length < this.state['endIndex']) {
      this.setState({ endIndex: this.state['stores'].length });
    }

    setTimeout(() => {
      this.setState({
        loadStores: this.state['loadStores'].concat(
          this.state['stores'].slice(this.state['startIndex'], this.state['endIndex']),
        ),
      });
    }, 500);

    console.log(this.state['loadStores']);
    this.setState({ startIndex: this.state['startIndex'] + 20 });
    this.setState({ endIndex: this.state['endIndex'] + 20 });

    <InfiniteScroll
      dataLength={this.state['loadStores'].length}
      next={this.fetchMoreData}
      hasMore={this.state['hasMore']}
      loader={<h4>Loading...</h4>}
      endMessage={
        <p style={{ textAlign: 'center' }}>
          <b>Yay! You have seen it all</b>
        </p>
      }
    >
      {this.state['loadStores'].map((store, index) => (
        <div key={index}>{store.seq}</div>
      ))}
    </InfiniteScroll>;
  };
  */

  render() {
    return (
      <>
        <Header />
        <Content style={{ height: '100vh', position: 'relative' }}>
          <InfiniteScroll
            initialLoad={false}
            pageStart={0}
            loadMore={this.handleInfiniteOnLoad}
            hasMore={!this.state['loading'] && this.state['hasMore']}
            useWindow={false}
          >
            <List
              dataSource={this.state['data']}
              renderItem={store => (
                <List.Item key={store['seq']}>
                  <List.Item.Meta
                    avatar={
                      <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                    }
                    title={<a href="https://ant.design">{store['store_name']}</a>}
                    description={store['description']}
                  />
                  <div>Content</div>
                </List.Item>
              )}
            >
              {this.state['loading'] && this.state['hasMore'] && (
                <div className="demo-loading-container">
                  <Spin />
                </div>
              )}
            </List>
          </InfiniteScroll>
        </Content>
      </>
    );
  }
}

export default inject(STORES.STORE_STORE)(observer(StoreList));
