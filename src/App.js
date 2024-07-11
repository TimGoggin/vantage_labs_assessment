import React, { useState, useEffect } from 'react';
import ReviewList from './ReviewList';
import SearchBox from './SearchBox';
import './App.css';
import reviewsData from './cochrane_reviews.json';

const App = () => {
  const [reviews, setReviews] = useState([]);
  const [filteredReviews, setFilteredReviews] = useState([]);

  useEffect(() => {
    setReviews(reviewsData);
    setFilteredReviews(reviewsData.slice(0, 10)); // Initial 10 reviews
  }, []);

  const handleSearch = (query) => {
    const result = reviews.filter(review => review.topic.toLowerCase().includes(query.toLowerCase()));
    setFilteredReviews(result.slice(0, 10));
  };

  return (
    <div className="App">
      <SearchBox onSearch={handleSearch} />
      <ReviewList reviews={filteredReviews} />
    </div>
  );
};

export default App;