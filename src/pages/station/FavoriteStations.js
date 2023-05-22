import React, { useState, useEffect } from 'react';
import { getFavoriteDepartures, getFavoriteReturns } from '../../api/apiCalls';
import { useTranslation } from 'react-i18next';
import { useApiProgress } from '../../shared/ApiProgress';
import Spinner from '../../components/Spinner';

const FavoriteStations = (props) => {
  const { station } = props;

  const [departures, setDepartures] = useState([]);
  const [returns, setReturns] = useState([]);

  const pendingApiCallDepartures = useApiProgress(
    'get',
    '/api/1.0/stations/favorite/departures',
    true
  );
  const pendingApiCallReturns = useApiProgress(
    'get',
    '/api/1.0/stations/favorite/returns',
    true
  );

  useEffect(() => {
    getDepartures();
    getReturns();
  }, []);

  const getDepartures = async () => {
    try {
      const response = await getFavoriteDepartures();
      console.log(response);
      setDepartures(response.data);
    } catch (error) {}
  };

  const getReturns = async () => {
    try {
      const response = await getFavoriteReturns();
      setReturns(response.data);
    } catch (error) {}
  };

  const { t } = useTranslation();

  console.log(departures);

  return (
    <>
      {pendingApiCallDepartures || pendingApiCallReturns ? (
        <Spinner />
      ) : (
        <>
          <div className="row">
            <div className="card" style={{ width: '18rem' }}>
              <div className="card-header">
                <strong>Favorite Departures </strong>
              </div>
              <ul className="list-group list-group-flush">
                {departures.map((departure, index) => (
                  <li key={index} className="list-group-item">{`${
                    index + 1
                  }- ${departure}`}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="row">
            <div className="card" style={{ width: '18rem' }}>
              <div className="card-header">
                <strong>Favorite Returns </strong>
              </div>
              <ul className="list-group list-group-flush">
                {returns.map((returnn, index) => (
                  <li key={index} className="list-group-item">{`${
                    index + 1
                  }- ${returnn}`}</li>
                ))}
              </ul>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default FavoriteStations;
