import React from 'react'; 
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import LoginSignup from './components/LoginSignup';
import Menu from './components/Menu';
import Reservations from './components/Reservations';
import Dashboard from './components/Dashboard';
import AdminPanel from './components/AdminPanel';
import Home from './components/Home';
import CustomerReview from './components/CustomerReview'; // ✅ Correct import
import { MenuProvider } from './context/MenuContext';
import { ReservationProvider } from './context/ReservationContext';

const navStyle = {
  color: 'white',
  textDecoration: 'none',
  padding: '0 10px',
};

// Admin route guard
const AdminRoute = ({ children }) => {
  const isAdmin = localStorage.getItem('isAdmin') === 'true';
  return isAdmin ? children : <Navigate to="/dashboard" />;
};

function App() {
  return (
    <MenuProvider>
      <ReservationProvider>
        <Router>
          <div>
            <header
              style={{
                textAlign: 'center',
                padding: '20px',
                backgroundColor: 'purple',
                color: 'white', // Set text color to white
              }}
            >
              <h1>EasyReserve!!</h1>
              <nav>
                <Link to="/" style={navStyle}>Home</Link> |{' '}
                <Link to="/menu" style={navStyle}>Menu</Link> |{' '}
                <Link to="/login" style={navStyle}>Login</Link> |{' '}
                <Link to="/reservations" style={navStyle}>Reservations</Link> |{' '}
                <Link to="/dashboard" style={navStyle}>Dashboard</Link> |{' '}
                <Link to="/reviews" style={navStyle}>Reviews</Link> {/* ✅ Navigation link */}
              </nav>
            </header>

            <main style={{ padding: '20px' }}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/menu" element={<Menu />} />
                <Route path="/login" element={<LoginSignup />} />
                <Route path="/reservations" element={<Reservations />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/reviews" element={<CustomerReview />} /> {/* ✅ Route to render it */}
                <Route
                  path="/admin-panel"
                  element={
                    <AdminRoute>
                      <AdminPanel />
                    </AdminRoute>
                  }
                />
              </Routes>
            </main>
          </div>
        </Router>
      </ReservationProvider>
    </MenuProvider>
  );
}

export default App;
