import React from 'react';

const ButtonWithProgress = (props) => {
  const { pendingApiCall, onClick, text, disabled, className } = props;
  return (
    <div className="text-center mt-2 loatt-end">
      <button
        className={className || 'btn btn-dark f'}
        onClick={onClick}
        disabled={disabled}
      >
        {pendingApiCall && (
          <span className="spinner-border spinner-border-sm me-2"></span>
        )}
        {text}
      </button>
    </div>
  );
};

export default ButtonWithProgress;
