import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginSignup.css';
import backgroundImage from '../assets/MYlog.jpg';

const LoginSignup = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signupSuccess, setSignupSuccess] = useState(false);
  const navigate = useNavigate();

  const handleAuth = (e) => {
    e.preventDefault();

    if (isLogin) {
      // LOGIN
      console.log('Logging in with:', { email, password });

      if (email === 'easyreserve367@gmail.com' && password === 'Ohmygod@123') {
        localStorage.setItem('isAdmin', 'true');
        navigate('/admin-panel');
      } else if (email === 'admin@example.com') {
        alert('Incorrect password for admin.');
      } else {
        localStorage.setItem('isAdmin', 'false');
        navigate('/dashboard');
      }
    } else {
      // SIGNUP
      console.log('Signing up with:', { email, password });
      setSignupSuccess(true);
      setEmail('');
      setPassword('');
    }
  };

  return (
    <div
      className="auth-container"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px',
      }}
    >
      <div className="auth-box">
        <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
        <form onSubmit={handleAuth}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">{isLogin ? 'Login' : 'Sign Up'}</button>
        </form>

        {signupSuccess && !isLogin && (
          <p style={{ color: 'green', marginTop: '10px' }}>
            Sign-up successful! You can now log in.
          </p>
        )}

        <p>
          {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
          <button
            onClick={() => {
              setIsLogin(!isLogin);
              setSignupSuccess(false);
            }}
          >
            {isLogin ? 'Sign Up' : 'Login'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginSignup;
