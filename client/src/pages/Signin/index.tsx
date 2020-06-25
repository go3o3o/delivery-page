import React, { useEffect, ChangeEvent } from 'react';
import { RouteComponentProps } from 'react-router';
import { inject, observer } from 'mobx-react';

import { Layout, Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined, TranslationOutlined } from '@ant-design/icons';

import { PAGE_PATHS, STORES } from '../../constants';
import AuthStore from '../../stores/auth/AuthStore';
import Header from '../../components/Header';

const { Content } = Layout;

interface InjectedProps {
  [STORES.AUTH_STORE]: AuthStore;
}

function Signin(props: InjectedProps & RouteComponentProps) {
  const { authStore, history } = props;

  useEffect(() => {
    authStore.resetPasswordAndEmail();
  }, []);

  const onClickLogin = async (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await authStore.login();
      history.push(PAGE_PATHS.CATEGORY_LISTS);
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  const onChangeEmail = (v: ChangeEvent<HTMLInputElement>) => {
    authStore.setEmail(v.target.value);
  };

  const style = {
    width: '50%',
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
            backgroundColor: '#FFF',
            height: '400px',
            width: '30%',
            top: '50%',
            left: '50%',
            transform: `translate(-50%, -50%)`,
          }}
        >
          <Form.Item style={style}>
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
            />
          </Form.Item>
          <Form.Item>
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>
          <Form.Item>
            <Button
              style={{
                backgroundColor: '#5FBEBB',
                borderColor: 'white',
                height: 40,
              }}
            >
              <span style={{ color: 'white', fontSize: 20 }}> Log in</span>
            </Button>
          </Form.Item>
        </div>
      </Content>
    </>
  );
}

export default inject(STORES.AUTH_STORE)(observer(Signin));
