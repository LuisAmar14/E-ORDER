import React, { useState, useEffect } from 'react';
import axios from 'axios';
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
import { Link } from 'react-router-dom';
import { useAuth } from '../../AuthContext';


const apiUrl = "127.0.0.1:8999";



const StyledContainer = styled(Container)(({ theme }) => ({
  padding: theme.spacing(4),
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}));

const Title = styled(Typography)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  fontSize: '2rem',
  fontWeight: 'bold',
  color: '#00796b',
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

const ProductName = styled(Typography)(({ theme }) => ({
  maxWidth: '200px',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  marginRight: theme.spacing(2),
}));

const CartMenu: React.FC = () => {
  const { user } = useAuth(); // Usar el contexto para obtener el usuario
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [finalTotal, setFinalTotal] = useState<string>('0.00');
  const [loading, setLoading] = useState(false);

  // Función para cargar el carrito desde el backend
  const fetchCartData = async () => {
    try {
      if (user) {

        const response = await axios.get(`${apiUrl}/cart?username=${user.username}`);

        const items = response.data.cart_items;
        setCartItems(items);
      } else {
        console.error('No user logged in.');
      }
    } catch (error) {
      console.error('Error fetching cart data:', error);
    }
  };

  useEffect(() => {
    // Recalcular el total cada vez que cartItems cambie
    const total = cartItems.reduce((acc: number, item: any) => acc + item.price * item.qty, 0);
    setFinalTotal(total.toFixed(2));
  }, [cartItems]);

  const handleQuantityChange = async (sku: number, delta: number) => {
    setLoading(true);
    if (!user) {
      alert("Debes iniciar sesión para actualizar el carrito");
      setLoading(false);
      return;
    }

    const updatedItem = cartItems.find(item => item.sku === sku);
    if (updatedItem) {
      const newQty = Math.max(updatedItem.qty + delta, 1);
      const originalQty = updatedItem.qty;

      try {
        setCartItems(prevItems =>
          prevItems.map(item =>
            item.sku === sku ? { ...item, qty: newQty, total: newQty * item.price } : item
          )
        );

        await axios.put(`${apiUrl}/cart?username=${user.username}`, {

          sku,
          qty: newQty,
        });
      } catch (error) {
        setCartItems(prevItems =>
          prevItems.map(item =>
            item.sku === sku ? { ...item, qty: originalQty, total: originalQty * item.price } : item
          )
        );
        alert("Error al actualizar el carrito");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleRemoveItem = async (sku: number) => {
    if (!user) {
        console.error('No user logged in.');
        return;
    }

    try {

        const response = await axios.delete(`${apiUrl}/cart/remove`, {

            params: { username: user.username, sku },
        });

        if (response.status === 200) {
            setCartItems((prevItems) => prevItems.filter(item => item.sku !== sku));

            const newTotal = cartItems
                .filter(item => item.sku !== sku)
                .reduce((acc, item) => acc + item.price * item.qty, 0);

            setFinalTotal(newTotal.toFixed(2));
            alert(`Producto ${sku} eliminado exitosamente.`);
        } else {
            alert('No se pudo eliminar el producto. Inténtalo nuevamente.');
        }
    } catch (error) {
        console.error('Error removing item:', error);
        alert('Ocurrió un error al intentar eliminar el producto.');
    }
};

  const handleEmptyCart = async () => {
    if (user) {
      try {
        for (const item of cartItems) {

          await axios.delete(`${apiUrl}/cart/remove?username=${user.username}&sku=${item.sku}`);

        }
        setCartItems([]);
        alert("El carrito ha sido vaciado exitosamente.");
      } catch (error) {
        console.error('Error vaciando el carrito:', error);
        alert("Hubo un error al vaciar el carrito.");
      }
    } else {
      console.error('No user logged in.');
    }
  };

  useEffect(() => {
    fetchCartData();
  }, [user]);

  return (
    <StyledContainer>
      <Title>
        <ShoppingCartIcon fontSize="large" style={{ marginRight: '8px' }} />
        Your Shopping Cart
      </Title>
      <Paper style={{ padding: '20px', width: '100%', maxWidth: '600px' }}>
        <List>
          {cartItems.map((item) => (
            <ListItem key={item.sku} style={{ padding: '20px 0' }}>
              <ListItemText
                primary={
                  <Box display="flex" alignItems="center">
                    {item.url && (
                      <img src={item.url} alt={item.name} style={{ width: '50px', height: '50px', marginRight: '16px' }} />
                    )}
                    <ProductName variant="h6">{item.name}</ProductName>
                  </Box>
                }
                secondary={`$${item.price.toFixed(2)} x ${item.qty}`}
              />
              <ListItemSecondaryAction>
                <ActionContainer>
                  <QuantityContainer>
                    <IconButton edge="end" aria-label="decrease" onClick={() => handleQuantityChange(item.sku, -1)}>
                      <QuantityButton>-</QuantityButton>
                    </IconButton>
                    <QuantityLabel variant="body1">{item.qty}</QuantityLabel>
                    <IconButton edge="end" aria-label="increase" onClick={() => handleQuantityChange(item.sku, 1)}>
                      <QuantityButton>+</QuantityButton>
                    </IconButton>
                  </QuantityContainer>
                  <IconButton edge="end" aria-label="delete" onClick={() => handleRemoveItem(item.sku)}>
                    <DeleteIcon />
                  </IconButton>
                </ActionContainer>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </Paper>

      <Box style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between', width: '100%', maxWidth: '600px' }}>
        <Typography variant="h6" color="textPrimary">
          Total:
        </Typography>
        <Typography variant="h6" color="textPrimary">
          ${finalTotal}
        </Typography>
      </Box>
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
        <Link to="/auth/checkout" style={{ textDecoration: 'none' }}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AttachMoneyIcon />}
            disabled={parseFloat(finalTotal) <= 0} // Deshabilitar si el total es <= 0
          >
            Proceed to Checkout
          </Button>
        </Link>
      </Box>
    </StyledContainer>
  );
};

export default CartMenu;
