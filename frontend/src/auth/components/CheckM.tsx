import React, { useEffect, useState } from 'react';
import { Container, Typography, Paper, TextField, Button, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../AuthContext';
import axios from 'axios';
import Confetti from 'react-confetti'; // Import the Confetti component
const apiUrl = "localhost:8999";
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
  fontSize: '2rem',
  fontWeight: 'bold',
  color: '#00796b',
  marginBottom: theme.spacing(2),
}));

const TotalAmount = styled(Typography)(({ theme }) => ({
  fontSize: '1.5rem',
  fontWeight: 'bold',
  color: '#00796b',
  marginBottom: theme.spacing(3),
  textAlign: 'center',
}));

const CheckoutButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: '#fff',
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
  },
}));

const Checkout: React.FC = () => {
  const { user } = useAuth(); 
  const [totalAmount, setTotalAmount] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [cartItems, setCartItems] = useState<any[]>([]);

  const [formFields, setFormFields] = useState({
    cardNumber: '',
    cardName: '',
    expirationDate: '',
    cvv: '',
  });

  const [errors, setErrors] = useState({
    cardNumber: '',
    cardName: '',
    expirationDate: '',
    cvv: '',
  });

  const [showConfetti, setShowConfetti] = useState(false); // State for confetti effect

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCartTotal = async () => {
      if (user) {
        try {
          const response = await fetch(`${apiUrl}/cart?username=${user.username}`);
          if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
          }
          const data = await response.json();
          setTotalAmount(parseFloat(data.final_total));
          setCartItems(data.cart_items || []); 
        } catch (error) {
          console.error('Error fetching cart total:', error);
        } finally {
          setLoading(false);
        }
      } else {
        console.warn('User not defined. Skipping cart fetch.');
        setLoading(false);
      }
    };

    fetchCartTotal();
  }, [user]);

  const validateField = (field: string, value: string) => {
    let error = '';
    switch (field) {
      case 'cardNumber':
        if (!/^\d{16}$/.test(value)) error = 'Card number must be 16 digits';
        break;
      case 'cardName':
        if (value.trim() === '') error = 'Card name is required';
        break;
      case 'expirationDate':
        if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(value)) error = 'Format must be MM/YY';
        break;
      case 'cvv':
        if (!/^\d{3,4}$/.test(value)) error = 'CVV must be 3 or 4 digits';
        break;
      default:
        break;
    }
    return error;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormFields((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
  };

  const handleEmptyCart = async () => {
    if (user && cartItems.length > 0) {
      try {
        for (const item of cartItems) {
          await axios.delete(`${apiUrl}:8080/cart/remove?username=${user.username}&sku=${item.sku}`);
        }
        setCartItems([]); 
        alert("Gracias por su compra!.");
      } catch (error) {
        console.error('Error vaciando el carrito:', error);
        alert("Hubo un error al vaciar el carrito.");
      }
    } else {
      console.warn('No user logged in or cart is empty.');
    }
  };

  const handleConfirmPayment = async () => {
    const newErrors = Object.keys(formFields).reduce((acc, field) => {
      const error = validateField(field, formFields[field as keyof typeof formFields]);
      if (error) acc[field as keyof typeof formFields] = error;
      return acc;
    }, {} as typeof errors);

    setErrors(newErrors);

    const isFormValid = Object.values(newErrors).every((error) => error === '');
    if (isFormValid) {
      setShowConfetti(true); // Show confetti when payment is confirmed
      await handleEmptyCart(); // Empty the cart after payment
      setTimeout(() => navigate('/auth/home'), 3000); // Redirect after confetti animation
    } else {
      alert('Please correct the errors before proceeding.');
    }
  };

  return (
    <StyledContainer>
      <Title>Checkout</Title>
      <StyledPaper>
        {showConfetti && <Confetti />}
        {loading ? (
          <Typography>Loading...</Typography>
        ) : (
          <TotalAmount>Total: ${totalAmount?.toFixed(2) || '0.00'}</TotalAmount>
        )}
        <Box component="form" noValidate autoComplete="off">
          <TextField
            fullWidth
            label="Card Number"
            name="cardNumber"
            value={formFields.cardNumber}
            onChange={handleInputChange}
            error={!!errors.cardNumber}
            helperText={errors.cardNumber}
            variant="outlined"
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Name on Card"
            name="cardName"
            value={formFields.cardName}
            onChange={handleInputChange}
            error={!!errors.cardName}
            helperText={errors.cardName}
            variant="outlined"
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Expiration Date (MM/YY)"
            name="expirationDate"
            value={formFields.expirationDate}
            onChange={handleInputChange}
            error={!!errors.expirationDate}
            helperText={errors.expirationDate}
            variant="outlined"
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="CVV"
            name="cvv"
            value={formFields.cvv}
            onChange={handleInputChange}
            error={!!errors.cvv}
            helperText={errors.cvv}
            variant="outlined"
            margin="normal"
            required
          />
          <Box mt={3} display="flex" justifyContent="center" gap={2}>
            <Button
              variant="contained"
              component={Link}
              to="/auth/cart"
              sx={{
                backgroundColor: 'secondary.main',
                color: '#fff',
                '&:hover': { backgroundColor: 'secondary.dark' },
              }}
            >
              Return to Cart
            </Button>
            <CheckoutButton
              variant="contained"
              onClick={handleConfirmPayment}
              disabled={loading || totalAmount === null || totalAmount <= 0}
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
