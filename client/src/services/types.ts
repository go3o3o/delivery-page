import { AxiosResponse } from 'axios';

export interface Response<T> {
  data: T;
  code?: number;
  msg?: string;
}

export type ApiResponse<T> = AxiosResponse<Response<T>>;
