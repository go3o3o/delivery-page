import React, { useEffect, ChangeEvent, useState, CSSProperties } from 'react';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import { inject, observer } from 'mobx-react';

import { Layout, Divider, Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined, TranslationOutlined } from '@ant-design/icons';

import { PAGE_PATHS, STORES } from '../../constants';
import AuthStore from '../../stores/auth/AuthStore';
import Header from '../../components/Header';

// @ts-ignore
import Logo from '../../components/assets/logo.png';

const { Content } = Layout;

const naverClientId = process.env.NAVER_CLIENT_ID;
const naverCallbackUrl = encodeURI(process.env.NAVER_CALLBACK_URL);
const naverLoginButton = { color: 'white', type: 1, height: 45 };

const kakaoAccessKey = process.env.KAKAO_KEY;

interface InjectedProps {
  [STORES.AUTH_STORE]: AuthStore;
}

function Signin(props: InjectedProps & RouteComponentProps) {
  const { authStore, history } = props;

  useEffect(() => {
    Naver();
    Kakao();
  }, []);

  function Naver() {
    const naverIdLogin = new window.naver.LoginWithNaverId({
      clientId: naverClientId,
      callbackUrl: naverCallbackUrl,
      isPopup: true,
      loginButton: naverLoginButton,
    });

    naverIdLogin.init();
  }

  function Kakao() {
    new window.Kakao.init(kakaoAccessKey);
    new window.Kakao.Auth.createLoginButton({
      container: '#kakaoIdLogin',
      lang: 'en',
      size: 'small',
    });
  }

  const onClickLogin = async (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await authStore.login();
      history.push(PAGE_PATHS.CATEGORY_LISTS);
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  const style = {
    display: 'inline-block',
    width: '80%',
  };

  const buttonStyle: CSSProperties = {
    margin: 5,
    textAlign: 'center',
    display: 'inline-block',
  };

  return (
    <>
      <Content
        style={{
          backgroundColor: '#5FBEBB',
          height: '100vh',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            width: '30%',
            top: '50%',
            left: '50%',
            transform: `translate(-50%, -50%)`,
          }}
        >
          <div
            style={{
              textAlign: 'center',
              backgroundColor: '#FFF',
              borderRadius: 20,
              height: 400,
              padding: 10,
            }}
          >
            <Link to={'/'}>
              <img className="logo" alt="Delivery" width="250" src={Logo} />
            </Link>

            <Divider style={{ marginTop: 10 }} />
            <Form.Item style={style}>
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Username"
                style={{ height: 40 }}
              />
            </Form.Item>
            <Form.Item style={style}>
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
                style={{ height: 40 }}
              />
            </Form.Item>
            <Form.Item>
              <Button
                style={{
                  backgroundColor: '#5FBEBB',
                  borderColor: 'white',
                  height: 40,
                }}
                onClick={onClickLogin}
              >
                <span style={{ color: 'white', fontSize: 20 }}>LOGIN</span>
              </Button>
            </Form.Item>
            <Form.Item>
              처음이신가요?
              <Link
                to={PAGE_PATHS.SIGNUP}
                style={{
                  marginLeft: 5,
                  color: '#5FBEBB',
                  borderColor: 'white',
                  fontWeight: 'bold',
                  textDecoration: 'none',
                  fontSize: 15,
                }}
              >
                계정 만들기
              </Link>
            </Form.Item>
          </div>
          <div id="naverIdLogin" style={buttonStyle}></div>
          <div id="kakaoIdLogin" style={buttonStyle}></div>
        </div>
      </Content>
    </>
  );
}

export default inject(STORES.AUTH_STORE)(observer(Signin));
