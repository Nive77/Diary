
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { Grid, Container, CssBaseline, TextField, Button, FormControlLabel, Checkbox, Typography, Paper, Box } from '@mui/material';

import './Register.css';

function RegistrationPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [name, setName] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    // Check if the password meets the requirements
    const isMinLength = newPassword.length >= 6; // Adjust the minimum length as needed
    setIsPasswordValid(isMinLength);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleAdminCheckboxChange = (e) => {
    setIsAdmin(e.target.checked);
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (isPasswordValid === false) {
      alert('Password does not meet the requirements.');
      return;
    }

    if (password.length === 0 || email.length === 0 || name.length === 0) {
      alert('Please enter all the fields.');
      return;
    }

    try {
      const response = await axios.post('https://diary-be-5suy.onrender.com/users/register', {
        name,
        email,
        password,
        isAdmin,
      });

      if (response.status === 200) {
        console.log('Registration successful!');
        navigate('/login');
      } else if (response.status === 201) {
        alert('Registration failed. Email already in use.');
      } else {
        console.error('Registration failed:', response.data);
        alert('Your registration request failed. Please try again.');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  return (
    <div className="registration-page">
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Paper
          elevation={3}
          className="registration-form"
        >
          <Typography component="h1" variant="h5" className="registration-heading">
            Registration
          </Typography>
          <Box component="form" onSubmit={handleRegister} sx={{ mt: 2 }}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              autoComplete="name"
              autoFocus
              value={name}
              onChange={handleNameChange}
              className="form-input"
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={email}
              onChange={handleEmailChange}
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
              autoComplete="new-password"
              value={password}
              onChange={handlePasswordChange}
              className="form-input"
            />
            {!isPasswordValid && (
              <Typography variant="caption" color="error" className="password-error">
                Password must be at least 6 characters long.
              </Typography>
            )}
            <FormControlLabel
              control={
                <Checkbox
                  value="isAdmin"
                  color="primary"
                  checked={isAdmin}
                  onChange={handleAdminCheckboxChange}
                />
              }
              label="Register as Admin"
            />
            <Button type="submit" fullWidth variant="contained" color="primary" className="register-button">
              Register
            </Button>
            <Grid container>
              <Grid item>
                <Link to="/login" variant="body2" className="login-link">
                  Already have an account? Login
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Container>
    </div>
  );
}

export default RegistrationPage;
