import React, { useEffect, ChangeEvent, useState } from 'react';
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

// 이메일, 비밀번호, 닉네임
function Signup(props: InjectedProps & RouteComponentProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');

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
            height: 500,
            width: '50%',
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
