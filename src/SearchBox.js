import React, { useState } from 'react';

const SearchBox = ({ topics, onSearch }) => {
  const [query, setQuery] = useState('');

  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    setQuery(inputValue);
    onSearch(inputValue);
  };

  return (
    <div className="search-box">
      <input
        type="text"
        placeholder="Search by Cochrane Topic..."
        value={query}
        onChange={handleInputChange}
      />
      {query.length > 0 && (
        <div className="suggestions">
          {topics
            .filter((topic) => topic.toLowerCase().includes(query.toLowerCase()))
            .map((topic, index) => (
              <div key={index} className="suggestion-item" onClick={() => setQuery(topic)}>
                {topic}
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default SearchBox;