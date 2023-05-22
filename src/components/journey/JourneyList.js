import React, { useState, useEffect } from 'react';
import { getJourneys } from '../../api/apiCalls';
import JourneyListItem from './JourneyListItem';
import { useTranslation } from 'react-i18next';
import { useApiProgress } from '../../shared/ApiProgress';
import { Link } from 'react-router-dom/cjs/react-router-dom';

const JourneyList = () => {
  const journeysPage = {
    page: {
      content: [],
      size: 3,
      number: 0,
    },
  };
  const [page, setPage] = useState(journeysPage);
  const [loadFailure, setLoadFailure] = useState(false);

  const pendingApiCall = useApiProgress('get', '/api/1.0/journeys?page');
  const { content: journeys, last, first, totalPages } = page;

  useEffect(() => {
    loadJourneys();
  }, []);

  const onClickNext = () => {
    const nextPage = page.number + 1;
    loadJourneys(nextPage);
  };

  const onClickBack = () => {
    const previousPage = page.number - 1;
    loadJourneys(previousPage);
  };

  const goToPage = () => {
    if (page.number > totalPages || page.number < 0) {
      page.number = 0;
    }
    loadJourneys(page);
  };

  const loadJourneys = async (page) => {
    setLoadFailure(false);
    try {
      const response = await getJourneys(page);
      setPage(response.data);
    } catch (error) {
      setLoadFailure(true);
    }
  };

  const { t } = useTranslation();

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
      <h1 className="text-center"> {t('Journeys')}</h1>

      <div className="flex-row d-inline-flex mt-2 loatt-end justify-content-start align-items-center">
        <div className="p-2">
          <input
            className="form-control pageInput"
            placeHolder="Enter page number"
            type="number"
            onChange={(e) =>
              setPage(
                e.target.value
                  ? +e.target.value
                  : {
                      content: [],
                      size: 3,
                      number: 0,
                    }
              )
            }
          />
        </div>
        <div className="p-2">
          {' '}
          <button
            className="btn btn-primary"
            onClick={() => {
              goToPage();
              document.querySelector('.pageInput').value = '';
            }}
          >
            {' '}
            {t('Go To Page')}
          </button>
        </div>
        <div className="p-2">
          <h4>
            {totalPages && (
              <span className="badge bg-dark text-light">{`Pages: 0 to ${totalPages}`}</span>
            )}
          </h4>
        </div>

        <div className="p-2">
          {' '}
          <Link
            className=" btn btn-dark"
            to={{
              pathname: '/journeys/add',
            }}
          >
            {t('Add Journey')}
          </Link>
        </div>
      </div>
      <table className="table table-striped justify-content-center">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">{t('Departure')}</th>
            <th scope="col">{t('Name')}</th>
            <th scope="col">Id</th>
            <th scope="col">{t('Return')}</th>
            <th scope="col">{t('Name')}</th>
            <th scope="col">Id</th>
            <th scope="col">{t('Covered Distance')}</th>
            <th scope="col">{t('Duration')}</th>
          </tr>
        </thead>
        <tbody>
          {journeys &&
            journeys.map((journey, index) => (
              <JourneyListItem key={index} journey={journey} />
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

export default JourneyList;
