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
  background: 'linear-gradient(to right, #f3f4f6, #e2e8f0)',
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
  fontSize: '2rem',
  fontWeight: 'bold',
  color: '#2b364a',
  marginBottom: theme.spacing(2),
  textAlign: 'center',
}));

const TotalAmount = styled(Typography)(({ theme }) => ({
  fontSize: '1.5rem',
  fontWeight: 'bold',
  color: '#49708a', // Color de la paleta del navbar
  marginBottom: theme.spacing(3),
  textAlign: 'center',
}));

const CheckoutButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#2b364a', // Color más oscuro de la paleta
  color: '#fff',
  '&:hover': {
    backgroundColor: '#1f2c3a', // Un tono más oscuro
  },
  marginRight: theme.spacing(2),
}));

const CancelButton = styled(Button)(({ theme }) => ({
  borderColor: '#d9534f',
  color: '#d9534f',
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
          <Box mt={3}>
            <CheckoutButton
              variant="contained"
              onClick={handleConfirmPayment}
            >
              Confirm Payment
            </CheckoutButton>
            <CancelButton
              variant="outlined"
              onClick={handleCancelPurchase}
            >
              Cancel Purchase
            </CancelButton>
          </Box>
        </Box>
      </StyledPaper>
    </StyledContainer>
  );
};

export default Checkout;
