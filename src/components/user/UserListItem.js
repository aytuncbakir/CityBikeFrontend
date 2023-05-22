import React from 'react';
// import { useTranslation } from 'react-i18next';
import ProfileImageDefault from '../profile/ProfileImageDefault';
import { Link } from 'react-router-dom';

const UserListItem = (props) => {
  const { user } = props;
  const { username, displayName, image } = user;
  // const { t } = useTranslation();

  console.log(user);

  return (
    <tr className="card-header">
      <td className="card text-center">
        <div
          className="text-start card-body"
          style={{ display: 'flex', gap: '3px' }}
        >
          <ProfileImageDefault
            className="rounded-circle shadow"
            width="32"
            height="32"
            alt={`${username} profile`}
            image={image}
          />
          <Link
            to={`user/${username}`}
            className="text-dark"
            style={{ textDecoration: 'none' }}
          >
            <p className="ms-5">
              {displayName}@{username}
            </p>
          </Link>
        </div>
      </td>
    </tr>
  );
};

export default UserListItem;
