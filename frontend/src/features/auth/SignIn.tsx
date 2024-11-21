import React, { useState } from 'react';
import { TextField, Button, styled } from '@mui/material';

const StyledForm = styled('form')(({ theme }) => ({
  width: '100%',
  marginTop: theme.spacing(3),
}));

const SubmitButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(3, 0, 2),
}));

interface SignInProps {
  onSubmit: (data: { username: string; password: string }) => void;
}

const SignIn: React.FC<SignInProps> = ({ onSubmit }) => {
  const [signInData, setSignInData] = useState({
    username: '',
    password: '',
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setSignInData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(signInData);
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="username"
        label="Username"
        name="username"
        autoComplete="username"
        autoFocus
        value={signInData.username}
        onChange={handleChange}
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
        value={signInData.password}
        onChange={handleChange}
      />
      <SubmitButton
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
      >
        Sign In
      </SubmitButton>
    </StyledForm>
  );
};

export default SignIn;
