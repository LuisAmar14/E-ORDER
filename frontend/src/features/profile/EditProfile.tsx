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
import { useTheme } from '@mui/material/styles';
import PersonIcon from '@mui/icons-material/Person';

// Estilos personalizados
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
    backgroundColor: theme.palette.primary,
  },
}));

const CancelButton = styled(Button)(({ theme }) => ({
  borderColor: theme.palette.primary.main,
  color: '#00796b',
  borderRadius: '20px',
  backgroundColor: theme.palette.primary.main,
  '&:hover': {
    backgroundColor: theme.palette.primary,
  },
}));

const EditProfile: React.FC = () => {
  const theme = useTheme();
  const [userData, setUserData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    address1: '',
    address2: '',
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
        
        <Avatar sx={{ bgcolor: theme.palette.primary.main, width: 40, height: 40, marginBottom: '8px' }}>
          <PersonIcon sx={{ color: '#fff' }} />
        </Avatar>

        <Typography component="h1" variant="h5" sx={{ mb: 3, fontWeight: 'bold', color: theme.palette.primary.main }}>
          Edit Profile
        </Typography>
        
        <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
          <Grid container spacing={2}>

            {/* Username Section */}
            <Grid item xs={12}>
              <CancelButton 
                variant="outlined" 
                onClick={() => handleEditToggle('username')}
                fullWidth
              >
                {editFields.username ? 'Cancel' : 'Change Username'}
              </CancelButton>
              {editFields.username && (
                <Grid container justifyContent="center" sx={{ marginTop: '8px' }}>
                  <Grid item xs={12} sm={8} md={6}>
                    <TextField
                      variant="outlined"
                      size="small"
                      fullWidth
                      label="Username"
                      name="username"
                      value={userData.username}
                      onChange={handleChange}
                      margin="normal"
                    />
                  </Grid>
                </Grid>
              )}
            </Grid>

            {/* Password Section */}
            <Grid item xs={12}>
              <CancelButton 
                variant="outlined" 
                onClick={() => handleEditToggle('password')}
                fullWidth
              >
                {editFields.password ? 'Cancel' : 'Change Password'}
              </CancelButton>
              {editFields.password && (
                <>
                  <Grid container justifyContent="center" sx={{ marginTop: '8px' }}>
                    <Grid item xs={12} sm={8} md={6}>
                      <TextField
                        variant="outlined"
                        size="small"
                        type="password"
                        fullWidth
                        label="New Password"
                        name="password"
                        value={userData.password}
                        onChange={handleChange}
                        margin="normal"
                      />
                    </Grid>
                  </Grid>
                  <Grid container justifyContent="center" sx={{ marginTop: '4px' }}>
                    <Grid item xs={12} sm={8} md={6}>
                      <TextField
                        variant="outlined"
                        size="small"
                        type="password"
                        fullWidth
                        label="Confirm Password"
                        name="confirmPassword"
                        value={userData.confirmPassword}
                        onChange={handleChange}
                        margin="normal"
                      />
                    </Grid>
                  </Grid>
                </>
              )}
            </Grid>

            {/* Address Section */}
            <Grid item xs={12}>
              <CancelButton 
                variant="outlined" 
                onClick={() => handleEditToggle('address')}
                fullWidth
              >
                {editFields.address ? 'Cancel' : 'Change Address'}
              </CancelButton>
              {editFields.address && (
                <>
                  <Grid container justifyContent="center" sx={{ marginTop: '8px' }}>
                    <Grid item xs={12} sm={8} md={6}>
                      <TextField
                        variant="outlined"
                        size="small"
                        fullWidth
                        label="Address 1"
                        name="address1"
                        value={userData.address1}
                        onChange={handleChange}
                        margin="normal"
                      />
                    </Grid>
                  </Grid>
                  <Grid container justifyContent="center" sx={{ marginTop: '4px' }}>
                    <Grid item xs={12} sm={8} md={6}>
                      <TextField
                        variant="outlined"
                        size="small"
                        fullWidth
                        label="Address 2"
                        name="address2"
                        value={userData.address2}
                        onChange={handleChange}
                        margin="normal"
                      />
                    </Grid>
                  </Grid>
                </>
              )}
            </Grid>

            {/* Country Section */}
            <Grid item xs={12}>
              <CancelButton 
                variant="outlined" 
                onClick={() => handleEditToggle('country')}
                fullWidth
              >
                {editFields.country ? 'Cancel' : 'Change Country'}
              </CancelButton>
              {editFields.country && (
                <Grid container justifyContent="center" sx={{ marginTop: '8px' }}>
                  <Grid item xs={12} sm={8} md={6}>
                    <TextField
                      variant="outlined"
                      size="small"
                      fullWidth
                      label="Country"
                      name="country"
                      value={userData.country}
                      onChange={handleChange}
                      margin="normal"
                    />
                  </Grid>
                </Grid>
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
