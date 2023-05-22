import React, { useState, useEffect } from 'react';
import {
  getBlogs,
  getNewBlogsCount,
  getOldBlogs,
  getNewBlogs,
} from '../../api/apiCalls';
import BlogView from './BlogView';
import { useApiProgress } from '../../shared/ApiProgress';
import Spinner from '../Spinner';
import { useParams } from 'react-router-dom';

const BlogFeed = () => {
  const [blogPage, setBlogPage] = useState({
    content: [],
    last: true,
    number: 0,
  });
  const [newBlogsCount, setNewBlogsCount] = useState(0);

  const { username } = useParams();

  const path = username ? `/api/1.0/users/${username}/blogs` : '/api/1.0/blogs';

  let lastBlogId = 0;
  let firstBlogId = 0;
  if (blogPage.content.length > 0) {
    const lastBlogIndex = blogPage.content.length - 1;
    lastBlogId = blogPage.content[lastBlogIndex].id;
    firstBlogId = blogPage.content[0].id;
  }

  const initialBlogsLoadProgress = useApiProgress('get', path);

  const oldBlogsLoadPath = username
    ? `/api/1.0/users/${username}/blogs/${lastBlogId}`
    : `/api/1.0/blogs/${lastBlogId}`;
  const loadOldBlogsLoadProgress = useApiProgress(
    'get',
    oldBlogsLoadPath,
    true
  );

  const newBlogLoadPath = username
    ? `/api/1.0/users/${username}/blogs/${firstBlogId}?direction=after`
    : `/api/1.0/blogs/${firstBlogId}?direction=after`;

  const loadNewBlogsLoadProgress = useApiProgress('get', newBlogLoadPath, true);

  useEffect(() => {
    const getCount = async () => {
      const response = await getNewBlogsCount(firstBlogId, username);
      setNewBlogsCount(response.data.count);
    };
    let looper = setInterval(getCount, 5000);
    return () => clearInterval(looper);
  }, [firstBlogId, username]);

  useEffect(() => {
    const loadBlogs = async (page) => {
      try {
        const response = await getBlogs(username, page);
        setBlogPage((previousBlogPage) => ({
          ...response.data,
          content: [...previousBlogPage.content, ...response.data.content],
        }));
      } catch (error) {}
    };
    loadBlogs();
  }, [username]);

  const loadOldBlogs = async () => {
    try {
      const response = await getOldBlogs(lastBlogId, username);
      setBlogPage((previousBlogPage) => ({
        ...response.data,
        content: [...previousBlogPage.content, ...response.data.content],
      }));
    } catch (error) {}
  };

  const loadNewBlogs = async () => {
    try {
      const response = await getNewBlogs(firstBlogId, username);
      setBlogPage((previousBlogPage) => ({
        previousBlogPage,
        content: [...response.data, ...previousBlogPage.content],
      }));
      setNewBlogsCount(0);
    } catch (error) {}
  };

  const onDeleteBlogSuccess = (id) => {
    setBlogPage((previousBlogPage) => ({
      ...previousBlogPage,
      content: previousBlogPage.content.filter((blog) => blog.id !== id),
    }));
  };

  const { content, last } = blogPage;
  if (content.length === 0) {
    return (
      <div className="alert alert-secondary text-center">
        {initialBlogsLoadProgress ? <Spinner /> : 'There are no blogs'}
      </div>
    );
  }

  return (
    <div>
      {newBlogsCount > 0 && (
        <div
          className="alert alert-secondary text-center mb-1"
          onClick={loadNewBlogsLoadProgress ? () => {} : loadNewBlogs}
          style={{
            cursor: loadNewBlogsLoadProgress ? 'not-allowed' : 'pointer',
          }}
        >
          {loadNewBlogsLoadProgress ? <Spinner /> : 'There are new blogs'}
        </div>
      )}
      {content.map((blog, index) => (
        <BlogView
          key={blog.id}
          blog={blog}
          onDeleteBlog={onDeleteBlogSuccess}
        />
      ))}
      {!last && (
        <div
          className="alert alert-secondary text-center"
          onClick={loadOldBlogsLoadProgress ? () => {} : loadOldBlogs}
          style={{
            cursor: loadOldBlogsLoadProgress ? 'not-allowed' : 'pointer',
          }}
        >
          {loadOldBlogsLoadProgress ? <Spinner /> : 'Load old blogs'}
        </div>
      )}
    </div>
  );
};

export default BlogFeed;
