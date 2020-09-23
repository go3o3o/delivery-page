import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router';
import { inject, observer } from 'mobx-react';

import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import { STORES } from '../../constants';
import StoreStore from '../../stores/store/StoreStore';
import List from './List';
import StoreDetail from '../StoreDetail';

function TabPanel(props: any) {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

type InjectedProps = {
  [STORES.STORE_STORE]: StoreStore;
} & RouteComponentProps<{ category_seq: string }>;

@inject(STORES.STORE_STORE)
@observer
class StoreList extends Component<InjectedProps & RouteComponentProps> {
  constructor(props: any) {
    super(props);

    let category_seq = this.props.match.params.category_seq;
    let address = window.sessionStorage.getItem('address');

    this.state = {
      value: Number(category_seq) - 1,
      category_seq,
      address,
      store_seq: 0,
    };
  }

  componentWillMount() {
    this.props[STORES.STORE_STORE].getCategories();
  }

  handleChange = (event: any, newValue: number) => {
    this.setState({ value: newValue, category_seq: String(newValue + 1), store_seq: 0 });
  };

  clickStore = (store_seq: number) => {
    this.setState({ store_seq });
  };

  render() {
    const { categories } = this.props[STORES.STORE_STORE];

    return (
      <>
        <div>
          <AppBar position="static" color="default">
            <Tabs
              value={this.state['value']}
              onChange={this.handleChange}
              indicatorColor="primary"
              textColor="primary"
              variant="scrollable"
              scrollButtons="auto"
            >
              {categories.map((category: object) => {
                return (
                  <Tab label={category['category_name']} {...a11yProps(category['seq'] - 1)} />
                );
              })}
            </Tabs>
          </AppBar>
          {this.state['store_seq'] === 0 ? (
            categories.map((category: object) => {
              return (
                <TabPanel value={this.state['value']} index={category['seq'] - 1}>
                  <List
                    storeStore={this.props[STORES.STORE_STORE]}
                    category_seq={this.state['category_seq']}
                    address={this.state['address']}
                    clickStore={this.clickStore}
                  />
                </TabPanel>
              );
            })
          ) : (
            <StoreDetail store_seq={this.state['store_seq']} />
          )}
        </div>
      </>
    );
  }
}

export default StoreList;
