import { action, observable } from 'mobx';
import autobind from 'autobind-decorator';
import StoreService, { CategoryDto, StoreDto } from '../../services/StoreService';

@autobind
class StoreStore {
  @observable categories: CategoryDto[] = [];
  @observable stores: StoreDto[] = [];
  @observable store: StoreDto = {} as StoreDto;

  constructor(private storeService: StoreService) {}

  @action
  async getCategories() {
    const response = await this.storeService.getCategories();
    this.setCategories(response.data.data);
  }

  @action
  async getStoreByCategory(category: string) {
    const response = await this.storeService.getStoreByCategory(category);
    this.setStores(response.data.data);
  }

  @action
  async getStore(seq: number) {
    const response = await this.storeService.getStore(seq);
    this.setStore(response.data.data);
  }

  @action
  setCategories(categories: CategoryDto[]) {
    this.categories = categories;
  }

  @action
  setStores(stores: StoreDto[]) {
    this.stores = stores;
  }

  @action
  setStore(store: StoreDto) {
    this.store = store;
  }
}

export default StoreStore;
