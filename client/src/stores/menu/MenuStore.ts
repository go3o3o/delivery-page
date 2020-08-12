import { action, observable } from 'mobx';
import autobind from 'autobind-decorator';
import MenuService, { MenuDto } from '../../services/MenuService';

@autobind
class MenuStore {
  @observable menu: MenuDto[] = [];

  private menuService = new MenuService();

  @action
  async getMenu(store_seq: string) {
    const response = await this.menuService.getMenu(store_seq);
    this.setMenu(response.data.data);
    return response.data;
  }

  @action
  setMenu(menu: MenuDto[]) {
    this.menu = menu;
  }
}

export default MenuStore;
