import React, { useState } from 'react';
import { TextField, Button, styled } from '@mui/material';
const apiUrl = "http://192.168.0.25";
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

  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setSignInData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  

  // Función para verificar la existencia del usuario y la contraseña
  const getUserByUsername = async (username: string) => {
    try {
      const response = await fetch(`${apiUrl}:8080/UserByUsername?user_name=${username}`);
      if (!response.ok) {
        throw new Error('User not found');
      }
  
      const data = await response.json();
      return data.user; // Aquí tienes los datos del usuario
    } catch (error) {
      console.error(error);
      return null; // El usuario no fue encontrado o hubo un error
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  
    const { username, password } = signInData;
  
    const user = await getUserByUsername(username);
    if (!user) {
      alert("Usuario no encontrado");
      return;
    }
  
    if (user.password !== password) {
      alert("Contraseña incorrecta");
      return;
    }
  
    // Si la contraseña es correcta, proceder al siguiente paso
    alert("Usuario valido");
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
      {errorMessage && (
        <div style={{ color: 'red', marginTop: '10px' }}>{errorMessage}</div>
      )}
      <SubmitButton
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Signing In...' : 'Sign In'}
      </SubmitButton>
    </StyledForm>
  );
};

export default SignIn;
