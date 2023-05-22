import axios from 'axios';

export const signup = (user) => {
  return axios.post('/api/1.0/users', user);
};

export const getUsersCount = () => {
  return axios.get(`/api/1.0/users/count`);
};

export const getUsersBlogsCount = () => {
  return axios.get(`/api/1.0/users/blogs/count`);
};

export const login = (credentials) => {
  return axios.post('/api/1.0/auth', credentials);
};

export const logout = () => {
  return axios.post('/api/1.0/logout');
};

export const getStations = (page = 0, size = 6) => {
  return axios.get(`/api/1.0/stations?page=${page}&size=${size}`);
};

export const getStationsCount = () => {
  return axios.get(`/api/1.0/stations/count`);
};

export const addStation = (station) => {
  return axios.post(`/api/1.0/stations/add`, station);
};

export const addJourney = (journey) => {
  return axios.post(`/api/1.0/journeys/add`, journey);
};

export const getEvents = (page = 0, size = 8) => {
  return axios.get(`/api/1.0/events?page=${page}&size=${size}`);
};

export const addEvent = (event) => {
  return axios.post(`/api/1.0/events/add`, event);
};

export const getJourneys = (page = 0, size = 9) => {
  return axios.get(`/api/1.0/journeys?page=${page}&size=${size}`);
};

export const getJourneysCount = () => {
  return axios.get(`/api/1.0/journeys/count`);
};

export const getTotalCoveredDistance = () => {
  return axios.get(`/api/1.0/journeys/total`);
};

export const getAverageCoveredDistance = () => {
  return axios.get(`/api/1.0/journeys/average`);
};

export const getReturnCount = (id) => {
  return axios.get(`/api/1.0/journeys/return/count?id=${id}`);
};

export const getDepartureCount = (id) => {
  return axios.get(`/api/1.0/journeys/departure/count?id=${id}`);
};

export const changeLanguage = (language) => {
  axios.defaults.headers['accept-language'] = language;
};

export const getUsers = (page = 0, size = 5) => {
  return axios.get(`/api/1.0/users?page=${page}&size=${size}`);
};

export const getUser = (username) => {
  return axios.get(`/api/1.0/users/${username}`);
};

export const setAuthorizationHeader = ({ isLoggedIn, token }) => {
  if (isLoggedIn) {
    const authorizationHeaderValue = `Bearer ${token}`;
    axios.defaults.headers['Authorization'] = authorizationHeaderValue;
  } else delete axios.defaults.headers['Authorization'];
};

export const updateUser = (username, body) => {
  return axios.put(`/api/1.0/users/${username}`, body);
};

export const postBlog = (blog) => {
  return axios.post('/api/1.0/blogs', blog);
};

export const getBlogs = (username, page = 0) => {
  const path = username
    ? `/api/1.0/users/${username}/blogs?page=`
    : '/api/1.0/blogs?page=';
  return axios.get(path + page);
};

export const getOldBlogs = (id, username) => {
  const path = username
    ? `/api/1.0/users/${username}/blogs/${id}`
    : `/api/1.0/blogs/${id}`;
  return axios.get(path);
};

export const getNewBlogsCount = (id, username) => {
  const path = username
    ? `/api/1.0/users/${username}/blogs/${id}?count=true`
    : `/api/1.0/blogs/${id}?count=true`;
  return axios.get(path);
};

export const getNewBlogs = (id, username) => {
  const path = username
    ? `/api/1.0/users/${username}/blogs/${id}?direction=after`
    : `/api/1.0/blogs/${id}?direction=after`;

  return axios.get(path);
};

export const postBlogAttachment = (attachment) => {
  return axios.post('/api/1.0/blog-attachments', attachment);
};

export const deleteBlog = (id) => {
  return axios.delete(`/api/1.0/blogs/${id}`);
};

export const deleteUser = (username) => {
  return axios.delete(`/api/1.0/users/${username}`);
};

export const getFavoriteDepartures = () => {
  return axios.get('/api/1.0/stations/favorite/departures');
};

export const getFavoriteReturns = () => {
  return axios.get('/api/1.0/stations/favorite/returns');
};

export const getAverageDistanceAsDeparture = (id) => {
  return axios.get('/api/1.0/journeys/departure/average?id=' + id);
};

export const getAverageDistanceAsReturn = (id) => {
  return axios.get('/api/1.0/journeys/return/average?id=' + id);
};
