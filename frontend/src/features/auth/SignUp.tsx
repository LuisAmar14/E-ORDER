import React, { useState } from 'react';
import { TextField, Button, Grid, styled } from '@mui/material';

const StyledForm = styled('form')(({ theme }) => ({
  width: '100%',
  marginTop: theme.spacing(3),
}));

const SubmitButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(3, 0, 2),
}));

interface SignUpProps {
  onSubmit: (data: Record<string, string>) => void;
}

const SignUp: React.FC<SignUpProps> = ({ onSubmit }) => {
  const [signUpData, setSignUpData] = useState({
    first_name: '',
    last_name: '',
    user_name: '',
    country: '',
    email: '',
    password: '',
    confirmPassword: '',
    address1: '',
    address2: '',
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setSignUpData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (signUpData.password !== signUpData.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }
    onSubmit(signUpData);
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            name="first_name"
            variant="outlined"
            required
            fullWidth
            id="first_name"
            label="First Name"
            autoFocus
            value={signUpData.first_name}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            variant="outlined"
            required
            fullWidth
            id="last_name"
            label="Last Name"
            name="last_name"
            value={signUpData.last_name}
            onChange={handleChange}
          />
        </Grid>
        {/* Repite este patrón para los demás campos */}
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            value={signUpData.password}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            required
            fullWidth
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            id="confirmPassword"
            value={signUpData.confirmPassword}
            onChange={handleChange}
          />
        </Grid>
      </Grid>
      <SubmitButton
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
      >
        Sign Up
      </SubmitButton>
    </StyledForm>
  );
};

export default SignUp;
