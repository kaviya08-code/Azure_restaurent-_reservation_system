import React, { createContext, useState, useEffect } from 'react';

export const ReservationContext = createContext();

export const ReservationProvider = ({ children }) => {
  const [reservations, setReservations] = useState(() => {
    const storedReservations = localStorage.getItem('reservations');
    return storedReservations ? JSON.parse(storedReservations) : [];
  });

  useEffect(() => {
    localStorage.setItem('reservations', JSON.stringify(reservations));
  }, [reservations]);

  const addReservation = (reservation) => {
    setReservations((prev) => [...prev, reservation]);
  };

  const deleteReservation = (id) => {
    setReservations((prev) => prev.filter((res) => res.id !== id));
  };

  return (
    <ReservationContext.Provider value={{ reservations, addReservation, deleteReservation }}>
      {children}
    </ReservationContext.Provider>
  );
};
