import axios from 'axios';
import { ApiResponse } from '~services/types';

export type LoginResponseDto = {
  token: string;
  seq: number;
};

export type LoginSignupRequestDto = {
  email: string;
  password: string;
};

export type AuthResponseDto = {
  seq: number;
  email: string;
  password: string;
  phone_number: string;
  nickname: string;
};

const API_HOST = process.env.API_HOST || 'http://localhost:8080/';

class AuthService {
  async login(body: LoginSignupRequestDto): Promise<ApiResponse<LoginResponseDto>> {
    return axios.post(`${API_HOST}/auth/login`, body);
  }

  async signup(body: LoginSignupRequestDto): Promise<ApiResponse<AuthResponseDto>> {
    return axios.post(`${API_HOST}/auth/signup`, body);
  }
}

export default AuthService;
