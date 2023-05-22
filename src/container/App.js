import React from 'react';
import UserPage from '../pages/user/UserPage';
import HomePage from '../pages/HomePage';
import StationPage from '../pages/station/StationPage';
import StationAddPage from '../pages/station/StationAddPage';
import JourneyPage from '../pages/journey/JourneyPage';
import LanguageSelector from '../components/LanguageSelector';
import { HashRouter as Router, Route, Redirect } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import UserSignUpPage from '../pages/user/UserSignUpPage';
import { Switch } from 'react-router-dom/cjs/react-router-dom';
import TopBar from '../components/TopBar';
import { useSelector } from 'react-redux';
import EventPage from '../pages/event/EventPage ';
import EventAddPage from '../pages/event/EventAddPage';
import EventDetailsPage from '../pages/event/EventDetailsPage';
import JourneyAddPage from '../pages/journey/JourneyAddPage';
import StatisticPage from '../pages/StatisticPage';
// import { Authentication } from '../shared/AuthenticationContext';

const App = (props) => {
  const { isLoggedIn } = useSelector((store) => ({
    isLoggedIn: store.isLoggedIn,
  }));

  return (
    <div>
      <Router>
        <TopBar />
        <Switch>
          <Route exact path="/" component={HomePage} />
          {!isLoggedIn && <Route path="/login" component={LoginPage} />}
          {!isLoggedIn && <Route path="/signup" component={UserSignUpPage} />}

          <Route path="/user/:username" component={UserPage} />
          {isLoggedIn ? (
            <Route path="/stations/add" component={StationAddPage} />
          ) : (
            <Redirect to="/" />
          )}
          <Route path="/stations" component={StationPage} />
          <Route path="/location" component={StationPage} />

          {isLoggedIn ? (
            <Route path="/journeys/add" component={JourneyAddPage} />
          ) : (
            <Redirect to="/" />
          )}

          <Route path="/journeys" component={JourneyPage} />
          <Route path="/event" component={EventDetailsPage} />

          {isLoggedIn ? (
            <Route path="/events/add" component={EventAddPage} />
          ) : (
            <Redirect to="/" />
          )}

          <Route exact path="/events" component={EventPage} />
          <Route exact path="/statistics" component={StatisticPage} />

          <Redirect to="/" />
        </Switch>
      </Router>
      <LanguageSelector />
    </div>
  );
};

export default App;
