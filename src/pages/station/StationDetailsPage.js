import React, { useState, useEffect } from 'react';
import {
  getDepartureCount,
  getReturnCount,
  getAverageDistanceAsDeparture,
  getAverageDistanceAsReturn,
} from '../../api/apiCalls';
import { useTranslation } from 'react-i18next';
import { useApiProgress } from '../../shared/ApiProgress';
import Spinner from '../../components/Spinner';

const StationDetailsPage = (props) => {
  const { station } = props;
  const { id } = station;

  const [departure, setDeparture] = useState();
  const [returnn, setReturn] = useState();
  const [averageReturn, setAverageReturn] = useState();
  const [averageDeparture, setAverageDeparture] = useState();

  const pendingApiCallDeparture = useApiProgress(
    'get',
    `/api/1.0/journeys/departure/count?id=${id}`,
    true
  );
  const pendingApiCallReturn = useApiProgress(
    'get',
    `/api/1.0/journeys/return/count?id=${id}`,
    true
  );

  useEffect(() => {
    getDeparture(id);
    getReturn(id);
    getAverageDistanceDeparture(id);
    getAverageDistanceReturn(id);
  }, [id]);

  const getDeparture = async (id) => {
    try {
      const response = await getDepartureCount(id);
      setDeparture(response.data);
    } catch (error) {}
  };

  const getReturn = async (id) => {
    try {
      const response = await getReturnCount(id);
      setReturn(response.data);
    } catch (error) {}
  };

  const getAverageDistanceDeparture = async (id) => {
    try {
      const response = await getAverageDistanceAsDeparture(id);
      setAverageDeparture(response.data);
    } catch (error) {}
  };

  const getAverageDistanceReturn = async (id) => {
    try {
      const response = await getAverageDistanceAsReturn(id);
      setAverageReturn(response.data);
    } catch (error) {}
  };

  const { t } = useTranslation();

  return (
    <>
      {pendingApiCallDeparture || pendingApiCallReturn ? (
        <Spinner />
      ) : (
        <>
          <div className="card" style={{ width: '18rem' }}>
            <div className="card-header">
              <strong>City: </strong>
              {station.kaupunki}
            </div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                {' '}
                <strong>Street: </strong>
                {station.nimi}
              </li>
              <li className="list-group-item">
                <strong>Address: </strong>
                {station.osoite}
              </li>
              <li className="list-group-item">
                <strong>Operator: </strong>
                {station.operaattori}
              </li>
              <li className="list-group-item">
                <strong>Capacity: </strong>
                {station.kapasiteet}
              </li>
              <li className="list-group-item">
                <strong>Depature: </strong>
                {departure}
              </li>
              <li className="list-group-item">
                <strong>Return: </strong>
                {returnn}
              </li>
              <li className="list-group-item">
                <strong>Covered Distance as Departure: </strong>
                {averageDeparture}
              </li>
              <li className="list-group-item">
                <strong>Covered Distance as Return: </strong>
                {averageReturn}
              </li>
            </ul>
          </div>
        </>
      )}
    </>
  );
};

export default StationDetailsPage;
