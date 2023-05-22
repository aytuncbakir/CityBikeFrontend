import React, { useState } from 'react';
import Input from '../../components/Input';
import { useTranslation } from 'react-i18next';
import ButtonWithProgress from '../../components/ButtonWithProgress';
import { useApiProgress } from '../../shared/ApiProgress';
import { addJourney } from '../../api/apiCalls';
// import { useDispatch } from 'react-redux';
// import { singupHandler } from '../../redux/authActions';

const JourneyAddPage = (props) => {
  const [form, setForm] = useState({
    username: null,
    displayName: null,
    password: null,
    passwordRepeat: null,
  });
  const [errors, setErrors] = useState({});
  // const dispatch = useDispatch();

  const onChange = (e) => {
    const { value, name } = e.target; // object destruction
    setErrors((previousErrors) => ({ ...previousErrors, [name]: undefined }));
    setForm((previousForm) => ({ ...previousForm, [name]: value }));
  };

  const onClickAddJourney = async (e) => {
    e.preventDefault();
    const { history } = props;
    const { push } = history;
    const {
      coveredDistance,
      departure,
      departureStationId,
      departureStationName,
      returnn,
      returnStationId,
      returnStationName,
      duration,
    } = form;

    const journey = {
      coveredDistance,
      departure,
      departureStationId,
      departureStationName,
      returnn,
      returnStationId,
      returnStationName,
      duration,
    };

    try {
      await addJourney(journey);
      push('/journeys');
    } catch (error) {
      if (error.response.data.validationErrors) {
        setErrors(error.response.data.validationErrors);
      }
    }
  };

  const { t } = useTranslation();

  const pendingApiCall = useApiProgress('post', '/api/1.0/journeys/add');

  // const {
  //   // username: usernameError,
  //   // displayName: displayNameError,
  //   // password: passwordError,
  // } = errors;

  return (
    <div className="container">
      <form action="">
        <h1 className="text-center">{t('Add Journey')}</h1>

        <div className="row">
          <div className="col">
            <Input
              name="coveredDistance"
              type="text"
              onChange={onChange}
              label={t('Covered Distance')}
              // error={nimiError}
            />

            <Input
              name="departure"
              type="text"
              onChange={onChange}
              label={t('Departure')}
              // error={nameError}
            />

            <Input
              name="departureStationId"
              type="text"
              onChange={onChange}
              label={t('Departure Station ID')}
              // error={namnError}
            />

            <Input
              name="departureStationName"
              type="text"
              onChange={onChange}
              label={t('Departure Station Name')}
              // error={namnError}
            />
          </div>
          <div className="col">
            <Input
              name="returnn"
              type="text"
              onChange={onChange}
              label={t('Return')}
              // error={osoiteError}
            />
            <Input
              name="returnStationId"
              type="text"
              onChange={onChange}
              label={t('Return Station ID')}
              // error={addressError}
            />
            <Input
              name="returnStationName"
              type="text"
              onChange={onChange}
              label={t('Return Station Name')}
              // error={addressError}
            />

            <Input
              name="duration"
              type="text"
              onChange={onChange}
              label={t('Duration')}
              // error={addressError}
            />
            <ButtonWithProgress
              onClick={onClickAddJourney}
              disabled={pendingApiCall}
              text={t('Add Journey')}
              pendingApiCall={pendingApiCall}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default JourneyAddPage;
