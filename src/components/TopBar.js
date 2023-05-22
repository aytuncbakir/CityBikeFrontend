import React, { useState, useEffect, useRef } from 'react';
import logo from '../assets/bike.png';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
// import {Authentication} from '../shared/AuthenticationContext';
import { useDispatch, useSelector } from 'react-redux';
import { logoutSuccess } from '../redux/authActions';
import ProfileImageDefault from './profile/ProfileImageDefault';

const TopBar = (props) => {
  // static contextType = Authentication;

  const { t } = useTranslation();

  const reduxState = useSelector((store) => ({
    isLoggedIn: store.isLoggedIn,
    username: store.username,
    displayName: store.displayName,
    image: store.image,
  }));

  const { isLoggedIn, username, displayName, image } = reduxState;
  const dispatch = useDispatch();

  const menuArea = useRef(null);

  const [menuVisible, setMenuVisible] = useState(false);

  useEffect(() => {
    document.addEventListener('click', menuClickTracker);
    return () => {
      document.removeEventListener('click', menuClickTracker);
    };
  }, [isLoggedIn]);

  const menuClickTracker = (e) => {
    if (menuArea.current === null || !menuArea.current.contains(e.target))
      setMenuVisible(false);
  };

  let dropDownClass = 'dropdown-menu p-0 shadow';
  if (menuVisible) {
    dropDownClass += ' show';
  }
  let links = (
    <ul className="navbar-nav ms-auto">
      <li>
        <Link className="nav-link text-light" to="/login">
          {t('Login')}
        </Link>
      </li>

      <li>
        <Link className="nav-link text-light" to="/signup">
          {t('Sign Up')}
        </Link>
      </li>
    </ul>
  );

  if (isLoggedIn) {
    links = (
      <ul className="navbar-nav ms-auto">
        <li>
          <Link className="nav-link text-light" to="/statistics">
            {t('Statistics')}
          </Link>
        </li>
        <li>
          <Link className="nav-link text-light" to="/blogs">
            {t('Blogs')}
          </Link>
        </li>
        <li>
          <Link className="nav-link text-light" to="/events">
            {t('Events')}
          </Link>
        </li>
        <li>
          <Link className="nav-link text-light" to="/stations">
            {t('Stations')}
          </Link>
        </li>
        <li>
          <Link className="nav-link text-light" to="/journeys">
            {t('Journeys')}
          </Link>
        </li>

        <li className="nav-item dropdown text-light" ref={menuArea}>
          <div
            className="d-flex"
            style={{ cursor: 'pointer' }}
            onClick={() => setMenuVisible(true)}
          >
            <ProfileImageDefault
              className="rounded-circle m-auto"
              image={image}
              width="32"
              height="32"
            />
            <span className="nav-link dropdown-toggle text-light">
              {displayName}
            </span>
          </div>
          <div className={dropDownClass}>
            <Link
              className="dropdown-item text-dark d-flex p-1"
              to={`/user/${username}`}
              onClick={() => setMenuVisible(false)}
            >
              <i className="material-icons text-info me-1">person</i>
              {t('My Profile')}
            </Link>

            <Link
              className="dropdown-item text-dark  d-flex p-1"
              to="/login"
              onClick={() => {
                dispatch(logoutSuccess());
              }}
            >
              <i className="material-icons text-danger me-1">
                power_settings_new
              </i>
              {t('Logout')}
            </Link>
          </div>
        </li>
      </ul>
    );
  }

  return (
    <div className="shadow-sm bg-dark mb-2">
      <nav className="navbar navbar-light container navbar-expand justify-content-center">
        <Link className="navbar-brand text-light" to="/">
          <img src={logo} width="40" alt="citybike-logo" />
          {t('CityBike Finland')}
        </Link>

        {links}
      </nav>
    </div>
  );
};

export default TopBar;
