import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './Login.module.css';

const Login = ({ onLogin }) => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [walletAddress, setWalletAddress] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/users/login', formData);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userID', response.data.userID);
      onLogin();
      navigate('/play');
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setError('User not found. Please register first.');
      } else {
        setError(error.response?.data.message || 'Error logging in');
      }
    }
  };

  const handleRegisterRedirect = () => {
    navigate('/register');
  };

  const connectMetaMask = async () => {
    if (!window.ethereum) {
      setError('MetaMask not detected!');
      return;
    }

    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      setWalletAddress(accounts[0]);
    } catch (err) {
      console.error(err);
      setError('Failed to connect MetaMask.');
    }
  };






  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
      <h2>Welcome to WonderCards</h2>
        <input
          type="text"
          placeholder="Username"
          value={formData.username}
          onChange={(e) => setFormData({ ...formData, username: e.target.value })}
          className={styles.input}
        />
        <input
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          className={styles.input}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <button type="submit" className={`${styles.button} ${styles.loginButton}`}>
            Login
          </button>
          <button type="button" onClick={handleRegisterRedirect} className={`${styles.button} ${styles.registerButton}`}>
            Register
          </button>
        </div>


        <button
          type="button"
          onClick={connectMetaMask}
          className={`${styles.button} ${styles.metaMaskButton}`}
          style={{ width: '100%', backgroundColor: '#f6851b', color: '#fff' }}
        >
          Connect MetaMask
        </button>

        {walletAddress && (
  <div className={styles.walletBox}>
    <p>Connected wallet:</p>
    <code>{walletAddress}</code>
  </div>
)}




        {error && <p className={styles.error}>{error}</p>}
      </form>
    </div>
  );
};

export default Login;