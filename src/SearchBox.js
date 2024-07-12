import React, { useState, useEffect } from 'react';
import './SearchBox.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const SearchBox = ({ onSearch, onAddSearchTerm, onRemoveSearchTerm, activeSearchTerms, reviews, reviewsCount }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    console.log('SearchBox received reviews count:', reviewsCount);
  }, [reviewsCount]);

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);

    if (value.length > 0) {
      const allTopics = (reviews || []).flat().map(review => review.topic);
      const uniqueTopics = [...new Set(allTopics)];
      const filteredSuggestions = uniqueTopics.filter(topic =>
        topic.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setQuery('');
    onAddSearchTerm(suggestion);
    setSuggestions([]);
  };

  const handleRemoveClick = (term) => {
    onRemoveSearchTerm(term);
  };

  return (
    <div className="search-box-container">
      <div className="search-box">
        <input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder="Search by topic..."
          className="search-input"
        />
        <span className="search-icon"><i className="fas fa-search"></i></span>
      </div>
      {query && (
        <div className="results-count">
          <text><b>{reviewsCount}</b> Cochrane Reviews matching <b>{query}</b> in <b>Cochrane Topic</b></text>
        </div>
      )}
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
      {activeSearchTerms.length > 0 && (
        <div className="active-search-terms">
          {activeSearchTerms.map((term, index) => (
            <span
              key={index}
              className="search-term"
              onClick={() => handleRemoveClick(term)}
            >
              {term} <i className="fas fa-times"></i>
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBox;