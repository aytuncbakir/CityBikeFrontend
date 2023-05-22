import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const StationListItem = (props) => {
  const { station } = props;

  const { t } = useTranslation();
  return (
    <tr>
      <th scope="row">{station.id}</th>
      <td className="text-start">{t(station.name)}</td>
      <td className="text-start">{station.address}</td>
      <td className="text-start"> {station.kaupunki}</td>
      <td className="text-start"> {station.operaattori}</td>
      <td className="text-start">{station.kapasiteet}</td>
      <td className="text-start">
        <Link
          className=" btn btn-dark"
          to={{
            pathname: '/location',
            station: station, // your data array of objects
          }}
        >
          {t('Location')}
        </Link>
      </td>
    </tr>
  );
};

export default StationListItem;
