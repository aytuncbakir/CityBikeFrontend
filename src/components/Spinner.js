import React from 'react';

const Spinner = (props) => {
  const { small } = props;
  return (
    <div className="d-flex justify-content-center">
      <div
        className={
          small ? 'spinner-border spinner-border-sm' : 'spinner-border'
        }
      >
        <span className="sr-only"></span>
      </div>
    </div>
  );
};

export default Spinner;
