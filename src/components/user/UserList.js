import React, { useState, useEffect } from 'react';
import { getUsers } from '../../api/apiCalls';
import UserListItem from './UserListItem';
import { useTranslation } from 'react-i18next';
import { useApiProgress } from '../../shared/ApiProgress';
import Spinner from '../Spinner';

const UserList = () => {
  const usersPage = {
    page: {
      content: [],
      size: 3,
      number: 0,
    },
  };
  const [page, setPage] = useState(usersPage);

  const [loadFailure, setLoadFailure] = useState(false);

  const pendingApiCall = useApiProgress('get', '/api/1.0/users?page');

  useEffect(() => {
    loadUsers();
  }, []);

  const onClickNext = () => {
    const nextPage = page.number + 1;
    loadUsers(nextPage);
  };

  const onClickBack = () => {
    const previousPage = page.number - 1;
    loadUsers(previousPage);
  };

  const goToPage = (e) => {
    console.log(e.target.value);

    const goToPage = e.target.value;

    loadUsers(goToPage);
  };

  const loadUsers = async (page) => {
    setLoadFailure(false);
    try {
      const response = await getUsers(page);
      console.log('*********', response.data);
      setPage(response.data);
    } catch (error) {
      setLoadFailure(true);
    }
  };

  const { t } = useTranslation();
  const { content: users, last, first, totalPages } = page;

  console.log('++++++', users);

  const options = Array.apply(null, Array(totalPages)).map((_, i) => (
    <option value={i}>{i + 1}</option>
  ));

  let navigationDiv = (
    <div>
      {last === false && (
        <button className="btn btn-sm btn-dark float-end" onClick={onClickNext}>
          {t('Next >')}
        </button>
      )}
      {first === false && (
        <button className="btn btn-sm btn-dark" onClick={onClickBack}>
          {t('< Back')}
        </button>
      )}
    </div>
  );

  if (pendingApiCall) {
    navigationDiv = <Spinner />;
  }

  return (
    <div>
      <h1 className="text-center"> {t('Users')}</h1>

      <div className="mt-2">
        <select
          className="form-select"
          aria-label="Default select example"
          onClick={(e) => goToPage(e)}
        >
          <option selected>{t('Go To Page')}</option>

          {options}
        </select>
      </div>

      <table className="table table-striped justify-content-center">
        <thead>
          <tr>
            <th scope="col">{t('Users')}</th>
          </tr>
        </thead>
        <tbody>
          {users &&
            users.map((user, index) => (
              <UserListItem key={user.username} user={user} />
            ))}
        </tbody>
      </table>
      {navigationDiv}
      {loadFailure && (
        <div className="alert alert-danger" role="alert">
          {t('Load Failure')}
        </div>
      )}
    </div>
  );
};

export default UserList;
