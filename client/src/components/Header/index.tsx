import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';

import { Input, Button, Row, Col, Layout } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

// @ts-ignore
import Logo from '../../assets/logo-baemin.svg';
import key from '../../assets/key';

import { PAGE_PATHS, STORES } from '../../constants';
import AuthStore from '../../stores/auth/AuthStore';
import { AddressList } from './AddressList';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = { visible: false, address: '', addressList: [] };
  }

  setAddress = e => {
    this.setState({ address: e.target.value });
  };

  pushAddrs = json => {
    let tempAddr = [];
    json.results.juso.map(addr => {
      return tempAddr.push(addr.zipNo + ' ' + addr.roadAddr);
    });
    this.setState({ addressList: tempAddr });
  };

  findAddress = () => {
    let keyword = this.state['address'];
    fetch(
      `http://www.juso.go.kr/addrlink/addrLinkApi.do?currentPage=1&countPerPage=10&keyword=${keyword}&confmKey=${key}&resultType=json`,
    )
      .then(res => res.json())
      .then(json => console.log(json))
      .catch(err => console.log(err));
  };

  setAddressListVisible = () => {
    if (!this.state['visible']) {
      document.addEventListener('click', this.handleOutsideClick, !this.state['visible']);
    }

    this.setState({ visible: !this.state['visible'] });
  };

  handleOutsideClick = e => {
    this.setState({ visible: false });
  };

  render() {
    return (
      <>
        <div style={{ textAlign: 'center', padding: '40px 100px 40px 120px' }}>
          <Row align="middle">
            <Col flex={3} style={{ textAlign: 'left' }}>
              <Link to={'/'} style={{ marginRight: 30 }}>
                <img className="logo" alt="배달의민족" width="250" src={Logo} />
              </Link>
              <div style={{ display: 'inline' }}>
                <Input
                  placeholder="건물명, 도로명, 지번으로 검색하세요."
                  suffix={
                    <a onClick={this.findAddress}>
                      <SearchOutlined
                        style={{
                          color: '#5FBEBB',
                          fontSize: 20,
                          verticalAlign: '-webkit-baseline-middle',
                        }}
                      />
                    </a>
                  }
                  style={{ width: 330, height: 40 }}
                  value={this.state['address']}
                  onChange={this.setAddress}
                  onClick={this.setAddressListVisible}
                />
                {this.state['visible'] && (
                  <ul style={{ border: 1, marginTop: 2, width: 330, tabindex: -1 }}>
                    <li>test1</li>
                    <li>test2</li>
                    {/* <AddressList list={addrs} /> */}
                  </ul>
                )}
              </div>
            </Col>
            <Col flex={2}>
              <Link to={`${PAGE_PATHS.SIGNIN}`}>
                <Button
                  style={{
                    backgroundColor: '#5FBEBB',
                    borderColor: 'white',
                    height: 40,
                  }}
                >
                  <span style={{ color: 'white', fontSize: 20 }}>로그인 | 회원가입</span>
                </Button>
              </Link>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default Header;
