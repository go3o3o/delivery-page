import React, { useEffect, ChangeEvent, useState } from 'react';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import { inject, observer } from 'mobx-react';

import { IconButton, FormHelperText } from '@material-ui/core';
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

import { Layout, Divider, Button } from 'antd';

import { PAGE_PATHS, STORES } from '../../constants';
import AuthStore from '../../stores/auth/AuthStore';
import Header from '../../components/Header';

// @ts-ignore
import Logo from '../../components/assets/logo.png';

const { Content } = Layout;

const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(1),
  },
  textField: {
    margin: theme.spacing(1),
    display: 'inline-block',
    width: '80%',
  },
}));

interface InjectedProps {
  authStore: AuthStore;
}

// 이메일, 비밀번호, 닉네임
function Signup(props: InjectedProps & RouteComponentProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [checkConformPassword, setCheckConfirmPassword] = useState(true);

  const [helperText, setHelperText] = useState('');

  const classes = useStyles();

  const handleSignup = async (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (password.length < 5) {
      setHelperText('비밀번호는 5글자 이상 해주세요.');
      return false;
    }

    const emailRule = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    if (!emailRule.test(email)) {
      setHelperText('이메일 양식이 아닙니다.');
      return false;
    }

    try {
      // const result = await props.authStore.signup({
      //   email: email,
      //   password: password,
      //   phone_number: phoneNumber,
      //   nickname: nickname,
      // });
    } catch (err) {
      console.log(err.response.data.msg);
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
      setHelperText('이메일 양식이 아닙니다.');
    } else {
      setHelperText('');
    }
    setEmail(value);
  };

  const onChangeConfirmPasswordValue = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (value === password) {
      setCheckConfirmPassword(false);
      setHelperText('비밀번호가 다릅니다.');
    } else {
      setCheckConfirmPassword(true);
      setHelperText('');
    }
    setRePassword(value);
  };

  const onChangeNickname = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setNickname(value);
  };

  const onChangePasswordValue = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setPassword(value);
  };

  return (
    <>
      <Header />
      <Content
        style={{
          backgroundColor: '#5FBEBB',
          height: '80vh',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            width: '80%',
            top: '50%',
            left: '50%',
            transform: `translate(-50%, -50%)`,
          }}
        >
          <div
            style={{
              textAlign: 'center',
              backgroundColor: '#FFF',
              borderRadius: 20,
              height: 450,
              padding: 10,
            }}
          >
            <Link to={'/'}>
              <img className="logo" alt="Delivery" width="250" src={Logo} />
            </Link>

            <Divider style={{ marginTop: 10 }} />
            <div className={classes.textField}>
              <Grid container xs={12} alignItems="flex-end">
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
                    helperText={helperText}
                  />
                </Grid>
              </Grid>
              <Grid container xs={12} alignItems="flex-end">
                <Grid item xs={1}>
                  <Lock />
                </Grid>
                <Grid item xs={5}>
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
                    <FormHelperText id="component-error-text">{helperText}</FormHelperText>
                  </FormControl>
                </Grid>
                <Grid item xs={1}>
                  <EnhancedEncryptionIcon />
                </Grid>
                <Grid item xs={5}>
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
                      error={checkConformPassword}
                      value={rePassword}
                    />
                    <FormHelperText id="component-error-text">{helperText}</FormHelperText>
                  </FormControl>
                </Grid>
              </Grid>
              <Grid container xs={12} alignItems="flex-end">
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
              <Grid container xs={12} alignItems="flex-end">
                <Button
                  style={{
                    backgroundColor: '#5FBEBB',
                    borderColor: 'white',
                    marginTop: 20,
                    height: 50,
                    width: '100%',
                  }}
                  // onClick={onClickLogin}
                >
                  <span style={{ color: 'white', fontSize: 20 }}>SIGNUP</span>
                </Button>
              </Grid>
            </div>
          </div>
        </div>
      </Content>
    </>
  );
}

export default inject(STORES.AUTH_STORE)(observer(Signup));
