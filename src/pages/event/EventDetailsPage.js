import React from 'react';
import { useLocation } from 'react-router-dom';

const EventDetailsPage = (props) => {
  const { event } = useLocation();

  return event ? (
    <div className="container">
      <div className="card" style={{ width: '18rem' }}>
        <div className="card-header">Event Details</div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">{event.name}</li>
          <li className="list-group-item">{event.description}</li>
          <li className="list-group-item">{event.capacity}</li>
          <li className="list-group-item">{event.address}</li>
          <li className="list-group-item">{event.date}</li>
        </ul>
      </div>
    </div>
  ) : (
    <p>Event not found</p>
  );
};

export default EventDetailsPage;
