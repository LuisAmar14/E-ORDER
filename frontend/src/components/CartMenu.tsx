import React, { useState } from 'react';
import {
  Container,
  Typography,
  Paper,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Box,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import DeleteIcon from '@mui/icons-material/Delete';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { Link } from 'react-router-dom'; // Importar Link



const StyledContainer = styled(Container)(({ theme }) => ({
  padding: theme.spacing(4),
  minHeight: '100vh',
  background: 'linear-gradient(to right, #e0f7fa, #80deea)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}));

const Logo = styled('img')(({ theme }) => ({
  width: '150px',
  marginBottom: theme.spacing(3),
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(3),
  boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.2)',
  width: '100%',
  maxWidth: '600px',
}));

const Title = styled(Typography)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  fontSize: '2rem',
  fontWeight: 'bold',
  color: '#00796b',
  textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)',
  marginBottom: theme.spacing(2),
}));

const QuantityButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: '#fff',
  minWidth: '30px',
  padding: theme.spacing(1),
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
  },
}));

const QuantityContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginLeft: theme.spacing(2),
}));

const QuantityLabel = styled(Typography)(({ theme }) => ({
  margin: '0 8px',
  padding: theme.spacing(1),
}));

const ActionContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
}));

const CartMenu: React.FC = () => {
  const [cartItems, setCartItems] = useState([
    { id: 1, name: 'Product 1', price: 10, quantity: 1 },
    { id: 2, name: 'Product 2', price: 20, quantity: 1 },
    { id: 3, name: 'Product 3', price: 30, quantity: 1 },
  ]);

  const handleQuantityChange = (id: number, delta: number) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, quantity: Math.max(item.quantity + delta, 1) } : item
      )
    );
  };

  const handleEmptyCart = () => {
    setCartItems([]);
  };

  return (
    <StyledContainer>
      <Title>
        <ShoppingCartIcon fontSize="large" style={{ marginRight: '8px' }} />
        Your Shopping Cart
      </Title>
      <StyledPaper>
        <List>
          {cartItems.map(item => (
            <ListItem key={item.id} style={{ padding: '16px 0' }}>
              <ListItemText
                primary={item.name}
                secondary={`$${item.price.toFixed(2)} x ${item.quantity}`}
                primaryTypographyProps={{ variant: 'h6' }}
                secondaryTypographyProps={{ variant: 'body2' }}
              />
              <ListItemSecondaryAction>
                <ActionContainer>
                  <QuantityContainer>
                    <IconButton edge="end" aria-label="decrease" onClick={() => handleQuantityChange(item.id, -1)}>
                      <QuantityButton>-</QuantityButton>
                    </IconButton>
                    <QuantityLabel variant="body1">{item.quantity}</QuantityLabel>
                    <IconButton edge="end" aria-label="increase" onClick={() => handleQuantityChange(item.id, 1)}>
                      <QuantityButton>+</QuantityButton>
                    </IconButton>
                  </QuantityContainer>
                  <IconButton edge="end" aria-label="delete" onClick={() => handleEmptyCart()}>
                    <DeleteIcon />
                  </IconButton>
                </ActionContainer>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </StyledPaper>
      <Box>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleEmptyCart}
          startIcon={<DeleteIcon />}
          style={{ marginRight: '16px' }}
        >
          Empty Cart
        </Button>
        <Link to="/checkout" style={{ textDecoration: 'none' }}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AttachMoneyIcon />}
          >
            Proceed to Checkout
          </Button>
        </Link>
      </Box>
    </StyledContainer>
  );
};

export default CartMenu;
