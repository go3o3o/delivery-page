import React, { Component, useEffect } from 'react';
import { RouteComponentProps } from 'react-router';
import { inject, observer } from 'mobx-react';
import autobind from 'autobind-decorator';

import { Layout, List, Avatar, Spin } from 'antd';

import { STORES } from '../../constants';
import { MenuDto } from '../../services/MenuService';
import MenuStore from '../../stores/menu/MenuStore';
import StoreStore from '../../stores/store/StoreStore';

const { Content } = Layout;

type InjectedProps = {
  [STORES.MENU_STORE]?: MenuStore;
  [STORES.STORE_STORE]?: StoreStore;
} & RouteComponentProps<{ store_seq: string }>;

@inject(STORES.MENU_STORE)
@inject(STORES.STORE_STORE)
@observer
@autobind
class MenuList extends Component<InjectedProps & RouteComponentProps> {
  constructor(props: any) {
    super(props);

    const store_seq = this.props.match.params.store_seq;
    props[STORES.STORE_STORE].getStore(store_seq);
    props[STORES.MENU_STORE].getMenu(store_seq);
  }

  render() {
    return (
      <>
        <Content style={{ backgroundColor: '#FFF', height: '100vh', position: 'relative' }}>
          <div>메뉴 ㅎㅇ </div>
        </Content>
      </>
    );
  }
}

export default MenuList;
