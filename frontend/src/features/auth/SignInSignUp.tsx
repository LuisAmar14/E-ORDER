import React, { useState } from 'react';
import {
  Container,
  Paper,
  Tabs,
  Tab,
  Typography,
  TextField,
  Button,
  Box,
  Grid,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import logo from '../../img_rsc/logoSVG.svg';
import { Link } from 'react-router-dom';

// Estilo personalizado para el Paper
const StyledPaper = styled(Paper)(({ theme }) => ({
  marginTop: theme.spacing(8),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: theme.spacing(4),
}));

// Estilo para el formulario
const StyledForm = styled('form')(({ theme }) => ({
  width: '100%',
  marginTop: theme.spacing(3),
}));

// Botón de envío estilizado
const SubmitButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(3, 0, 2),
}));

// Props para el panel de las pestañas
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

// Componente TabPanel para manejar las pestañas
function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`auth-tabpanel-${index}`}
      aria-labelledby={`auth-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

// Función para las propiedades de accesibilidad de las pestañas
function a11yProps(index: number) {
  return {
    id: `auth-tab-${index}`,
    'aria-controls': `auth-tabpanel-${index}`,
  };
}

// Componente principal de autenticación
const AuthPage: React.FC = () => {
  const [value, setValue] = useState(0);
  const [signInData, setSignInData] = useState({
    username: '',
    password: '',
  });
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

  // Maneja el cambio de pestañas
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  // Maneja los cambios en el formulario de inicio de sesión
  const handleSignInChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setSignInData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Maneja los cambios en el formulario de registro
  const handleSignUpChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setSignUpData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Maneja el envío del formulario de inicio de sesión
  const handleSignIn = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('Sign In:', signInData);
    // Implementa la lógica de inicio de sesión aquí
  };

  // Maneja el envío del formulario de registro
  const handleSignUp = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (signUpData.password !== signUpData.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }
    console.log('Sign Up:', signUpData);
    // Implementa la lógica de registro aquí
  };

  return (
    <Container component="main" maxWidth="sm">
      <StyledPaper elevation={6}>
        <Link to="/">
          <img 
            src={logo} 
            alt="E-Order" 
            style={{ 
              width: '100%', 
              maxWidth: '250px', 
              height: 'auto', 
            }} 
          />
        </Link>
        <Tabs value={value} onChange={handleChange} aria-label="auth tabs">
          <Tab label="Sign In" {...a11yProps(0)} />
          <Tab label="Sign Up" {...a11yProps(1)} />
        </Tabs>
        <TabPanel value={value} index={0}>
          <StyledForm onSubmit={handleSignIn}>
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
              onChange={handleSignInChange}
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
              onChange={handleSignInChange}
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
        </TabPanel>
        <TabPanel value={value} index={1}>
          <StyledForm onSubmit={handleSignUp}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="first_name"
                  variant="outlined"
                  required
                  fullWidth
                  id="first_name"
                  label="First Name"
                  autoFocus
                  value={signUpData.first_name}
                  onChange={handleSignUpChange}
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
                  autoComplete="family-name"
                  value={signUpData.last_name}
                  onChange={handleSignUpChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="user_name"
                  label="Username"
                  name="user_name"
                  autoComplete="username"
                  value={signUpData.user_name}
                  onChange={handleSignUpChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="country"
                  label="Country"
                  name="country"
                  autoComplete="country"
                  value={signUpData.country}
                  onChange={handleSignUpChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                  autoComplete="email"
                  value={signUpData.email}
                  onChange={handleSignUpChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="address1"
                  label="Address 1"
                  name="address1"
                  autoComplete="address-line1"
                  value={signUpData.address1}
                  onChange={handleSignUpChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  fullWidth
                  id="address2"
                  label="Address 2"
                  name="address2"
                  autoComplete="address-line2"
                  value={signUpData.address2}
                  onChange={handleSignUpChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={signUpData.password}
                  onChange={handleSignUpChange}
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
                  autoComplete="new-password"
                  value={signUpData.confirmPassword}
                  onChange={handleSignUpChange}
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
        </TabPanel>
      </StyledPaper>
    </Container>
  );
};

export default AuthPage;
