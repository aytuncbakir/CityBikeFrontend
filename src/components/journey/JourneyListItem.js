import React from 'react';
import { useTranslation } from 'react-i18next';

const JourneyListItem = (props) => {
  const { journey } = props;

  const { t } = useTranslation();
  return (
    <tr>
      <th scope="row">{journey.id}</th>
      <td className="text-start">{journey.departure}</td>
      <td className="text-start"> {journey.departureStationName}</td>
      <td className="text-start"> {journey.departureStationId}</td>
      <td className="text-start">{journey.returnn}</td>
      <td className="text-start">{journey.returnStationName}</td>
      <td className="text-start">{journey.returnStationId}</td>
      <td className="text-start">{journey.coveredDistance}</td>
      <td className="text-start"> {journey.duration}</td>
    </tr>
  );
};

export default JourneyListItem;
