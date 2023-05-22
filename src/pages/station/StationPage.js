import React from 'react';
import StationList from '../../components/station/StationList';
import Map from './Map';

import { useSelector } from 'react-redux';

const StationPage = (props) => {
  const { path } = props.match;

  console.log(path);
  // const station = path === '/stations';
  const reduxState = useSelector((store) => ({
    isLoggedIn: store.isLoggedIn,
    username: store.username,
  }));

  const { isLoggedIn } = reduxState;

  return (
    <div className="container">
      {isLoggedIn && path !== '/location' && <StationList />}
      {isLoggedIn && path === '/location' && <Map />}
    </div>
  );
};

export default StationPage;
