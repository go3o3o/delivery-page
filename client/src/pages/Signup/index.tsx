import React, { useEffect, ChangeEvent, useState } from 'react';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import { inject, observer } from 'mobx-react';

import { IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Lock from '@material-ui/icons/Lock';
import EnhancedEncryptionIcon from '@material-ui/icons/EnhancedEncryption';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import LocalDiningIcon from '@material-ui/icons/LocalDining';
import AddIcCallIcon from '@material-ui/icons/AddIcCall';

import { Layout, Divider, Button, message } from 'antd';

import { PAGE_PATHS, STORES } from '../../constants';
import AuthStore from '../../stores/auth/AuthStore';

// @ts-ignore
import Logo from '../../components/assets/logo.png';

const { Content } = Layout;

const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(1),
  },
  grids: {
    margin: theme.spacing(1),
    display: 'inline-block',
    width: '80%',
  },
}));

interface InjectedProps {
  authStore: AuthStore;
}

function Signup(props: InjectedProps & RouteComponentProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [checkConfirmPassword, setCheckConfirmPassword] = useState(true);

  const [emailText, setEmailText] = useState('');
  const [passwordText, setPasswordText] = useState('');
  const [rePasswordText, setRePasswordText] = useState('');
  const [checkPhoneNumber, setCheckPhoneNumber] = useState(true);

  const classes = useStyles();

  const handleSignup = async e => {
    e.preventDefault();
    e.stopPropagation();

    if (checkConfirmPassword) {
      return false;
    }
    if (checkPhoneNumber) {
      return false;
    }

    try {
      const result = await props.authStore.signup({
        email: email,
        password: password,
        phone_number: phoneNumber,
        nickname: nickname,
      });

      if (result.data.code === 0) {
        message.error(result.data.msg);
      }
      if (result.data.code === 1) {
        message.info(result.data.msg);
        location.href = 'http://localhost:8000/signin';
      }
    } catch (err) {
      console.log(err);
    }
    return false;
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = event => {
    event.preventDefault();
  };

  const onChangeEmailValue = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const emailRule = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    if (!emailRule.test(value)) {
      setEmailText('이메일 양식이 아닙니다.');
    } else {
      setEmailText('');
    }
    setEmail(value);
  };

  const onChangeConfirmPasswordValue = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (value !== password) {
      setCheckConfirmPassword(true);
      setRePasswordText('비밀번호가 다릅니다.');
    } else {
      setCheckConfirmPassword(false);
      setRePasswordText('');
    }
    setRePassword(value);
  };

  const onChangeNickname = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setNickname(value);
  };

  const onChangePhoneNumber = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    let phoneNumberRule = /^\d{3}\d{3,4}\d{4}$/;

    if (phoneNumberRule.test(value)) {
      setCheckPhoneNumber(false);
    } else {
      setCheckPhoneNumber(true);
    }
    setPhoneNumber(value);
  };

  const onChangePasswordValue = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (value.length < 5) {
      setPasswordText('비밀번호는 5글자 이상 해주세요.');
    } else {
      setPasswordText('');
    }
    setPassword(value);
  };

  return (
    <>
      <Content
        style={{
          backgroundColor: '#5FBEBB',
          position: 'relative',
          height: '100%',
          width: '100%',
          minWidth: 850,
        }}
      >
        <Grid container justify="space-around" alignItems="center">
          <div
            style={{
              textAlign: 'center',
              backgroundColor: '#FFF',
              borderRadius: 20,
              margin: 20,
              height: '80%',
              width: '80%',
              padding: 10,
            }}
          >
            <Link to={'/'}>
              <img className="logo" alt="Delivery" width="250" src={Logo} />
            </Link>

            <Divider style={{ marginTop: 10 }} />
            <div className={classes.grids}>
              <Grid container item xs={12} justify="center" alignItems="flex-end">
                <Grid item xs={1}>
                  <AccountCircle />
                </Grid>
                <Grid item xs={11}>
                  <TextField
                    fullWidth
                    id="standard-adornment-email"
                    label="E-MAIL"
                    value={email}
                    onChange={onChangeEmailValue}
                  />
                </Grid>
              </Grid>
              <Grid container item xs={12} style={{ marginBottom: 10 }}>
                <Grid item xs={1}></Grid>
                <Grid item xs={11} style={{ textAlign: 'left' }}>
                  <span style={{ color: 'red' }}>{emailText}</span>
                </Grid>
              </Grid>

              <Grid container item xs={12} justify="center" alignItems="flex-end">
                <Grid item xs={1}>
                  <Lock />
                </Grid>
                <Grid item xs={11}>
                  <FormControl fullWidth>
                    <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                    <Input
                      id="standard-adornment-password"
                      type={showPassword ? 'text' : 'password'}
                      onChange={onChangePasswordValue}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                          >
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      }
                      value={password}
                    />
                  </FormControl>
                </Grid>
              </Grid>
              <Grid container item xs={12} style={{ marginBottom: 10 }}>
                <Grid item xs={1}></Grid>
                <Grid item xs={11} style={{ textAlign: 'left' }}>
                  <span style={{ color: 'red' }}>{passwordText}</span>
                </Grid>
              </Grid>

              <Grid container item xs={12} justify="center" alignItems="flex-end">
                <Grid item xs={1}>
                  <EnhancedEncryptionIcon />
                </Grid>
                <Grid item xs={11}>
                  <FormControl fullWidth>
                    <InputLabel htmlFor="standard-adornment-confirm-password">
                      Confirm Password
                    </InputLabel>
                    <Input
                      id="standard-adornment-confirm-password"
                      type={showPassword ? 'text' : 'password'}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                          >
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      }
                      onChange={onChangeConfirmPasswordValue}
                      error={checkConfirmPassword}
                      value={rePassword}
                    />
                  </FormControl>
                </Grid>
              </Grid>
              <Grid container item xs={12} style={{ marginBottom: 10 }}>
                <Grid item xs={1}></Grid>
                <Grid item xs={11} style={{ textAlign: 'left' }}>
                  <span style={{ color: 'red' }}>{rePasswordText}</span>
                </Grid>
              </Grid>

              <Grid container item xs={12} justify="center" alignItems="flex-end">
                <Grid item xs={1}>
                  <LocalDiningIcon />
                </Grid>
                <Grid item xs={11}>
                  <TextField
                    fullWidth
                    id="standard-adornment-nickname"
                    label="NICKNAME"
                    value={nickname}
                    onChange={onChangeNickname}
                  />
                </Grid>
              </Grid>

              <Grid container item xs={12} justify="flex-end" alignItems="flex-end">
                <Grid item xs={1}>
                  <AddIcCallIcon />
                </Grid>
                <Grid item xs={9}>
                  <TextField
                    fullWidth
                    id="standard-adornment-phone-number"
                    label="PHONE NUMBER"
                    value={phoneNumber}
                    onChange={onChangePhoneNumber}
                  />
                </Grid>
                <Grid container item xs={2} justify="flex-end">
                  <Button
                    disabled={checkPhoneNumber}
                    style={{
                      borderColor: '#5FBEBB',
                      width: '80%',
                    }}
                  >
                    <span style={{ color: '#5FBEBB' }}>인증</span>
                  </Button>
                </Grid>
              </Grid>

              <Grid container item xs={12} justify="flex-end" alignItems="flex-end">
                <Button
                  style={{
                    backgroundColor: '#5FBEBB',
                    borderColor: 'white',
                    marginTop: 50,
                    height: 50,
                    width: '98%',
                  }}
                  onClick={handleSignup}
                >
                  <span style={{ color: 'white', fontSize: 20 }}>SIGNUP</span>
                </Button>
              </Grid>
            </div>
          </div>
        </Grid>
      </Content>
    </>
  );
}

export default inject(STORES.AUTH_STORE)(observer(Signup));
