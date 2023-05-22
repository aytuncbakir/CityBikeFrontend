import React, { useState, useEffect } from 'react';
import { getStations } from '../../api/apiCalls';
import StationListItem from './StationListItem';
import { useTranslation } from 'react-i18next';
import { useApiProgress } from '../../shared/ApiProgress';
import { Link } from 'react-router-dom/cjs/react-router-dom';

const StationList = () => {
  const stationsPage = {
    page: {
      content: [],
      size: 3,
      number: 0,
    },
  };
  const [page, setPage] = useState(stationsPage);

  const [loadFailure, setLoadFailure] = useState(false);

  const pendingApiCall = useApiProgress('get', '/api/1.0/stations?page');

  useEffect(() => {
    loadStations();
  }, []);

  const onClickNext = () => {
    const nextPage = page.number + 1;
    loadStations(nextPage);
  };

  const onClickBack = () => {
    const previousPage = page.number - 1;
    loadStations(previousPage);
  };

  const goToPage = (e) => {
    console.log(e.target.value);

    const goToPage = e.target.value;

    loadStations(goToPage);
  };

  const loadStations = async (page) => {
    setLoadFailure(false);
    try {
      const response = await getStations(page);
      setPage(response.data);
    } catch (error) {
      setLoadFailure(true);
    }
  };

  const { t } = useTranslation();
  const { content: stations, last, first, totalPages } = page;
  const options = Array.apply(null, Array(totalPages)).map((_, i) => (
    <option value={i}>{i + 1}</option>
  ));

  let navigationDiv = (
    <div>
      {last === false && (
        <button className="btn btn-sm btn-dark float-end" onClick={onClickNext}>
          {t('Next >')}
        </button>
      )}
      {first === false && (
        <button className="btn btn-sm btn-dark" onClick={onClickBack}>
          {t('< Back')}
        </button>
      )}
    </div>
  );

  if (pendingApiCall) {
    navigationDiv = (
      <div className="d-flex justify-content-center">
        <div className="spinner-border">
          <span className="sr-only"></span>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-center"> {t('Stations')}</h1>
      <div
        className="container float-end"
        style={{ display: 'flex', gap: '4px' }}
      >
        <div>
          <Link
            className=" btn btn-dark"
            to={{
              pathname: '/location',
              stations: stations, // your data array of objects
            }}
          >
            {t('Show All Stations')}
          </Link>
        </div>

        <div>
          <Link
            className=" btn btn-dark"
            to={{
              pathname: '/stations/add',
            }}
          >
            {t('Add Station')}
          </Link>
        </div>

        <div>
          <select
            className="form-select"
            aria-label="Default select example"
            onClick={(e) => goToPage(e)}
          >
            <option selected>{t('Go To Page')}</option>

            {options}
          </select>
        </div>
      </div>

      <table className="table table-striped justify-content-center">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">{t('Name')}</th>
            <th scope="col">{t('Address')}</th>
            <th scope="col">{t('City')}</th>
            <th scope="col">{t('Operator')}</th>
            <th scope="col">{t('Capacity')}</th>
            <th scope="col">{t('Map')}</th>
          </tr>
        </thead>
        <tbody>
          {stations &&
            stations.map((station, index) => (
              <StationListItem key={index} station={station} />
            ))}
        </tbody>
      </table>
      {navigationDiv}
      {loadFailure && (
        <div className="alert alert-danger" role="alert">
          {t('Load Failure')}
        </div>
      )}
    </div>
  );
};

export default StationList;
