import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';

import { Input, Button, Row, Col, Layout } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

import { PAGE_PATHS, STORES } from '../../constants';
import AuthStore from '../../stores/auth/AuthStore';
import { AddressList } from './AddressList';
import { CodeNode } from 'source-list-map';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      keyword: '',
      longitude: 0,
      latitude: 0,
      address: '',
      addressList: [],
    };

    this.getLocation = this.getLocation.bind(this);
    this.setAddress = this.setAddress.bind(this);
  }

  componentWillMount() {
    this.getLocation();
  }

  setAddress = e => {
    this.setState({ keyword: e.target.value });
  };

  pushAddrs = json => {
    let tempAddr = [];
    json.results.juso.map(addr => {
      return tempAddr.push(addr.zipNo + ' ' + addr.roadAddr);
    });
    this.setState({ addressList: tempAddr });
  };

  getAddress = () => {
    // console.log(this.state['address']);
    console.log(this.state['keyword']);
    if (this.state['keyword'].length > 0) {
      fetch(`https://dapi.kakao.com/v2/local/search/address.json?query=${this.state['keyword']}`, {
        method: 'GET',
        headers: {
          Authorization: 'KakaoAK dfe46d636db22ea56b4bc115ed547cf8',
        },
      })
        .then(res => res.json())
        .then(json => console.log(json))
        .catch(err => console.log(err));
    }
  };

  // 경도와 위도로 찾기
  getLocationAddress = () => {
    // console.log(this.state['longitude'], this.state['latitude']);
    fetch(
      `https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${this.state['longitude']}&y=${this.state['latitude']}`,
      {
        method: 'GET',
        headers: {
          Authorization: 'KakaoAK dfe46d636db22ea56b4bc115ed547cf8',
        },
      },
    )
      .then(res => res.json())
      .then(json => {
        // console.log(Object.keys(json));
        if (json.documents.length > 0) {
          this.setState({ address: json.documents[0].address.address_name });
        }
      })
      .catch(err => console.log(err));
  };

  getLocation = () => {
    if (navigator.geolocation) {
      // GPS 를 지원하면
      navigator.geolocation.getCurrentPosition(
        position => {
          let longitude = position.coords.longitude;
          let latitude = position.coords.latitude;
          this.setState({ longitude, latitude });
          this.getLocationAddress();
        },
        err => {
          console.log(err);
        },
        {
          enableHighAccuracy: false,
          maximumAge: 0,
          timeout: Infinity,
        },
      );
    } else {
      alert('GPS를 지원하지 않습니다.');
    }
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
          <Row justify="center" align="middle">
            <Col flex={3} style={{ textAlign: 'left' }}>
              <Link to={'/'} style={{ marginRight: 30 }}></Link>
              <div style={{ display: 'inline' }}>
                <Input
                  placeholder="건물명, 도로명, 지번으로 검색하세요."
                  suffix={
                    <a onClick={this.getAddress}>
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
                  value={this.state['keyword']}
                  onChange={this.setAddress}
                  onClick={this.getAddress}
                />
                {this.state['visible'] && (
                  <ul style={{ border: 1, marginTop: 2, width: 330 }}>
                    <li>test1</li>
                    <li>test2</li>
                    {/* <AddressList list={addrs} /> */}
                  </ul>
                )}
              </div>
            </Col>
            <Col flex={2}>
              <div style={{ display: 'inline' }}>
                <Link to={`${PAGE_PATHS.SIGNIN}`}>
                  <Button
                    style={{
                      backgroundColor: '#5FBEBB',
                      borderColor: 'white',
                      height: 40,
                      verticalAlign: 'top',
                    }}
                  >
                    <span style={{ color: 'white', fontSize: 20 }}>로그인 | 회원가입</span>
                  </Button>
                </Link>
              </div>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default Header;
