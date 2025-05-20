import React, { useState, useEffect } from 'react';
import './CustomerReview.css';
import reviewImage from '../assets/review.jpeg'; // Only used in this page

const LOCAL_STORAGE_KEY = 'customerReviews';

const CustomerReview = () => {
  const [reviews, setReviews] = useState([]);

  // Load reviews from localStorage on component mount
  useEffect(() => {
    const storedReviews = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedReviews) {
      setReviews(JSON.parse(storedReviews));
    }
  }, []);

  // Save reviews to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(reviews));
  }, [reviews]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const name = e.target.name.value.trim();
    const email = e.target.email.value.trim();
    const rating = e.target.rating.value;
    const message = e.target.message.value.trim();

    if (!name || !email || !rating || !message) {
      alert('Please fill in all fields.');
      return;
    }

    const newReview = {
      id: Date.now(),
      name,
      email,
      rating: parseInt(rating),
      message,
    };

    setReviews([newReview, ...reviews]);
    e.target.reset();
  };

  const handleDelete = (id) => {
    const updatedReviews = reviews.filter((review) => review.id !== id);
    setReviews(updatedReviews);
  };

  return (
    <div
      className="review-page-background"
      style={{ backgroundImage: `url(${reviewImage})` }}
    >
      <div className="review-container">
        <h1>Customer Review Form</h1>
        <form id="review-form" onSubmit={handleSubmit}>
          <label>Name:</label>
          <input type="text" name="name" required />

          <label>Email:</label>
          <input type="email" name="email" required />

          <label>Rating:</label>
          <select name="rating" required>
            <option value="">Select rating</option>
            <option value="5">5 - Excellent</option>
            <option value="4">4 - Very Good</option>
            <option value="3">3 - Good</option>
            <option value="2">2 - Fair</option>
            <option value="1">1 - Poor</option>
          </select>

          <label>Review:</label>
          <textarea name="message" rows="4" required />

          <button type="submit">Submit Review</button>
        </form>

        <h2>Submitted Reviews:</h2>
        <div id="reviews">
          {reviews.length === 0 ? (
            <p>No reviews yet.</p>
          ) : (
            reviews.map((review) => (
              <div key={review.id} className="review">
                <h3>{review.name}</h3>
                <p><strong>Email:</strong> {review.email}</p>
                <p><strong>Rating:</strong> {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}</p>
                <p>{review.message}</p>
                <button onClick={() => handleDelete(review.id)}>Delete</button>
                <hr />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomerReview;
