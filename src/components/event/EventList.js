import React, { useState, useEffect } from 'react';
import { getEvents } from '../../api/apiCalls';
import EventListItem from './EventListItem';
import { useTranslation } from 'react-i18next';
import { useApiProgress } from '../../shared/ApiProgress';
import { Link } from 'react-router-dom/cjs/react-router-dom';

const EventList = () => {
  const eventsPage = {
    page: {
      content: [],
      size: 3,
      number: 0,
    },
  };
  const [page, setPage] = useState(eventsPage);

  const headers = [
    '#',
    'name',
    'description',
    'capacity',
    'address',
    'date',
    'details',
  ];

  const [loadFailure, setLoadFailure] = useState(false);

  const [sorting, setSorting] = useState({ key: headers[0], ascending: true });
  const [currentItems, setCurrentItems] = useState([]);
  const [originalItems, setOriginalItems] = useState([]);

  const pendingApiCall = useApiProgress('get', '/api/1.0/events');

  useEffect(() => {
    loadEvents();
  }, []);

  useEffect(() => {
    if (sorting.key === 'details') return;
    const currentItemsCopy = [...currentItems];
    if (currentItemsCopy.length === 0) return;
    const sortedCurrentItems = currentItemsCopy.sort(
      (a, b) =>
        a[sorting.key].toString() &&
        a[sorting.key].toString().localeCompare(b[sorting.key])
    );

    console.log(sortedCurrentItems);

    setCurrentItems(
      sorting.ascending ? sortedCurrentItems : sortedCurrentItems.reverse()
    );

    setPage({ ...page, content: currentItems });
  }, [sorting.ascending, sorting.key]);

  const onClickNext = () => {
    const nextPage = page.number + 1;
    loadEvents(nextPage);
  };

  const onClickBack = () => {
    const previousPage = page.number - 1;
    loadEvents(previousPage);
  };

  const goToPage = (e) => {
    console.log(e.target.value);

    const goToPage = e.target.value;

    loadEvents(goToPage);
  };

  const loadEvents = async (page) => {
    setLoadFailure(false);
    try {
      const response = await getEvents(page);
      setPage(response.data);
      setCurrentItems(response.data.content);
      setOriginalItems(response.data.content);
    } catch (error) {
      setLoadFailure(true);
    }
  };

  const { t } = useTranslation();
  const { content: events, last, first, totalPages } = page;

  const options = Array.apply(null, Array(totalPages)).map((_, i) => (
    <option value={i}>{i + 1}</option>
  ));

  let navigationDiv = (
    <div>
      {last === false && (
        <button className="btn btn-sm btn-dark float-end" onClick={onClickNext}>
          {`Next >`}
        </button>
      )}
      {first === false && (
        <button className="btn btn-sm btn-dark" onClick={onClickBack}>
          {`< Back`}
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

  function applySorting(key, ascending) {
    setSorting({ key, ascending });
  }

  const onChangeFilter = (e) => {
    if (sorting.key === 'details') return;
    if (e.target.value === '') {
      setCurrentItems(originalItems);
      setPage({ ...page, content: originalItems });
    } else {
      let filteredItems = currentItems.filter((item, index) => {
        if (e.target.placeholder === 'name') {
          return (
            item.name.includes(e.target.value) ||
            item.name.includes(e.target.value.toLowerCase()) ||
            item.name.includes(e.target.value.toUpperCase())
          );
        } else if (e.target.placeholder === 'description') {
          return (
            item.description.includes(e.target.value) ||
            item.description.includes(e.target.value.toLowerCase()) ||
            item.description.includes(e.target.value.toUpperCase())
          );
        } else if (e.target.placeholder === 'capacity') {
          const capacity = item.capacity.toString();
          return (
            capacity.includes(e.target.value) ||
            capacity.includes(e.target.value.toLowerCase()) ||
            capacity.includes(e.target.value.toUpperCase())
          );
        } else if (e.target.placeholder === 'address') {
          return (
            item.address.includes(e.target.value) ||
            item.address.includes(e.target.value.toLowerCase()) ||
            item.address.includes(e.target.value.toUpperCase())
          );
        } else if (e.target.placeholder === 'date') {
          return (
            item.date.includes(e.target.value) ||
            item.date.includes(e.target.value.toLowerCase()) ||
            item.date.includes(e.target.value.toUpperCase())
          );
        }
        return false;
      });
      console.log('filteredItems:', filteredItems);
      setPage({ ...page, content: filteredItems });
    }
  };

  return (
    <div>
      <h1 className="text-center"> {t('Events')}</h1>

      <Link
        className=" btn btn-dark"
        to={{
          pathname: '/events/add',
        }}
      >
        {t('Add Event')}
      </Link>
      <div className="mt-2">
        <select
          className="form-select"
          aria-label="Default select example"
          onClick={(e) => goToPage(e)}
        >
          <option selected>{t('Go To Page')}</option>

          {options}
        </select>
      </div>

      <h3> Events</h3>
      <table className="table table-striped justify-content-center">
        <thead>
          <tr>
            {headers.map((head, index) => (
              <th key={headers[index]}>
                <div
                  style={{
                    display: 'flex',
                    gap: '2px',
                    alignItems: 'center',
                  }}
                >
                  <input
                    className="form-control"
                    type="text"
                    placeholder={headers[index]}
                    onClick={(e) => {
                      applySorting(headers[index], !sorting.ascending);
                    }}
                    onChange={(e) => {
                      onChangeFilter(e);
                    }}
                  ></input>

                  {/* <ion-icon name="swap-vertical-outline"></ion-icon> */}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {events &&
            events.map((event, index) => (
              <EventListItem key={event.id} event={event} />
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

export default EventList;
