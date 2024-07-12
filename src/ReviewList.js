import React from 'react';
import './ReviewList.css';

const ReviewList = ({ reviews, lastReviewElementRef }) => {
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
              <p className="review-date">{review.date}</p>
              
            </div>
          );
        } else {
          return (
            <div key={index} className="review-item">
              <a href={review.url} target="_blank" rel="noopener noreferrer" className="review-title">
                {review.title}
              </a>
              <p className="review-author">{review.author}</p>
              <p className="review-date">{review.date}</p>
              
            </div>
          );
        }
      })}
    </div>
  );
};

export default ReviewList;