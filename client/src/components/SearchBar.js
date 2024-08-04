import React, { useState } from 'react';
import { FaSearch } from "react-icons/fa";

const SearchBar = ({ onSearch, darkMode }) => {
    const [city, setCity] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(city);
        setCity("");
    };

    return (
        <form className='search-container' onSubmit={handleSubmit}>
            <input 
                type="text" 
                value={city} 
                onChange={(e) => setCity(e.target.value)} 
                placeholder="Enter city" 
                className={`search-input ${darkMode && "dark-search-input"}`}
            />
            <button type="submit" className='search-btn'>
                <FaSearch color={`${darkMode ? "#fff" : "#000"}`} />
            </button>
        </form>
    );
};

export default SearchBar;
