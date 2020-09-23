import React, { useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router';
import { inject, observer } from 'mobx-react';

import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import { STORES } from '../../constants';
import StoreStore from '../../stores/store/StoreStore';

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

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));

type CategoryTabProps = {
  [STORES.STORE_STORE]?: StoreStore;
  clickCategoryTap: any;
  category_seq: number;
};

function CategoryTab(props: CategoryTabProps) {
  const classes = useStyles();
  const [value, setValue] = useState(props.category_seq);

  useEffect(() => {
    props[STORES.STORE_STORE].getCategories();
  }, []);

  const handleChange = (event: any, newValue: number) => {
    let category_seq = String(newValue + 1);
    setValue(newValue);
    props.clickCategoryTap(category_seq);
  };

  const { categories } = props.storeStore;

  return (
    <>
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="scrollable"
            scrollButtons="auto"
          >
            {categories.map((category: object) => {
              return <Tab label={category['category_name']} />;
            })}
          </Tabs>
        </AppBar>
      </div>
    </>
  );
}

export default inject(STORES.STORE_STORE)(CategoryTab);
