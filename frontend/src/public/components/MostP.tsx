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
  Star,
} from '@mui/icons-material';

// Define product type
interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
}

// Sample product data
const sampleProducts: Product[] = [
  {
    id: 1,
    name: "Smartphone X",
    price: 599.99,
    image: "https://ss632.liverpool.com.mx/sm/1098215901.jpg",
    description: "Samsung A71 de 128 GB Super Amoled 6.59 Pulgadas"
  },
  {
    id: 2,
    name: "Laptop Pro",
    price: 1299.99,
    image: "https://ss628.liverpool.com.mx/sm/1147747787.jpg",
    description: "Laptop Lenovo 82V60065US 14 pulgadas Full HD Intel Celeron Intel UHD 600 4 GB RAM 128 GB SSD"
  },
  {
    id: 3,
    name: "Wireless Earbuds",
    price: 149.99,
    image: "https://ss632.liverpool.com.mx/sm/1142203282.jpg",
    description: "Audífonos True Wireless Huawei FreeBuds SE 2"
  },
  {
    id: 4,
    name: "Smart Watch",
    price: 249.99,
    image: "https://ss628.liverpool.com.mx/sm/1140184434.jpg",
    description: "Smartwatch Swiss"
  },
  {
    id: 5,
    name: "4K TV",
    price: 799.99,
    image: "https://ss629.liverpool.com.mx/sm/1159240505.jpg",
    description: "Pantalla Smart TV LG LED"
  },
  {
    id: 6,
    name: "Gaming Console",
    price: 499.99,
    image: "https://ss423.liverpool.com.mx/sm/1162473162.jpg",
    description: "Consola Genérica de 64 GB edición collectors retro"
  },
];

const MostP: React.FC = () => {
  const [cart, setCart] = useState<{ [key: number]: number }>({});
  const [favorites, setFavorites] = useState<{ [key: number]: boolean }>({});
  const [mostVoted, setMostVoted] = useState<{ [key: number]: boolean }>({});
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

  const handleToggleMostVoted = (productId: number) => {
    setMostVoted(prevMostVoted => ({
      ...prevMostVoted,
      [productId]: !prevMostVoted[productId]
    }));
    setSnackbarMessage(mostVoted[productId] ? 'Removed from most voted' : 'Marked as most voted');
    setSnackbarOpen(true);
  };

  const handleCloseSnackbar = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  return (
    <Box sx={{ flexGrow: 1, p: 0, padding: '20px' }}>
      <Grid container spacing={3}>
        {sampleProducts.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%', position: 'relative', boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)' }}>
              <IconButton
                sx={{
                  position: 'absolute',
                  top: 8,
                  left: 8,
                   backgroundColor: 'rgba(255, 255, 255, 0.7)',
                  '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.8)' },
                }}
                onClick={() => handleToggleMostVoted(product.id)} // Toggle most voted
              >
                {mostVoted[product.id] ? <Star sx={{ color: '#FFC700' }} /> : <Star />}
              </IconButton>
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
                sx={{
                  height: '200px', // Fixed height for uniformity
                  objectFit: 'contain', // Adjusts image to fit while maintaining aspect ratio
                  borderRadius: '8px 8px 0 0',
                }}
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
                  startIcon={<ShoppingCart />}
                  onClick={() => handleAddToCart(product.id)}
                  sx={{ ml: 'auto', mr: 1, '&:hover': { backgroundColor: theme => theme.palette.primary.main } }}
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

export default MostP;
