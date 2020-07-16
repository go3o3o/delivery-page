import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { inject, observer } from 'mobx-react';

import { STORES } from '../../constants';
import AuthStore from '../../stores/auth/AuthStore';

interface PrivateRouterProps {
  authStore?: AuthStore;
  component: React.ComponentType<any>;
  redirectTo: string;
  path: string;
  exact?: boolean;
}

export default inject();
