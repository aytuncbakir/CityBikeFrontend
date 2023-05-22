import React from 'react';
import JourneyList from '../../components/journey/JourneyList';
import { useSelector } from 'react-redux';

const JourneyPage = (props) => {
  const { path } = props.match;

  console.log(path);
  // const station = path === '/stations';
  const reduxState = useSelector((store) => ({
    isLoggedIn: store.isLoggedIn,
    username: store.username,
  }));

  const { isLoggedIn } = reduxState;

  return <div className="container">{isLoggedIn && <JourneyList />}</div>;
};

export default JourneyPage;
