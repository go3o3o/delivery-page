import React, { useEffect, ChangeEvent } from 'react';
import { inject, observer } from 'mobx-react';

import { PAGE_PATHS, STORES } from '../../constants';
import AuthStore from '../../stores/auth/AuthStore';
import { RouteComponentProps } from 'react-router';

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

  return (
    <>
      <p>로그인</p>
    </>
  );
}

export default inject(STORES.AUTH_STORE)(observer(Signin));
