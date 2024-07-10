import React, { useState, useEffect } from 'react';
import ReviewList from './ReviewList'
import SearchBox from './SearchBox';
import reviewsData from './cochrane_reviews.json'; // Adjust path if necessary

const App = () => {
  const [reviews, setReviews] = useState([]);
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    setReviews(reviewsData);
    setFilteredReviews(reviewsData);
    const allTopics = [...new Set(reviewsData.map((review) => review.Topic))];
    setTopics(allTopics);
  }, []);

  const handleSearch = (query) => {
    if (query === '') {
      setFilteredReviews(reviews);
    } else {
      const filtered = reviews.filter((review) =>
        review.Topic.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredReviews(filtered);
    }
  };

  return (
    <div className="app">
      <h1>Cochrane Reviews</h1>
      <SearchBox topics={topics} onSearch={handleSearch} />
      <ReviewList reviews={filteredReviews} />
    </div>
  );
};

export default App;