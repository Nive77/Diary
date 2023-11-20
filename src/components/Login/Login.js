// LoginPage.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { Container, CssBaseline, TextField, Button, FormControlLabel, Checkbox, Grid, Typography, Paper, Box } from '@mui/material';
import { useUser } from '../../UserContext';
import Cookies from 'js-cookie';

import './Login.css'; // Import the custom CSS file

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();
  const { login } = useUser();

  useEffect(() => {
    // Check if the user is already logged in
    if (Cookies.get('isLoggedIn')) {
      navigate('/');
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();

    // Basic form validation
    if (!email || !password) {
      alert('Please fill in both email and password fields.');
      return;
    }

    // Add authentication logic here (e.g., check credentials)
    try {
      const response = await axios.post('https://diary-be-5suy.onrender.com/users/login', { email, password, isAdmin });

      // Check the response status or data for success or errors
      if (response.status === 200) {
        // Registration successful, handle accordingly (e.g., redirect)
        console.log('Login successful!');

        if (isAdmin) {
          console.log('Admin is logged IN');
          navigate('/books');
        } else {
          navigate('/');
        }
        login(true, isAdmin, email);
      } else {
        // Registration failed, handle accordingly (e.g., display error messages)
        console.error('Login failed:', response.data);
        alert('Your login credentials are incorrect.');
      }
    } catch (error) {
      // Handle network errors or other exceptions
      console.error('An error occurred:', error);
    }
  };

  return (
    <div className="login-page">
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Paper elevation={3} className="login-form">
          <Typography component="h1" variant="h5" className="login-heading">
            Login Page
          </Typography>
          <form onSubmit={handleLogin}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-input"
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-input"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" checked={isAdmin} onChange={() => setIsAdmin(!isAdmin)} />}
              label="Login as Admin"
              className="checkbox-label"
            />
            <Button type="submit" fullWidth variant="contained"  className="login-button">
              Login
            </Button>
            <Grid container>
              <Grid item>
                <Link to="/register" variant="body2" className="register-link">
                  Don't have an account? Register
                </Link>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>
    </div>
  );
}

export default LoginPage;
