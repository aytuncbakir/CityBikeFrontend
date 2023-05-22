import React, { useEffect, useState } from 'react';
import FavoriteStations from './station/FavoriteStations';
import {
  getStationsCount,
  getUsersCount,
  getUsersBlogsCount,
  getJourneysCount,
  getTotalCoveredDistance,
  getAverageCoveredDistance,
} from '../api/apiCalls';
import { useApiProgress } from '../shared/ApiProgress';
import Spinner from '../components/Spinner';
import StatisticCard from '../components/StatisticCard';
import { useTranslation } from 'react-i18next';

const StatisticPage = () => {
  const [totalStation, setTotalStation] = useState(0);
  const [totalUser, setTotalUser] = useState(0);
  const [totalBlog, setTotalBlog] = useState(0);
  const [totalJourney, setTotalJourney] = useState(0);
  const [totalCoveredDistance, setTotalCoveredDistance] = useState(0);
  const [averageCoveredDistance, setAverageCoveredDistance] = useState(0);
  const { t } = useTranslation();

  const pendingApiCall = useApiProgress(
    'get',
    '/api/1.0/journeys/average',
    true
  );

  useEffect(() => {
    loadStationsCount();
    loadUsersCount();
    loadTotalBlogCount();
    loadTotalJourneyCount();
    loadTotalCoveredDistance();
    loadAverageCoveredDistance();
  }, []);

  const loadStationsCount = async () => {
    const response = await getStationsCount();
    setTotalStation(response.data);
  };

  const loadUsersCount = async () => {
    const response = await getUsersCount();
    setTotalUser(response.data);
  };

  const loadTotalBlogCount = async () => {
    const response = await getUsersBlogsCount();
    setTotalBlog(response.data);
  };

  const loadTotalJourneyCount = async () => {
    const response = await getJourneysCount();
    setTotalJourney(response.data);
  };

  const loadTotalCoveredDistance = async () => {
    const response = await getTotalCoveredDistance();
    setTotalCoveredDistance(response.data);
  };

  const loadAverageCoveredDistance = async () => {
    const response = await getAverageCoveredDistance();
    setAverageCoveredDistance(response.data);
  };

  let returnHtml = '';
  if (pendingApiCall) {
    returnHtml = <Spinner />;
  } else {
    returnHtml = (
      <div className="container">
        <h1 className="text-center"> {t('Statistics')}</h1>
        <div className="row">
          <div className="col-4">
            <FavoriteStations />
          </div>

          <div className="col-4">
            <StatisticCard title="Total station count" value={totalStation} />
            <StatisticCard title="Users count" value={totalUser} />
            <StatisticCard title="Blogs count" value={totalBlog} />
            <StatisticCard title="Journeys count" value={totalJourney} />
          </div>
          <div className="col-4">
            <StatisticCard
              title="Total covered distace (m)"
              value={totalCoveredDistance}
            />
            <StatisticCard
              title="Average covered distace (m)"
              value={averageCoveredDistance}
            />
          </div>
        </div>
      </div>
    );
  }

  return returnHtml;
};

export default StatisticPage;
