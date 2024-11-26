import React, { useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  Box,
  Avatar,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';
import PersonIcon from '@mui/icons-material/Person';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../AuthContext';
const apiUrl = "https://backend-production-b784.up.railway.app";
const StyledContainer = styled(Container)(({ theme }) => ({
  minHeight: '100vh',
  padding: theme.spacing(4),
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.2)',
  borderRadius: '12px',
  width: '100%',
  maxWidth: '500px',
}));

const SubmitButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(3),
  backgroundColor: theme.palette.primary.main,
  color: '#fff',
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
  },
}));

const CancelButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(1),
  backgroundColor: theme.palette.error.main,
  color: '#fff',
  '&:hover': {
    backgroundColor: theme.palette.error.dark,
  },
}));

const EditProfile: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const [userData, setUserData] = useState({
    email: user?.email || '',
    password: '',
    confirmPassword: '',
    address: user?.address || '',
    country: user?.country || '',
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (userData.password && userData.password !== userData.confirmPassword) {
      alert('Las contraseñas no coinciden.');
      return;
    }

    const updatedData: Record<string, string> = {};
    if (userData.email && userData.email !== user?.email) {
      updatedData.email = userData.email;
    }
    if (userData.password) {
      updatedData.password = userData.password;
    }
    if (userData.address && userData.address !== user?.address) {
      updatedData.address = userData.address;
    }
    if (userData.country && userData.country !== user?.country) {
      updatedData.country = userData.country;
    }

    if (Object.keys(updatedData).length === 0) {
      alert('No hay cambios para guardar.');
      return;
    }

    try {
      const usernameurl = `${apiUrl}/User/${user?.username}`;
      alert(usernameurl);
      const url = `${apiUrl}:8080/User/${user?.username}`;
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        alert('Hubo un error al actualizar.');
        throw new Error(errorData.error || 'Error al actualizar el usuario');
      }

      const updatedUser = await response.json();
      alert('Perfil actualizado con éxito');
      console.log('Usuario actualizado:', updatedUser);
    } catch (error: any) {
      alert(`Error: ${error.message}`);
      console.error('Error al actualizar perfil:', error);
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <StyledContainer>
      <StyledPaper elevation={6}>
        <Avatar sx={{ bgcolor: theme.palette.primary.main, width: 40, height: 40, mb: 2 }}>
          <PersonIcon />
        </Avatar>

        <Typography variant="h5" gutterBottom>
          Editar Perfil
        </Typography>

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2, width: '100%' }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Correo electrónico"
                name="email"
                value={userData.email}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Nueva contraseña"
                type="password"
                name="password"
                value={userData.password}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Confirmar contraseña"
                type="password"
                name="confirmPassword"
                value={userData.confirmPassword}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Dirección"
                name="address"
                value={userData.address}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="País"
                name="country"
                value={userData.country}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
          </Grid>

          <SubmitButton type="submit" fullWidth>
            Guardar Cambios
          </SubmitButton>

          <CancelButton onClick={handleCancel} fullWidth>
            Cancelar
          </CancelButton>
        </Box>
      </StyledPaper>
    </StyledContainer>
  );
};

export default EditProfile;
