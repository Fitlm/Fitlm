import React from 'react';
import PropTypes from 'prop-types';

const SearchInput = ({ onSearch, searchTerm }) => {
  return (
    <input 
      className='p-2 border border-gray-300 rounded-md'
      type='text'
      placeholder='검색하세요.'
      onChange={onSearch}
      value={searchTerm}
    />
  )
}

SearchInput.propTypes = {
  onSearch: PropTypes.func.isRequired,
  searchTerm: PropTypes.string.isRequired
};

export default SearchInput;
