import React from 'react';

const SearchBox = ({ value, onChange }) => {
  return (
    <input
      type='search'
      name='query'
      placeholder='Search...'
      value={value}
      onChange={e => onChange(e.currentTarget.value)}
      className='form-control mb-3'
    />
  );
};

export default SearchBox;
