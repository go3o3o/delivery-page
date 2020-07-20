import axios from 'axios';

import { ApiResponse } from '../services/types';

export type StoreRequestDto = {
  category_seq: string;
  address: string;
};

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
  seq?: string;
  categoryName?: string;
};

const API_HOST = process.env.API_HOST || 'http://localhost:8000';

class StoreService {
  async getCategories(): Promise<ApiResponse<CategoryDto[]>> {
    return axios.post(`${API_HOST}/category`);
  }

  async getStoreByCategoryAndAddress(body: StoreRequestDto): Promise<ApiResponse<StoreDto[]>> {
    return axios.post(`${API_HOST}/store`, body);
  }

  async getStore(seq: string): Promise<ApiResponse<StoreDto>> {
    return axios.post(`${API_HOST}/store/${seq}`);
  }
}

export default StoreService;
