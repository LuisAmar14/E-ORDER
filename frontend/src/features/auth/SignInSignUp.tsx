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
  marginTop: theme.spacing(8), // Margen superior
  display: 'flex',
  flexDirection: 'column', // Dirección de flex en columna
  alignItems: 'center', // Centramos los elementos
  padding: theme.spacing(4), // Padding interno
}));

// Estilo para el formulario
const StyledForm = styled('form')(({ theme }) => ({
  width: '100%', // Ocupa todo el ancho
  marginTop: theme.spacing(3), // Margen superior
}));

// Botón de envío estilizado
const SubmitButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(3, 0, 2), // Margen superior e inferior
}));

// Props para el panel de las pestañas
interface TabPanelProps {
  children?: React.ReactNode; // Contenido del panel
  index: number; // Índice del panel
  value: number; // Valor actual de las pestañas
}

// Componente TabPanel para manejar las pestañas
function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel" // Papel para accesibilidad
      hidden={value !== index} // Oculta el panel si no es el actual
      id={`auth-tabpanel-${index}`} // ID para accesibilidad
      aria-labelledby={`auth-tab-${index}`} // Label para accesibilidad
      {...other}
    >
      {value === index && ( // Muestra el contenido si es el panel activo
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
    id: `auth-tab-${index}`, // ID para la pestaña
    'aria-controls': `auth-tabpanel-${index}`, // Controla el panel correspondiente
  };
}

// Componente principal de autenticación
const AuthPage: React.FC = () => {
  const [value, setValue] = useState(0); // Estado para el valor de la pestaña activa
  const [signInData, setSignInData] = useState({ // Estado para los datos de inicio de sesión
    username: '',
    password: '',
  });
  const [signUpData, setSignUpData] = useState({ // Estado para los datos de registro
    first_name: '',
    last_name: '',
    user_name: '',
    country: '',
    email: '',
    password: '',
    address: '',
  });

  // Maneja el cambio de pestañas
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue); // Actualiza el valor de la pestaña activa
  };

  // Maneja los cambios en el formulario de inicio de sesión
  const handleSignInChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target; // Obtiene el nombre y valor del campo
    setSignInData(prevData => ({
      ...prevData,
      [name]: value, // Actualiza el estado con el nuevo valor
    }));
  };

  // Maneja los cambios en el formulario de registro
  const handleSignUpChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setSignUpData(prevData => ({
      ...prevData,
      [name]: value, // Actualiza el estado con el nuevo valor
    }));
  };

  // Maneja el envío del formulario de inicio de sesión
  const handleSignIn = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Previene el comportamiento por defecto
    console.log('Sign In:', signInData); // Muestra los datos en la consola
    // Implementa la lógica de inicio de sesión aquí
  };

  // Maneja el envío del formulario de registro
  const handleSignUp = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Previene el comportamiento por defecto
    console.log('Sign Up:', signUpData); // Muestra los datos en la consola
    // Implementa la lógica de registro aquí
  };

  return (
    <Container component="main" maxWidth="sm"> {/* Contenedor principal */}
      <StyledPaper elevation={6}> {/* Papel con estilo */}
      <Link to="/"> 
      <img 
        src={logo} 
        alt="E-Order" 
        style={{ 
          width: '100%', // Asegura que la imagen use el 100% del contenedor
          maxWidth: '250px', // Limita el tamaño máximo de la imagen
          height: 'auto', 
        }} 
        />
        </Link>
        <Tabs value={value} onChange={handleChange} aria-label="auth tabs"> {/* Pestañas de inicio de sesión y registro */}
          <Tab label="Sign In" {...a11yProps(0)} /> {/* Pestaña de inicio de sesión */}
          <Tab label="Sign Up" {...a11yProps(1)} /> {/* Pestaña de registro */}
        </Tabs>
        <TabPanel value={value} index={0}> {/* Panel de inicio de sesión */}
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
        <TabPanel value={value} index={1}> {/* Panel de registro */}
          <StyledForm onSubmit={handleSignUp}>
            <Grid container spacing={2}> {/* Cuadrícula para los campos del formulario */}
              <Grid item xs={12} sm={6}> {/* Primer campo: Nombre */}
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
              <Grid item xs={12} sm={6}> {/* Segundo campo: Apellido */}
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
              <Grid item xs={12}> {/* Campo: Nombre de usuario */}
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
              <Grid item xs={12}> {/* Campo: País */}
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
              <Grid item xs={12}> {/* Campo: Email */}
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={signUpData.email}
                  onChange={handleSignUpChange}
                />
              </Grid>
              <Grid item xs={12}> {/* Campo: Contraseña */}
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
              <Grid item xs={12}> {/* Campo: Dirección */}
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="address"
                  label="Address"
                  id="address"
                  autoComplete="street-address"
                  value={signUpData.address}
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
