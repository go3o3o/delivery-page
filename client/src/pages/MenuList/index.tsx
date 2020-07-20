import React, { Component, useEffect } from 'react';
import { RouteComponentProps } from 'react-router';
import { inject, observer } from 'mobx-react';

import { STORES } from '../../constants';
import { MenuDto } from '../../services/MenuService';
import MenuStore from '../../stores/menu/MenuStore';
import StoreStore from '../../stores/store/StoreStore';

type MenuProps = {
  [STORES.MENU_STORE]?: MenuStore;
  [STORES.STORE_STORE]?: StoreStore;
} & RouteComponentProps<{ store_seq: string }>;

function MenuList(props: MenuProps) {
  useEffect(() => {
    props[STORES.STORE_STORE].getStore(props.match.params.store_seq);
    props[STORES.MENU_STORE].getMenu(props.match.params.store_seq);
  }, []);

  const { store } = props[STORES.STORE_STORE];
  const { menu } = props[STORES.MENU_STORE];

  return (
    <>
      <div />
    </>
  );
}

export default inject(STORES.MENU_STORE)(observer(MenuList));
