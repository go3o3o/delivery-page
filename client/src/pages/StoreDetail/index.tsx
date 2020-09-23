import React, { Component } from 'react';
import { RouteComponentProps, Route } from 'react-router';
import { inject, observer } from 'mobx-react';

import { Layout, List, Avatar, Spin, Affix, Button } from 'antd';

import { STORES } from '../../constants';
import MenuStore from '../../stores/menu/MenuStore';
import StoreStore from '../../stores/store/StoreStore';

const { Content } = Layout;

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

  render() {
    return (
      <>
        <div>StoreDetail</div>
      </>
    );
  }
}

export default StoreDetail;
