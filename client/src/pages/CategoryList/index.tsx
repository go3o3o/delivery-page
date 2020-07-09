import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { Layout, Menu } from 'antd';

import { PAGE_PATHS, STORES } from '../../constants';
import Header from '../../components/Header';

const { Content } = Layout;

type InjectedProps = {
  [STORES.CATEGORY_STORE];
};

// 0: 한식, 1: 중식, 2: 분식, 3: 치킨, 4: 피자, 5: 패스트푸드, 6: 일식, 7: 양식, 8: 보쌈|족발, 9: 야식
class CategoryList extends Component {
  render() {
    let menuStyle = {
      display: 'table',
      borderRadius: '70%',
      backgroundColor: '#FFF',
      margin: 20,
      width: 200,
      height: 200,
      textAlign: 'center',
      float: 'left',
    };
    return (
      <>
        <Header />
        <Content style={{ backgroundColor: '#5FBEBB', height: '100%', position: 'relative' }}>
          <Link to={`${PAGE_PATHS.CATEGORY_LISTS}/0`}>
            <div style={menuStyle}>
              <span style={{ display: 'table-cell', verticalAlign: 'middle' }}>한식</span>
            </div>
          </Link>
          <Link to={`${PAGE_PATHS.CATEGORY_LISTS}/1`}>
            <div style={menuStyle}>
              <span style={{ display: 'table-cell', verticalAlign: 'middle' }}>중식</span>
            </div>
          </Link>
          <Link to={`${PAGE_PATHS.CATEGORY_LISTS}/2`}>
            <div style={menuStyle}>
              <span style={{ display: 'table-cell', verticalAlign: 'middle' }}>분식</span>
            </div>
          </Link>
          <Link to={`${PAGE_PATHS.CATEGORY_LISTS}/3`}>
            <div style={menuStyle}>
              <span style={{ display: 'table-cell', verticalAlign: 'middle' }}>치킨</span>
            </div>
          </Link>
          <Link to={`${PAGE_PATHS.CATEGORY_LISTS}/4`}>
            <div style={menuStyle}>
              <span style={{ display: 'table-cell', verticalAlign: 'middle' }}>피자</span>
            </div>
          </Link>
          <Link to={`${PAGE_PATHS.CATEGORY_LISTS}/5`}>
            <div style={menuStyle}>
              <span style={{ display: 'table-cell', verticalAlign: 'middle' }}>패스트푸드</span>
            </div>
          </Link>
          <Link to={`${PAGE_PATHS.CATEGORY_LISTS}/6`}>
            <div style={menuStyle}>
              <span style={{ display: 'table-cell', verticalAlign: 'middle' }}>일식</span>
            </div>
          </Link>
          <Link to={`${PAGE_PATHS.CATEGORY_LISTS}/7`}>
            <div style={menuStyle}>
              <span style={{ display: 'table-cell', verticalAlign: 'middle' }}>양식</span>
            </div>
          </Link>
          <Link to={`${PAGE_PATHS.CATEGORY_LISTS}/8`}>
            <div style={menuStyle}>
              <span style={{ display: 'table-cell', verticalAlign: 'middle' }}>보쌈|족발</span>
            </div>
          </Link>
          <Link to={`${PAGE_PATHS.CATEGORY_LISTS}/9`}>
            <div style={menuStyle}>
              <span style={{ display: 'table-cell', verticalAlign: 'middle' }}>야식</span>
            </div>
          </Link>
        </Content>
      </>
    );
  }
}

export default CategoryList;
