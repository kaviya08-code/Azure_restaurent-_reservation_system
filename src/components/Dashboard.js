import React, { useContext, useState, useEffect } from 'react';
import { ReservationContext } from '../context/ReservationContext';
import './Dashboard.css';

const Dashboard = () => {
  const { reservations, deleteReservation } = useContext(ReservationContext);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedReservation, setSelectedReservation] = useState(null);

  useEffect(() => {
    // Set background image on the body when Dashboard page is rendered
    document.body.style.backgroundImage = "url('/assets/dash.jpg')"; // Ensure path is correct
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "center";
    document.body.style.backgroundRepeat = "no-repeat";

    // Cleanup: remove background when leaving the page
    return () => {
      document.body.style.backgroundImage = "";
    };
  }, []);

  const handleCancelClick = (reservation) => {
    setSelectedReservation(reservation);
    setShowPopup(true);
  };

  const handleConfirmCancel = () => {
    deleteReservation(selectedReservation.id);
    setShowPopup(false);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setSelectedReservation(null);
  };

  return (
    <div className="dashboard-container">
      <h2>Your Dashboard</h2>

      {reservations.length === 0 ? (
        <>
          <p>View your upcoming reservations here.</p>
          <p>No upcoming reservations.</p>
        </>
      ) : (
        reservations.map((reservation) => (
          <div key={reservation.id} className="reservation-card">
            <p><strong>Name:</strong> {reservation.name}</p>
            <p><strong>Date & Time:</strong> {reservation.datetime}</p>
            <p><strong>Guests:</strong> {reservation.guests}</p>
            <button
              className="cancel-button"
              onClick={() => handleCancelClick(reservation)}
            >
              Cancel Reservation
            </button>
          </div>
        ))
      )}

      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-container">
            <h3>Are you sure you want to cancel this reservation?</h3>
            <p><strong>Name:</strong> {selectedReservation?.name}</p>
            <p><strong>Date & Time:</strong> {selectedReservation?.datetime}</p>
            <p><strong>Guests:</strong> {selectedReservation?.guests}</p>
            <div className="popup-actions">
              <button className="popup-btn cancel" onClick={handleClosePopup}>No, Keep It</button>
              <button className="popup-btn confirm" onClick={handleConfirmCancel}>Yes, Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
