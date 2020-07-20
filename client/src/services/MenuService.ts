import axios from 'axios';

import { ApiResponse } from '../services/types';

export type MenuDto = {
  seq?: number;
  store_seq?: number;
  menu_name?: string;
  menu_price?: number;
  menu_img?: string;
  main_yn?: string;
};

const API_HOST = process.env.API_HOST || 'http://localhost:8000';

class MenuService {
  async getMenu(store_seq: string): Promise<ApiResponse<MenuDto[]>> {
    return axios.get(`${API_HOST}/menu/${store_seq}`);
  }
}

export default MenuService;
