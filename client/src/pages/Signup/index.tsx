import React, { useEffect, ChangeEvent } from 'react';
import { RouteComponentProps } from 'react-router';
import { inject, observer } from 'mobx-react';

import { Layout, Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined, TranslationOutlined } from '@ant-design/icons';

import { PAGE_PATHS, STORES } from '../../constants';
import AuthStore from '../../stores/auth/AuthStore';
import Header from '../../components/Header';

// @ts-ignore
import Logo from '../assets/logo.png';

const { Content } = Layout;

interface InjectedProps {
  [STORES.AUTH_STORE]: AuthStore;
}

function Signup(props: InjectedProps & RouteComponentProps) {
  const { authStore, history } = props;

  useEffect(() => {
    authStore.resetPasswordAndEmail();
  }, []);

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
            backgroundColor: '#FFF',
            height: '400px',
            width: '30%',
            top: '50%',
            left: '50%',
            transform: `translate(-50%, -50%)`,
          }}
        ></div>
      </Content>
    </>
  );
}

export default inject(STORES.AUTH_STORE)(observer(Signup));
