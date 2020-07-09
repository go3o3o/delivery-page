import axios from 'axios';
import { ApiResponse } from './types';

export type LoginResponseDto = {
  token: string;
  seq: number;
};

export type LoginRequestDto = {
  email: string;
  password: string;
};

export type SignupRequestDto = {
  email: string;
  password: string;
  phone_number: string;
  nickname: string;
};

export type AuthResponseDto = {
  seq: number;
  email: string;
  password: string;
  phone_number: string;
  nickname: string;
};

const API_HOST = process.env.API_HOST || 'http://localhost:8000';

class AuthService {
  async login(body: LoginRequestDto): Promise<ApiResponse<LoginResponseDto>> {
    return axios.post(`${API_HOST}/auth/login`, body);
  }

  async signup(body: SignupRequestDto): Promise<ApiResponse<AuthResponseDto>> {
    return axios.post(`${API_HOST}/auth/signup`, body);
  }
}

export default AuthService;
