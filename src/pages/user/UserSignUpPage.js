import React, { useState } from 'react';
import Input from '../../components/Input';
import { useTranslation } from 'react-i18next';
import ButtonWithProgress from '../../components/ButtonWithProgress';
import { useApiProgress } from '../../shared/ApiProgress';
import { useDispatch } from 'react-redux';
import { singupHandler } from '../../redux/authActions';

const UserSignUpPage = (props) => {
  const [form, setForm] = useState({
    username: null,
    displayName: null,
    password: null,
    passwordRepeat: null,
  });
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();

  const onChange = (e) => {
    const { value, name } = e.target; // object destruction
    setErrors((previousErrors) => ({ ...previousErrors, [name]: undefined }));
    setForm((previousForm) => ({ ...previousForm, [name]: value }));
  };

  const onClickSignup = async (e) => {
    e.preventDefault();
    const { history } = props;
    const { push } = history;
    const { username, displayName, password } = form;

    const user = {
      username,
      displayName,
      password,
    };

    try {
      await dispatch(singupHandler(user));
      push('/');
    } catch (error) {
      if (error.response.data.validationErrors) {
        setErrors(error.response.data.validationErrors);
      }
    }
  };

  const { t } = useTranslation();
  const pendingApiCallSignUp = useApiProgress('post', '/api/1.0/signup');
  const pendingApiCallLogin = useApiProgress('post', '/api/1.0/auth');
  const pendingApiCall = pendingApiCallSignUp || pendingApiCallLogin;

  const {
    username: usernameError,
    displayName: displayNameError,
    password: passwordError,
  } = errors;

  let passwordRepeatError;
  if (form.password !== form.passwordRepeat) {
    passwordRepeatError = t('Password mismatch');
  }

  return (
    <div className="container">
      <form action="">
        <h1 className="text-center">{t('Sign Up')}</h1>
        <Input
          name="username"
          type="text"
          onChange={onChange}
          label={t('Username')}
          error={usernameError}
        />

        <Input
          name="displayName"
          type="text"
          onChange={onChange}
          label={t('DisplayName')}
          error={displayNameError}
        />

        <Input
          name="password"
          type="password"
          onChange={onChange}
          label={t('Password')}
          error={passwordError}
        />
        <Input
          name="passwordRepeat"
          type="password"
          onChange={onChange}
          label={t('Password Repeat')}
          error={passwordRepeatError}
        />

        <ButtonWithProgress
          onClick={onClickSignup}
          disabled={pendingApiCall || passwordRepeatError !== undefined}
          text={t('Sign Up')}
          pendingApiCall={pendingApiCall}
        />
      </form>
    </div>
  );
};

export default UserSignUpPage;
