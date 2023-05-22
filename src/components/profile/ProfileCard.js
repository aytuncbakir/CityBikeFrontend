import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ProfileImageDefault from './ProfileImageDefault';
import Input from '../Input';
import { useTranslation } from 'react-i18next';
import { updateUser, deleteUser } from '../../api/apiCalls';
import { useApiProgress } from '../../shared/ApiProgress';
import Spinner from '../Spinner';
import ButtonWithProgress from '../ButtonWithProgress';
import { updateSuccess, logoutSuccess } from '../../redux/authActions';
import Modal from '../Modal';

const ProfileCard = (props) => {
  const [user, setUser] = useState({});
  const { username, displayName, image } = user;
  const routeParams = useParams();
  const pathUsername = routeParams.username;
  const [inEditMode, setInEditMode] = useState(false);
  const [updatedDisplayName, setUpdatedDisplayName] = useState();
  const { t } = useTranslation();
  const [editable, setEditable] = useState(false);
  const [newImage, setNewImage] = useState();
  const [validationErrors, setValidationErrors] = useState({});
  const dispatch = useDispatch();
  const history = useHistory();
  const [modalVisible, setModalVisible] = useState(false);

  const { username: loggedInUsername } = useSelector((store) => ({
    username: store.username,
  }));

  const hasUserRightToDelete = loggedInUsername === username;

  useEffect(() => {
    setValidationErrors((previousValidationErrors) => ({
      ...previousValidationErrors,
      displayName: undefined,
    }));
  }, [updatedDisplayName]);

  useEffect(() => {
    setValidationErrors((previousValidationErrors) => ({
      ...previousValidationErrors,
      image: undefined,
    }));
  }, [newImage]);

  useEffect(() => {
    setUser(props.user);
  }, [props.user]);

  useEffect(() => {
    setEditable(pathUsername === loggedInUsername);
  }, [pathUsername, loggedInUsername]);

  useEffect(() => {
    if (inEditMode) {
      setUpdatedDisplayName(displayName);
    } else {
      setUpdatedDisplayName(undefined);
      setNewImage(undefined);
    }
  }, [inEditMode, displayName]);

  const onClickSave = async () => {
    let image;
    if (newImage) {
      image = newImage.split(',')[1];
    }

    const body = {
      displayName: updatedDisplayName,
      image: image,
    };
    try {
      const response = await updateUser(username, body);
      setUser(response.data);
      setInEditMode(false);
      dispatch(updateSuccess(response.data));
    } catch (error) {
      setValidationErrors(error.response.data.validationErrors);
    }
  };

  const onChangeFile = (e) => {
    if (e.target.files.length < 1) {
      return;
    }
    const file = e.target.files[0];
    const fileReader = new FileReader();
    fileReader.onloadend = () => {
      setNewImage(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  };

  const onClickDelete = async () => {
    try {
      await deleteUser(username);
      setModalVisible(false);
      dispatch(logoutSuccess());
      history.push('/');
    } catch (error) {}
  };

  const onClickCancel = () => {
    setModalVisible(false);
  };

  const pendingApiCall = useApiProgress('put', '/api/1.0/users/' + username);
  const pendingApiCallUserDelete = useApiProgress(
    'delete',
    '/api/1.0/users/' + username,
    true
  );

  const { displayName: displayNameError, image: imageError } = validationErrors;
  return (
    <>
      <div className="card text-center">
        <div className="card-header">
          <ProfileImageDefault
            className="rounded-circle shadow"
            width="200"
            height="200"
            alt={`${username} profile`}
            image={image}
            tempimage={newImage}
          />
        </div>

        {pendingApiCall && <Spinner />}

        <div className="card-body ">
          {!inEditMode && (
            <>
              <h3>
                {displayName}@{username}
              </h3>
              {editable && (
                <div>
                  <button
                    className="btn btn-dark d-inline-flex"
                    onClick={() => setInEditMode(true)}
                  >
                    <i className="material-icons">edit</i>

                    {t('Edit')}
                  </button>

                  {hasUserRightToDelete && (
                    <button
                      className="btn btn-danger  d-inline-flex ms-2"
                      onClick={() => setModalVisible(true)}
                    >
                      {' '}
                      <i className="material-icons">directions_run</i>{' '}
                      {t('Delete My Account')}
                    </button>
                  )}
                </div>
              )}
            </>
          )}

          {inEditMode && (
            <div>
              <Input
                // onChange={onChange}
                label="Change Display Name"
                defaultValue={displayName}
                onChange={(e) => setUpdatedDisplayName(e.target.value)}
                error={displayNameError}
              />
              <div className="mt-3">
                <Input type="file" onChange={onChangeFile} error={imageError} />
              </div>

              <div
                className="mt-3"
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  gap: '2px',
                }}
              >
                <ButtonWithProgress
                  className="btn btn-success d-inline-flex"
                  onClick={onClickSave}
                  disabled={pendingApiCall}
                  pendingApiCall={pendingApiCall}
                  text={
                    <>
                      <i className="material-icons">save</i>
                      {t('Save')}
                    </>
                  }
                />
                <button
                  className="btn btn-danger d-inline-flex text-center mt-2 loatt-end"
                  onClick={() => setInEditMode(false)}
                  disabled={pendingApiCall}
                >
                  <i className="material-icons">cancel</i>
                  {t('Cancel')}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <Modal
        visible={modalVisible}
        onClickCancel={onClickCancel}
        onClickOk={onClickDelete}
        pendingApiCall={pendingApiCallUserDelete}
        title={t('Delete My Account')}
        message={
          <div>
            <div>
              <strong>{t('Are you sure to delete your account?')}</strong>
            </div>
            {/* <span>{content}</span> */}
          </div>
        }
      />
    </>
  );
};

export default ProfileCard;
