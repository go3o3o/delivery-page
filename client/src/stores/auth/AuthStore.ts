import { action, observable, reaction } from 'mobx';
import autobind from 'autobind-decorator';
import * as jwt_decode from 'jwt-decode';
import AuthService, { LoginRequestDto, SignupRequestDto } from '../../services/AuthService';

export type Auth = {
  email: string;
  seq: number;
};

@autobind
class AuthStore {
  @observable token: string | null = window.sessionStorage.getItem('jwt');
  @observable auth: Auth | undefined;
  @observable email = '';
  @observable password = '';
  @observable nickname = '';
  @observable phone_number = '';
  private authService = new AuthService();

  constructor() {
    if (this.token) {
      this.auth = jwt_decode(this.token) as Auth;
    }

    reaction(
      () => this.token,
      token => {
        if (token != null) window.sessionStorage.setItem('jwt', token);
      },
    );
  }

  @action
  isLoggedIn() {
    return this.token != null;
  }

  @action
  async login() {
    const body: LoginRequestDto = {
      email: this.email,
      password: this.password,
    };
    const response = await this.authService.login(body);
    this.setToken(response.data.data.token);
    return response;
  }

  @action
  async signup(auth: SignupRequestDto) {
    return await this.authService.signup(auth);
  }

  @action
  resetPasswordAndEmail() {
    this.password = '';
    this.email = '';
  }

  @action
  setPassword(pw: string) {
    this.password = pw;
  }

  @action
  setEmail(email: string) {
    this.email = email;
  }

  @action
  setToken(token: string) {
    this.token = token;
    this.auth = jwt_decode(token) as Auth;
  }

  @action
  signOut() {
    window.sessionStorage.removeItem('jwt');
    this.token = null;
    this.auth = undefined;
  }
}

export default AuthStore;
