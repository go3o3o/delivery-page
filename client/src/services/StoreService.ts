import axios from 'axios';

import { ApiResponse } from '../services/types';

export type StoreDto = {
  seq?: number;
  store_name?: string;
  store_phone_number?: string;
  store_location?: string;
  category_seq?: number;
  logo_img?: string;
  rating?: string;
  order_count?: number;
  dib_count?: number;
  order_tip?: number;
  order_time?: number;
  order_price?: number;
  description?: string;
  notice?: string;
};

export type CategoryDto = {
  seq?: number;
  categoryName?: string;
};

const API_HOST = process.env.API_HOST || 'http://localhost:8000';

class StoreService {
  async getCategories(): Promise<ApiResponse<CategoryDto[]>> {
    return axios.post(`${API_HOST}/category`);
  }

  async getCategoryByAddress(address: string): Promise<ApiResponse<CategoryDto[]>> {
    return axios.post(`${API_HOST}/category/${address}`);
  }

  async getStoreByCategory(category: string): Promise<ApiResponse<StoreDto[]>> {
    return axios.post(`${API_HOST}/category/${category}`);
  }

  async getStore(seq: number): Promise<ApiResponse<StoreDto>> {
    return axios.post(`${API_HOST}/category/${seq}`);
  }
}

export default StoreService;
