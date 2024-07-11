import React, { useState, useEffect } from 'react';
import './SearchBox.css';

const SearchBox = ({ onSearch, reviews }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    console.log('SearchBox received reviews:', reviews); // Debugging log
  }, [reviews]);

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);

    if (value.length > 0) {
      const allTopics = (reviews || []).flat().map(review => review.topic);
      console.log('All Topics:', allTopics); // Debugging log

      const uniqueTopics = [...new Set(allTopics)];
      console.log('Unique Topics:', uniqueTopics); // Debugging log

      const filteredSuggestions = uniqueTopics.filter(topic =>
        topic.toLowerCase().includes(value.toLowerCase())
      );
      console.log('Filtered Suggestions:', filteredSuggestions); // Debugging log

      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    console.log('Suggestion Clicked:', suggestion); // Debugging log
    setQuery(suggestion);
    onSearch(suggestion);
    setSuggestions([]);
  };

  return (
    <div className="search-box">
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Search by topic..."
      />
      {suggestions.length > 0 && (
        <ul className="suggestions-list">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              className="suggestion-item"
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBox;
