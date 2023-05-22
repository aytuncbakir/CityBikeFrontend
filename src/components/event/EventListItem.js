import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const EventListItem = (props) => {
  const { event } = props;
  const { t } = useTranslation();

  console.log(event);
  return (
    <tr>
      <th scope="row">{event.id}</th>
      <td className="text-start">{event.name}</td>
      <td className="text-start">{event.description}</td>
      <td className="text-start"> {event.capacity}</td>
      <td className="text-start"> {event.address}</td>
      <td className="text-start">{event.date}</td>
      <td className="text-end p-2">
        <Link
          className=" btn btn-dark"
          to={{
            pathname: '/event',
            event: event, // your data array of objects
          }}
        >
          {t('Event Details')}
        </Link>
      </td>
    </tr>
  );
};

export default EventListItem;
