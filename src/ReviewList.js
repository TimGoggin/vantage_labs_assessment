import React from 'react';
import './ReviewList.css';

const ReviewList = ({ reviews, lastReviewElementRef }) => {
  const formatDate = (dateString) => {
    if (!dateString) return 'Invalid Date';
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return 'Invalid Date';
    }
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString(undefined, options);
  };

  return (
    <div className="review-list">
      {reviews.map((review, index) => {
        if (index === reviews.length - 1) {
          return (
            <div ref={lastReviewElementRef} key={index} className="review-item">
              <a href={review.url} target="_blank" rel="noopener noreferrer" className="review-title">
                {review.title}
              </a>
              <p className="review-author">{review.author}</p>
              <p className="review-date">{formatDate(review.date)}</p>
              
            </div>
          );
        } else {
          return (
            <div key={index} className="review-item">
              <a href={review.url} target="_blank" rel="noopener noreferrer" className="review-title">
                {review.title}
              </a>
              <p className="review-author">{review.author}</p>
              <p className="review-date">{formatDate(review.date)}</p>
              
            </div>
          );
        }
      })}
    </div>
  );
};

export default ReviewList;