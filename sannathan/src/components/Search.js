import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';


function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
    onSearch(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      onSearch(searchTerm);
    }
  };

  return (
    <div className="search-bar">
         <FaSearch className="search-bar__icon" />
      <input
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        placeholder="Search For Patient"
      />
     
    </div>
  );
}

export default SearchBar;
