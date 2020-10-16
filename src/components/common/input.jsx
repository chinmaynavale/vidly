import React from 'react';

const Input = props => {
  const { name, value, label, type, error, onChange } = props;

  return (
    <div className='form-group'>
      <label htmlFor={name}>{label}</label>
      <input
        value={value}
        onChange={onChange}
        name={name}
        id={name}
        type={type}
        className='form-control'
      />
      {error && <div className='alert alert-danger'>{error}</div>}
    </div>
  );
};

export default Input;
