import React from 'react';

const ReviewList = ({ reviews }) => {
  return (
    <div className="review-list">
      {reviews.map((review, index) => (
        <div key={index} className="review-item">
          <a href={review.URL} target="_blank" rel="noopener noreferrer">{review.Title}</a>
          <p><strong>Date:</strong> {review.Date}</p>
          <p><strong>Topic:</strong> {review.Topic}</p>
          <p><strong>Authors:</strong> {review.Author}</p>
        </div>
      ))}
    </div>
  );
};

export default ReviewList;