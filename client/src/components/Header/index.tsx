import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';

import { Input, Button, Row, Col } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

// @ts-ignore
import Logo from '../../assets/logo_baemin.svg';

import { PAGE_PATHS, STORES } from '../../constants';
import AuthStore from '../../stores/auth/AuthStore';

function Header() {
  const handleLogin = async (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <>
      <div style={{ textAlign: 'center', padding: '40px 100px 40px 120px' }}>
        <Row align="middle">
          <Col flex={3} style={{ textAlign: 'left' }}>
            <Link to={'/'} style={{ marginRight: 20 }}>
              <img alt="배달의민족" width="250" src={Logo} />
            </Link>
            <Input
              placeholder="건물명, 도로명, 지번으로 검색하세요."
              suffix={
                <a onClick={value => console.log(value)}>
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
            />
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

export default Header;
