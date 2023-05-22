import React from 'react';
import './AutoImageUpload.css';

const AutoImageUpload = ({ image, uploading }) => {
  return (
    <div style={{ position: 'relative' }}>
      <img className="img-thumbnail" src={image} alt="blog-attachment" />
      <div className="overlay" style={{ opacity: uploading ? 1 : 0 }}>
        <div className="d-flex justify-content-center h-100">
          <div className="spinner-border text-light m-auto">
            <span className="sr-only"></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AutoImageUpload;
