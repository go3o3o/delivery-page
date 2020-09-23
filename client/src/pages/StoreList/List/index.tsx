import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroller';

import { Spin } from 'antd';

import { PAGE_PATHS, STORES } from '../../../constants';
import StoreStore from '../../../stores/store/StoreStore';

type ListProps = {
  storeStore: StoreStore;
  category_seq: string;
  address: string;
};

function List(props: ListProps) {
  const { storeStore, category_seq, address } = props;
  const [items, setItems] = useState(20);
  const [stores, setStores] = useState([]);
  const [hasMoreItems, setHasMoreItems] = useState(true);

  useEffect(() => {
    setStores([]);
    setShowStores();
  }, [category_seq, address]);

  const setShowStores = () => {
    storeStore.getStoreByCategoryAndAddress({ category_seq, address }).then(data => {
      if (data.length < items) {
        setItems(data.length);
      } else {
        setHasMoreItems(true);
      }
      setStores(data);
    });
  };

  const showStores = () => {
    let returnStores = [];
    for (let i = 0; i < items; i++) {
      if (stores[i] !== undefined) {
        returnStores.push(
          <Link key={stores[i].seq} to={`${PAGE_PATHS.MENU_LISTS}/${stores[i].seq}`}>
            <li>{stores[i].store_name}</li>
          </Link>,
        );
      }
    }
    return returnStores;
  };

  const loadMore = () => {
    if (items >= stores.length) {
      setHasMoreItems(false);
    } else {
      setTimeout(() => {
        setItems(items + 20);
      }, 1000);
    }
  };

  return (
    stores.length > 0 && (
      <InfiniteScroll
        // initialLoad
        loadMore={loadMore}
        hasMore={hasMoreItems}
        loader={
          <div style={{ position: 'absolute', left: '50%' }}>
            <Spin />
          </div>
        }
      >
        {showStores()}
      </InfiniteScroll>
    )
  );
}

export default List;
