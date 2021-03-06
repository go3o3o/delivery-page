import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import Async from 'react-async';

import { List, Avatar, Spin, Affix, Button } from 'antd';

import Badge from '@material-ui/core/Badge';
import { withStyles } from '@material-ui/core/styles';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

import { STORES } from '../../../constants';
import { MenuDto } from '../../../services/MenuService';
import MenuStore from '../../../stores/menu/MenuStore';
import StoreStore from '../../../stores/store/StoreStore';

type InjectedProps = {
  [STORES.MENU_STORE]?: MenuStore;
  [STORES.STORE_STORE]?: StoreStore;
  store_seq: string;
};

const StyledBadge = withStyles(theme => ({
  badge: {
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}))(Badge);

// TO DO LIST
// 1. 로그인 시에만 메뉴 클릭 가능
// 2. 메뉴 담았을 때 하단 장바구니 활성화
@inject(STORES.MENU_STORE)
@inject(STORES.STORE_STORE)
@observer
class MenuList extends Component<InjectedProps> {
  constructor(props: any) {
    super(props);

    const store_seq = this.props.store_seq;
    this.state = {
      store_seq,
    };
  }

  render() {
    const loadMenuData = () => {
      let mainMenus = [];
      let menus = [];
      return this.props[STORES.MENU_STORE].getMenu(this.state['store_seq']).then(res => {
        res['data'].map(menu => {
          if (menu.main_yn === 'Y') {
            mainMenus.push({
              href: '',
              title: menu.menu_name,
              avatar: menu.menu_img,
              content: menu.menu_price,
            });
          } else {
            menus.push({
              href: '',
              title: menu.menu_name,
              avatar: menu.menu_img,
              content: menu.menu_price,
            });
          }
        });

        return { mainMenus, menus };
      });
    };

    return (
      <>
        <div style={{ textAlign: 'center' }}>
          <Async promiseFn={loadMenuData}>
            <Async.Loading>
              <div style={{ position: 'absolute', top: '50%', left: '50%' }}>
                <Spin size="large" />
              </div>
            </Async.Loading>
            <Async.Resolved>
              {(data: any) => {
                return (
                  <>
                    <div>
                      <List
                        itemLayout="vertical"
                        dataSource={data.menus}
                        renderItem={(item: any) => (
                          <List.Item
                            key={item.title}
                            extra={
                              <img
                                width={100}
                                src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                              />
                            }
                          >
                            <List.Item.Meta
                              title={<a href={item.href}>{item.title}</a>}
                              description={item.description}
                            />
                            {item.content}
                          </List.Item>
                        )}
                      />
                    </div>

                    <div style={{ height: '100vh' }}>
                      <Affix offsetTop={570} style={{ position: 'absolute', left: '85%' }}>
                        <Button
                          shape="circle"
                          style={{
                            borderColor: '#5FBEBB',
                            backgroundColor: '#5FBEBB',
                            height: 70,
                            width: 70,
                          }}
                        >
                          <StyledBadge badgeContent={4} color="secondary">
                            <ShoppingCartIcon
                              style={{ fontSize: 40, verticalAlign: 'bottom', color: '#FFF' }}
                            />
                          </StyledBadge>
                        </Button>
                      </Affix>
                    </div>
                  </>
                );
              }}
            </Async.Resolved>
          </Async>
        </div>
      </>
    );
  }
}

export default MenuList;
