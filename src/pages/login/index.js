import { Redirect } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";
import { Button, H3, Intent } from '@blueprintjs/core';

import Logo from '../../assets/img/logo.png'

import LoginDoodle from './loginDoodle';

import urls from '../../utils/urls';

import './index.css';

const Login = () =>  {
  const { isLoading, isAuthenticated, loginWithRedirect } = useAuth0();

  if (isLoading) return (<p>Authenticating</p>);

  if (isAuthenticated) return (<Redirect to={urls.redirectUrl} />)

  return (
    <div className='login__container'>
      <div className='login__bg'>
        <LoginDoodle />
        <div className='login__bg--overlay' />
      </div>
      <div className='login__info'>
        <div className='login__logo-container'>
          <img alt='Orderpad logo' className='login__logo' src={Logo} />
          <h4> Group Home Admin </h4>
        </div>

        <div className='login__button-container'>
          <Button large intent={Intent.PRIMARY} onClick={loginWithRedirect}>
            Sign In
          </Button>
        </div>
      </div>
    </div>
)
};

export default Login;
