import React, { useState } from 'react';
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  IconButton,
  Box,
  Snackbar,
} from '@mui/material';
import {
  Add,
  Remove,
  ShoppingCart,
  Favorite,
  FavoriteBorder,
} from '@mui/icons-material';

// Tipo para un producto
interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

// Datos de ejemplo para los productos
const sampleProducts: Product[] = [
  { id: 1, name: "Smartphone X", price: 599.99, image: "/placeholder.svg?height=200&width=200&text=Smartphone+X" },
  { id: 2, name: "Laptop Pro", price: 1299.99, image: "https://ss628.liverpool.com.mx/xl/1143370174.jpg" },
  { id: 3, name: "Wireless Earbuds", price: 149.99, image: "/placeholder.svg?height=200&width=200&text=Wireless+Earbuds" },
  { id: 4, name: "Smart Watch", price: 249.99, image: "/placeholder.svg?height=200&width=200&text=Smart+Watch" },
  { id: 5, name: "4K TV", price: 799.99, image: "/placeholder.svg?height=200&width=200&text=4K+TV" },
  { id: 6, name: "Gaming Console", price: 499.99, image: "/placeholder.svg?height=200&width=200&text=Gaming+Console" },
];

const MainMenu: React.FC = () => {
  const [cart, setCart] = useState<{ [key: number]: number }>({});
  const [favorites, setFavorites] = useState<{ [key: number]: boolean }>({});
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleAddToCart = (productId: number) => {
    setCart(prevCart => ({
      ...prevCart,
      [productId]: (prevCart[productId] || 0) + 1
    }));
    setSnackbarMessage('Product added to cart');
    setSnackbarOpen(true);
  };

  const handleQuantityChange = (productId: number, change: number) => {
    setCart(prevCart => {
      const newQuantity = (prevCart[productId] || 0) + change;
      if (newQuantity <= 0) {
        const { [productId]: _, ...rest } = prevCart;
        return rest;
      }
      return { ...prevCart, [productId]: newQuantity };
    });
  };

  const handleToggleFavorite = (productId: number) => {
    setFavorites(prevFavorites => ({
      ...prevFavorites,
      [productId]: !prevFavorites[productId]
    }));
    setSnackbarMessage(favorites[productId] ? 'Removed from favorites' : 'Added to favorites');
    setSnackbarOpen(true);
  };

  const handleCloseSnackbar = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  return (
    <Box sx={{ flexGrow: 1, p: 0, m: "30px 10rem 20px 10rem" }}>
      <Grid container spacing={3}>
        {sampleProducts.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%', position: 'relative' }}>
              <IconButton
                sx={{
                  position: 'absolute',
                  top: 8,
                  right: 8,
                  backgroundColor: 'rgba(255, 255, 255, 0.7)',
                  '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.8)' },
                }}
                onClick={() => handleToggleFavorite(product.id)}
              >
                {favorites[product.id] ? <Favorite color="error" /> : <FavoriteBorder />}
              </IconButton>
              <CardMedia
                component="img"
                height="200"
                image={product.image}
                alt={product.name}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="div">
                  {product.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  ${product.price.toFixed(2)}
                </Typography>
              </CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                <IconButton 
                  aria-label="reduce quantity" 
                  onClick={() => handleQuantityChange(product.id, -1)}
                  disabled={!cart[product.id]}
                >
                  <Remove />
                </IconButton>
                <Typography sx={{ mx: 1 }}>
                  {cart[product.id] || 0}
                </Typography>
                <IconButton 
                  aria-label="increase quantity" 
                  onClick={() => handleQuantityChange(product.id, 1)}
                >
                  <Add />
                </IconButton>
                <Button 
                  variant="contained" 
                  color="secondary"
                  startIcon={<ShoppingCart />}
                  onClick={() => handleAddToCart(product.id)}
                  sx={{ ml: 'auto', mr: 1 }}
                >
                  Add to Cart
                </Button>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
      />
    </Box>
  );
};

export default MainMenu;