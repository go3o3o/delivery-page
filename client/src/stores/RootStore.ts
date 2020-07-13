import AuthStore from './auth/AuthStore';
import StoreStore from './store/StoreStore';
import StoreService from '../services/StoreService';

export default class RootStore {
  static instance: RootStore;

  authStore = new AuthStore();
  storeStore = new StoreStore(new StoreService());
}
