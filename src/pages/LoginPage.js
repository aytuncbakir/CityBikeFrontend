import React, { useEffect, useState } from 'react';
import Input from '../components/Input';
import { useTranslation } from 'react-i18next';
import ButtonWithProgress from '../components/ButtonWithProgress';
import { useApiProgress } from '../shared/ApiProgress';
import { loginHandler } from '../redux/authActions';
import { useDispatch } from 'react-redux';

const LoginPage = (props) => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    setError(undefined);
  }, [username, password]);

  const onClickLogin = async (e) => {
    e.preventDefault();

    const creds = {
      username,
      password,
    };

    setError(undefined);

    const { history } = props;
    const { push } = history;
    try {
      await dispatch(loginHandler(creds));
      push('/');
    } catch (apiError) {
      setError(apiError.response.data.message);
    }
  };

  const { t } = useTranslation();
  const pendingApiCall = useApiProgress('post', 'api/1.0/auth');
  const loginBtnEnabled = username && password;
  return (
    <div className="container">
      <form action="">
        <h1 className="text-center"> {t('Login')}</h1>
        <Input
          name="username"
          type="text"
          onChange={(e) => setUsername(e.target.value)}
          label={t('Username')}
        />

        <Input
          name="password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          label={t('Password')}
        />
        {error && <div className="alert alert-danger">{error}</div>}
        <ButtonWithProgress
          onClick={onClickLogin}
          disabled={pendingApiCall || !loginBtnEnabled}
          text={t('Login')}
          pendingApiCall={pendingApiCall}
        />
      </form>
    </div>
  );
};

export default LoginPage;
