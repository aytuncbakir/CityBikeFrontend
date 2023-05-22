import React from 'react';
import { useSelector } from 'react-redux';
import UserList from '../components/user/UserList';
import BlogSubmit from '../components/blog/BlogSubmit';
import BlogFeed from '../components/blog/BlogFeed';

const HomePage = (props) => {
  // const { path } = props.match;

  const { isLoggedIn } = useSelector((store) => ({
    isLoggedIn: store.isLoggedIn,
  }));

  return (
    <div className="container">
      <div className="row">
        <div className="col-8">
          {isLoggedIn && (
            <div className="mb-1 mt-5">
              <BlogSubmit />
            </div>
          )}
          <BlogFeed />
        </div>

        <div className="col-4">
          <UserList />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
