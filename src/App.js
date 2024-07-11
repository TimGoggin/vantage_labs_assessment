import React, { useState, useEffect, useRef, useCallback } from 'react';
import ReviewList from './ReviewList';
import SearchBox from './SearchBox';
import './App.css';
import reviewsData from './cochrane_reviews.json';

const App = () => {
  const [reviews, setReviews] = useState([]);
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [visibleReviews, setVisibleReviews] = useState([]);
  const [page, setPage] = useState(1);
  const reviewsPerPage = 10;

  useEffect(() => {
    setReviews(reviewsData);
    setFilteredReviews(reviewsData);
  }, []);

  useEffect(() => {
    const newVisibleReviews = [];
    for (let i = 0; i < filteredReviews.length; i++) {
      const chunk = filteredReviews[i];
      for (let j = 0; j < chunk.length; j++) {
        newVisibleReviews.push(chunk[j]);
        if (newVisibleReviews.length >= reviewsPerPage * page) break;
      }
      if (newVisibleReviews.length >= reviewsPerPage * page) break;
    }
    setVisibleReviews(newVisibleReviews);
  }, [filteredReviews, page]);

  const handleSearch = (query) => {
    console.log('Search Query:', query); // Debugging log
    if (query === '') {
      setFilteredReviews(reviews);
    } else {
      const result = reviews.filter(chunk => chunk.some(review => review.topic.toLowerCase().includes(query.toLowerCase())));
      console.log('Filtered Results:', result); // Debugging log
      setFilteredReviews(result);
    }
    setPage(1); // Reset page to 1 when a new search is made
  };


  const observer = useRef();
  const lastReviewElementRef = useCallback(node => {
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        setPage(prevPage => prevPage + 1);
      }
    });
    if (node) observer.current.observe(node);
  }, []);

  return (
    <div className="App">
      <SearchBox onSearch={handleSearch} reviews = {reviews} />
      <ReviewList reviews={visibleReviews} lastReviewElementRef={lastReviewElementRef} />
    </div>
  );
};

export default App;