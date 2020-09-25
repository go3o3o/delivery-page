import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

import { Layout, Grid, Tabs, Card } from 'antd';

import { STORES } from '../../constants';
import MenuStore from '../../stores/menu/MenuStore';
import StoreStore from '../../stores/store/StoreStore';

import MenuList from './MenuList';
import StoreInfo from './StoreInfo';
import ReviewList from './ReviewList';

const { Content } = Layout;
const { TabPane } = Tabs;

type InjectedProps = {
  [STORES.MENU_STORE]?: MenuStore;
  [STORES.STORE_STORE]?: StoreStore;
  store_seq: string;
};

@inject(STORES.MENU_STORE)
@inject(STORES.STORE_STORE)
@observer
class StoreDetail extends Component<InjectedProps> {
  constructor(props: any) {
    super(props);

    const store_seq = this.props.store_seq;
    this.state = {
      store_seq: store_seq,
    };
  }

  componentWillMount() {
    this.props[STORES.STORE_STORE].getStore(this.state['store_seq']);
  }

  render() {
    const { store } = this.props[STORES.STORE_STORE];
    return (
      <Content style={{ backgroundColor: '#FFF', height: '100vh', position: 'relative' }}>
        <div>
          <Card title={store['store_name']}>{store['store_location']}</Card>
        </div>
        <div>
          <Tabs defaultActiveKey="1" size="large">
            <TabPane tab="메뉴" key="1">
              <MenuList store_seq={this.state['store_seq']} />
            </TabPane>
            <TabPane tab="정보" key="2">
              <StoreInfo store_seq={this.state['store_seq']} />
            </TabPane>
            <TabPane tab="리뷰" key="3">
              <ReviewList store_seq={this.state['store_seq']} />
            </TabPane>
          </Tabs>
        </div>
      </Content>
    );
  }
}

export default StoreDetail;
