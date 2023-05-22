import React from 'react';

const Input = (props) => {
  const { label, error, name, onChange, type, defaultValue } = props;
  let className = 'form-control';
  if (type === 'file') {
    className += '-file';
  }

  if (error !== undefined) {
    className += ' is-invalid';
  }

  return (
    <div className="form-group mt-2">
      <label>{label}</label>
      <input
        className={className}
        name={name}
        type={type}
        onChange={onChange}
        defaultValue={defaultValue}
        required
      />
      <div className="invalid-feedback">{error}</div>
    </div>
  );
};

export default Input;
