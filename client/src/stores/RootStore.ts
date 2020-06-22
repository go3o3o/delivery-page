import AuthStore from './auth/AuthStore';

export default class RootStore {
  static instance: RootStore;

  authStore = new AuthStore();
}
