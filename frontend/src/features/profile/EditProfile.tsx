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
import logo from '../../img_rsc/logoSVG.svg';
import { Link } from 'react-router-dom';

// Estilos personalizados
const StyledContainer = styled(Container)(({ theme }) => ({
  background: '#f0f2f5',
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
  backgroundColor: '#ffffff',
}));

const SubmitButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(3),
  backgroundColor: '#1877f2',
  color: '#ffffff',
  '&:hover': {
    backgroundColor: '#155dbb',
  },
}));

const EditProfile: React.FC = () => {
  const [userData, setUserData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    address: '',
    country: '',
  });

  const [editFields, setEditFields] = useState({
    username: false,
    password: false,
    address: false,
    country: false,
  });

  type EditableFields = 'username' | 'password' | 'address' | 'country';

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleEditToggle = (field: EditableFields) => {
    setEditFields(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (userData.password && userData.password !== userData.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }
    console.log('User Data:', userData);
  };

  return (
    <StyledContainer>
      <StyledPaper elevation={6}>
      <Link to="/"> 
        <img 
          src={logo} 
          alt="E-Order" 
          style={{ 
            width: '100%', 
            maxWidth: '250px', 
            height: 'auto', 
            marginBottom: '16px',
          }} 
        />
    </Link>
        <Typography component="h1" variant="h5" sx={{ mb: 3, fontWeight: 'bold', color: '#1877f2' }}>
          Edit Profile
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Button 
                variant="outlined" 
                onClick={() => handleEditToggle('username')}
                fullWidth
                sx={{ borderColor: '#1877f2', color: '#1877f2' }}
              >
                {editFields.username ? 'Cancel' : 'Change Username'}
              </Button>
              {editFields.username && (
                <TextField
                  variant="outlined"
                  fullWidth
                  label="Username"
                  name="username"
                  value={userData.username}
                  onChange={handleChange}
                  margin="normal"
                />
              )}
            </Grid>

            <Grid item xs={12}>
              <Button 
                variant="outlined" 
                onClick={() => handleEditToggle('password')}
                fullWidth
                sx={{ borderColor: '#1877f2', color: '#1877f2' }}
              >
                {editFields.password ? 'Cancel' : 'Change Password'}
              </Button>
              {editFields.password && (
                <>
                  <TextField
                    variant="outlined"
                    type="password"
                    fullWidth
                    label="New Password"
                    name="password"
                    value={userData.password}
                    onChange={handleChange}
                    margin="normal"
                  />
                  <TextField
                    variant="outlined"
                    type="password"
                    fullWidth
                    label="Confirm Password"
                    name="confirmPassword"
                    value={userData.confirmPassword}
                    onChange={handleChange}
                    margin="normal"
                  />
                </>
              )}
            </Grid>

            <Grid item xs={12}>
              <Button 
                variant="outlined" 
                onClick={() => handleEditToggle('address')}
                fullWidth
                sx={{ borderColor: '#1877f2', color: '#1877f2' }}
              >
                {editFields.address ? 'Cancel' : 'Change Address'}
              </Button>
              {editFields.address && (
                <TextField
                  variant="outlined"
                  fullWidth
                  label="Address"
                  name="address"
                  value={userData.address}
                  onChange={handleChange}
                  margin="normal"
                />
              )}
            </Grid>

            <Grid item xs={12}>
              <Button 
                variant="outlined" 
                onClick={() => handleEditToggle('country')}
                fullWidth
                sx={{ borderColor: '#1877f2', color: '#1877f2' }}
              >
                {editFields.country ? 'Cancel' : 'Change Country'}
              </Button>
              {editFields.country && (
                <TextField
                  variant="outlined"
                  fullWidth
                  label="Country"
                  name="country"
                  value={userData.country}
                  onChange={handleChange}
                  margin="normal"
                />
              )}
            </Grid>
          </Grid>
          <SubmitButton
            type="submit"
            fullWidth
            variant="contained"
          >
            Save Changes
          </SubmitButton>
        </Box>
      </StyledPaper>
    </StyledContainer>
  );
};

export default EditProfile;
