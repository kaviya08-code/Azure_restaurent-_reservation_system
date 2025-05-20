import React, { useContext, useEffect, useState } from 'react';
import { ReservationContext } from '../context/ReservationContext';
import './AdminPanel.css';  // Import your enhanced CSS file

const TOTAL_TABLES = 20;
const GUESTS_PER_TABLE = 2;
const LOCAL_STORAGE_REVIEW_KEY = 'customerReviews';

const AdminPanel = () => {
  const { reservations, deleteReservation } = useContext(ReservationContext);
  const [availableTables, setAvailableTables] = useState(TOTAL_TABLES);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const usedTables = reservations.reduce((total, res) => {
      return total + Math.ceil(Number(res.guests) / GUESTS_PER_TABLE);
    }, 0);
    setAvailableTables(TOTAL_TABLES - usedTables);
  }, [reservations]);

  useEffect(() => {
    const storedReviews = localStorage.getItem(LOCAL_STORAGE_REVIEW_KEY);
    if (storedReviews) {
      setReviews(JSON.parse(storedReviews));
    }
  }, []);

  return (
    <div className="admin-container">
      <div className="overlay">
        <div className="admin-content">
          <h1>Admin Panel</h1>
          <p><strong>Total Reservations:</strong> {reservations.length}</p>
          <p><strong>Available Tables:</strong> {availableTables}</p>

          <h3>Reservations</h3>
          {reservations.length === 0 ? (
            <p className="no-items">No reservations found.</p>
          ) : (
            reservations.map((res) => (
              <div key={res.id} className="menu-item">
                <div>
                  <p><strong>Name:</strong> {res.name}</p>
                  <p><strong>Date & Time:</strong> {res.datetime}</p>
                  <p><strong>Guests:</strong> {res.guests}</p>
                  <p><strong>Tables Used:</strong> {Math.ceil(res.guests / GUESTS_PER_TABLE)}</p>
                </div>
                <button className="delete-btn" onClick={() => deleteReservation(res.id)}>Delete</button>
              </div>
            ))
          )}

          <h3>Customer Reviews</h3>
          {reviews.length === 0 ? (
            <p className="no-items">No reviews yet.</p>
          ) : (
            reviews.map((review) => (
              <div key={review.id} className="menu-item">
                <div>
                  <p><strong>Name:</strong> {review.name}</p>
                  <p><strong>Email:</strong> {review.email}</p>
                  <p><strong>Rating:</strong> {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}</p>
                  <p>{review.message}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
