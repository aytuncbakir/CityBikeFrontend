import React, { useState } from 'react';
import Input from '../../components/Input';
import { useTranslation } from 'react-i18next';
import ButtonWithProgress from '../../components/ButtonWithProgress';
import { useApiProgress } from '../../shared/ApiProgress';
import { addEvent } from '../../api/apiCalls';

const EventAddPage = (props) => {
  const [form, setForm] = useState({
    id: null,
    name: null,
    description: null,
    image: null,
    capacity: null,
    address: null,
    date: null,
  });
  const [errors, setErrors] = useState({});
  // const dispatch = useDispatch();

  const onChange = (e) => {
    const { value, name } = e.target; // object destruction
    setErrors((previousErrors) => ({ ...previousErrors, [name]: undefined }));
    setForm((previousForm) => ({ ...previousForm, [name]: value }));
  };

  const onClickAddEvent = async (e) => {
    e.preventDefault();
    const { history } = props;
    const { push } = history;
    const { id, name, description, image, capacity, address, date } = form;

    const event = {
      id,
      name,
      description,
      image,
      capacity,
      address,
      date,
    };

    try {
      await addEvent(event);
      push('/events');
    } catch (error) {
      if (error.response.data.validationErrors) {
        setErrors(error.response.data.validationErrors);
      }
    }
  };

  const { t } = useTranslation();

  const pendingApiCall = useApiProgress('post', '/api/1.0/events/add');

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
            <p> image gelecek</p>
          </div>

          <div className="col">
            <Input
              name="name"
              type="text"
              onChange={onChange}
              label={t('Name')}
              // error={kaupunkiError}
            />
            <Input
              name="address"
              type="text"
              onChange={onChange}
              label={t('Address')}
              // error={stadError}
            />

            <Input
              name="description"
              type="text"
              onChange={onChange}
              label={t('Description')}
              // error={operaattoriError}
            />

            <Input
              name="capacity"
              type="text"
              onChange={onChange}
              label={t('Capacity')}
              // error={kapasiteetError}
            />

            <Input
              name="image"
              type="text"
              onChange={onChange}
              label={t('Image')}
              // error={kapasiteetError}
            />

            <Input
              name="date"
              type="text"
              onChange={onChange}
              label={t('Date')}
              // error={latitudeError}
            />
            <ButtonWithProgress
              onClick={onClickAddEvent}
              disabled={pendingApiCall}
              text={t('Add Event')}
              pendingApiCall={pendingApiCall}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default EventAddPage;
