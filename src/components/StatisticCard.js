import React from 'react';

const StatisticCard = ({ title, value }) => {
  return (
    <div className="card" style={{ width: '18rem' }}>
      <div className="card-header">
        <strong>{title}</strong>
      </div>
      <ul className="list-group list-group-flush">
        <li key={value} className="list-group-item">
          {value}
        </li>
      </ul>
    </div>
  );
};

export default StatisticCard;
