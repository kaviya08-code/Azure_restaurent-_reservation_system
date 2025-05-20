import React, { useState, useContext, useEffect, useRef } from 'react';
import { ReservationContext } from '../context/ReservationContext';
import bookingImage from '../assets/booking.jpg';
import './Reservations.css';
import emailjs from '@emailjs/browser';

const TOTAL_TABLES = 20;
const GUESTS_PER_TABLE = 2;

const Reservations = () => {
  const { reservations, addReservation } = useContext(ReservationContext);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    datetime: '',
    guests: '',
  });
  const [availableTables, setAvailableTables] = useState(TOTAL_TABLES);
  const [showPopup, setShowPopup] = useState(false);
  const formRef = useRef();

  useEffect(() => {
    const usedTables = reservations.reduce((total, res) => {
      return total + Math.ceil(Number(res.guests) / GUESTS_PER_TABLE);
    }, 0);
    setAvailableTables(TOTAL_TABLES - usedTables);
  }, [reservations]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const requiredTables = Math.ceil(Number(formData.guests) / GUESTS_PER_TABLE);

    if (requiredTables > availableTables) {
      alert(`Not enough tables available. Only ${availableTables} tables left.`);
      return;
    }

    const newReservation = {
      id: Date.now(),
      ...formData,
    };
    addReservation(newReservation);
    setFormData({ name: '', email: '', datetime: '', guests: '' });
    setShowPopup(true);

    // Send confirmation email
    emailjs
      .sendForm(
        'service_24cav6o',
        'template_3u6xrvu',
        formRef.current,
        {
          publicKey: 'V34xNzpWEIhLHwXVY',
        }
      )
      .then(
        () => {
          console.log('Email successfully sent!');
        },
        (error) => {
          console.error('There was an error sending the email:', error.text);
        }
      );
  };

  const closePopup = () => setShowPopup(false);

  return (
    <div
      className="reservation-background"
      style={{ backgroundImage: `url(${bookingImage})` }}
    >
      <div className="reservation-container">
        <h2>Book a Table</h2>
        <p><strong>Available Tables:</strong> {availableTables}</p>
        <form className="reservation-form" onSubmit={handleSubmit} ref={formRef}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="datetime-local"
            name="datetime"
            value={formData.datetime}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="guests"
            placeholder="Guests"
            value={formData.guests}
            onChange={handleChange}
            min="1"
            required
          />
          <button type="submit">Reserve</button>
        </form>

        {showPopup && (
          <div className="popup-overlay">
            <div className="popup-box">
              <h3>🎉 Reservation Confirmed!</h3>
              <p>You have successfully reserved your table.</p>
              <button onClick={closePopup}>Close</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Reservations;
