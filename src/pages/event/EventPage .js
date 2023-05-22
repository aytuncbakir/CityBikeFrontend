import React from 'react';
import EventList from '../../components/event/EventList';
import EventListItem from '../../components/event/EventListItem';

import { useSelector } from 'react-redux';

const EventPage = (props) => {
  console.log('++++++++', props);
  const { path } = props.match;

  console.log('*****', path);
  // const station = path === '/stations';
  const reduxState = useSelector((store) => ({
    isLoggedIn: store.isLoggedIn,
    username: store.username,
  }));

  const { isLoggedIn } = reduxState;

  return (
    <div className="container">
      {isLoggedIn && path === '/events' && <EventList />}
      {isLoggedIn && path === '/event' && <EventListItem />}
    </div>
  );
};

export default EventPage;
