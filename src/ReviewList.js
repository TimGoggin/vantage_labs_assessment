import React from 'react';
import './ReviewList.css';

const ReviewList = ({ reviews }) => {
  console.log("Reviews Data:", reviews); // Log the entire reviews array

  const formatDate = (dateString) => {
    console.log("Date String:", dateString); // Log the date string passed to formatDate

    if (!dateString) return 'Invalid Date'; // Check for undefined or null dates

    const [day, month, year] = dateString.split(' ');
    const months = {
      January: 0, February: 1, March: 2, April: 3, May: 4, June: 5,
      July: 6, August: 7, September: 8, October: 9, November: 10, December: 11
    };
    const date = new Date(year, months[month], day);

    console.log("Parsed Date:", date); // Log the parsed date object

    if (isNaN(date.getTime())) {
      console.error('Error parsing date:', dateString);
      return 'Invalid Date'; // Return a fallback in case of error
    }

    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString(undefined, options);
  };

  return (
    <div className="review-list">
      {reviews.map((review, index) => {
        console.log("Review Object:", review); // Log each individual review object

        return review.map((innerReview, innerIndex) => {
          console.log("Inner Review Object:", innerReview); // Log each individual inner review object
          
          return (
            <div key={`${index}-${innerIndex}`} className="review-item">
              <a href={innerReview.url} target="_blank" rel="noopener noreferrer" className="review-title">{innerReview.title}</a>
              <p className="review-date">{formatDate(innerReview.date)}</p>
              <p className="review-author">{innerReview.author}</p>
              <p className="review-topic">{innerReview.topic}</p>
            </div>
          );
        });
      })}
    </div>
  );
};

export default ReviewList;