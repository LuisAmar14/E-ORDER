import React from 'react';
import {
  Container,
  Typography,
  Paper,
  TextField,
  Button,
  Box,
} from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledContainer = styled(Container)(({ theme }) => ({
  padding: theme.spacing(4),
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  width: '100%',
  maxWidth: '600px',
  boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.2)',
  borderRadius: '12px',
  backgroundColor: '#ffffff',
}));

const Title = styled(Typography)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  fontSize: '2rem',
  fontWeight: 'bold',
  color: '#00796b',
  textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)',
  borderRadius: '40px',
  marginBottom: theme.spacing(2),
}));

const TotalAmount = styled(Typography)(({ theme }) => ({
  fontSize: '1.5rem',
  fontWeight: 'bold',
  color: '#00796b', // Color de la paleta del navbar
  marginBottom: theme.spacing(3),
  textAlign: 'center',
}));

const CancelButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main, // Use secondary color
  color: '#fff', // Set text color to white
  '&:hover': {
    backgroundColor: theme.palette.secondary.dark, // Use darker shade for hover
  },
}));

const CheckoutButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main, // Use primary color
  color: '#fff',
  '&:hover': {
    backgroundColor: theme.palette.primary.dark, // Use darker shade for hover
  },
}));

const Checkout: React.FC = () => {
  const totalAmount = 60; // Cambia esto según el total real

  const handleConfirmPayment = () => {
    alert('Payment confirmed!');
    // Aquí puedes agregar la lógica para procesar el pago
  };

  const handleCancelPurchase = () => {
    window.location.href = '/cart'; // Redirige a /cart
  };

  return (
    <StyledContainer>
      <Title>Checkout</Title>
      <StyledPaper>
        <TotalAmount>Total: ${totalAmount.toFixed(2)}</TotalAmount>
        <Box component="form" noValidate autoComplete="off">
          <TextField
            fullWidth
            label="Card Number"
            variant="outlined"
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Name on Card"
            variant="outlined"
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Expiration Date (MM/YY)"
            variant="outlined"
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="CVV"
            variant="outlined"
            margin="normal"
            required
          />
          <Box mt={3} display="flex" justifyContent="center" gap={2}>
            <CancelButton
              variant="contained"
              onClick={handleCancelPurchase}
            >
              Cancel Purchase
            </CancelButton>

            <CheckoutButton
              variant="contained"
              onClick={handleConfirmPayment}
            >
              Confirm Payment
            </CheckoutButton>
          </Box>
        </Box>
      </StyledPaper>
    </StyledContainer>
  );
};

export default Checkout;
