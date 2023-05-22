import React, { useState } from 'react';
import Input from '../../components/Input';
import { useTranslation } from 'react-i18next';
import ButtonWithProgress from '../../components/ButtonWithProgress';
import { useApiProgress } from '../../shared/ApiProgress';
// import { useDispatch } from 'react-redux';
// import { singupHandler } from '../../redux/authActions';
import { addStation } from '../../api/apiCalls';
const StationAddPage = (props) => {
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

  const onClickAddStation = async (e) => {
    e.preventDefault();
    const { history } = props;
    const { push } = history;
    const {
      id,
      nimi,
      name,
      namn,
      osoite,
      address,
      kaupunki,
      stad,
      operaattori,
      kapasiteet,
      longitude,
      latitude,
    } = form;

    const station = {
      id,
      nimi,
      name,
      namn,
      osoite,
      address,
      kaupunki,
      stad,
      operaattori,
      kapasiteet,
      longitude,
      latitude,
    };

    try {
      await addStation(station);
      push('/stations');
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
        <h1 className="text-center">{t('Add Station')}</h1>

        <div className="row">
          <div className="col">
            <Input
              name="id"
              type="text"
              onChange={onChange}
              label={t('id')}
              // error={idError}
            />

            <Input
              name="nimi"
              type="text"
              onChange={onChange}
              label={t('Nimi')}
              // error={nimiError}
            />

            <Input
              name="name"
              type="text"
              onChange={onChange}
              label={t('Name')}
              // error={nameError}
            />

            <Input
              name="namn"
              type="text"
              onChange={onChange}
              label={t('Namn')}
              // error={namnError}
            />

            <Input
              name="osoite"
              type="text"
              onChange={onChange}
              label={t('Osoite')}
              // error={osoiteError}
            />
            <Input
              name="address"
              type="text"
              onChange={onChange}
              label={t('Address')}
              // error={addressError}
            />
          </div>

          <div className="col">
            <Input
              name="kaupunki"
              type="text"
              onChange={onChange}
              label={t('Kaupunki')}
              // error={kaupunkiError}
            />
            <Input
              name="stad"
              type="text"
              onChange={onChange}
              label={t('Stad')}
              // error={stadError}
            />

            <Input
              name="operaattori"
              type="text"
              onChange={onChange}
              label={t('Operaattori')}
              // error={operaattoriError}
            />

            <Input
              name="kapasiteet"
              type="text"
              onChange={onChange}
              label={t('Kapasiteet')}
              // error={kapasiteetError}
            />

            <Input
              name="longitude"
              type="text"
              onChange={onChange}
              label={t('Longitude')}
              // error={longitudeError}
            />

            <Input
              name="latitude"
              type="text"
              onChange={onChange}
              label={t('Latitude')}
              // error={latitudeError}
            />
            <ButtonWithProgress
              onClick={onClickAddStation}
              disabled={pendingApiCall}
              text={t('Add Station')}
              pendingApiCall={pendingApiCall}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default StationAddPage;
