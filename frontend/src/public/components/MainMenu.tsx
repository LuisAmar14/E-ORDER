import React, { useState, useEffect } from 'react';
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

interface Product {
  SKU: number;
  Name: string;
  Price: number;
  url: string;
  Description: string;
  inventory: number;
  Category: string;
}

interface MainMenuProps {
  Category?: string;
}
const apiUrl = "127.0.0.1:8999";
const MainMenu: React.FC<MainMenuProps> = ({ Category }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<{ [key: number]: number }>({});
  const [favorites, setFavorites] = useState<{ [key: number]: boolean }>({});
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        
        const response = await fetch(`${apiUrl}/products`);
        const data = await response.json();
        const filteredProducts = Category
          ? data.filter((product: Product) => product.Category === Category)
          : data;
        setProducts(filteredProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
        setSnackbarMessage('Failed to load products');
        setSnackbarOpen(true);
      }
    };
    fetchProducts();
  }, [Category]);

  const handleAddToCart = (sku: number) => {
    setCart(prevCart => ({
      ...prevCart,
      [sku]: (prevCart[sku] || 0) + 1,
    }));
    setSnackbarMessage('Product added to cart');
    setSnackbarOpen(true);
  };

  const handleQuantityChange = (sku: number, change: number) => {
    setCart(prevCart => {
      const newQuantity = (prevCart[sku] || 0) + change;
      if (newQuantity <= 0) {
        const { [sku]: _, ...rest } = prevCart;
        return rest;
      }
      return { ...prevCart, [sku]: newQuantity };
    });
  };

  const handleToggleFavorite = (sku: number) => {
    setFavorites(prevFavorites => ({
      ...prevFavorites,
      [sku]: !prevFavorites[sku],
    }));
    setSnackbarMessage(favorites[sku] ? 'Removed from favorites' : 'Added to favorites');
    setSnackbarOpen(true);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <Box sx={{ flexGrow: 1, p: 0, m: '30px 10rem 20px 10rem' }}>
      <Grid container spacing={3}>
        {products.map(product => (
          <Grid item xs={12} sm={6} md={4} key={product.SKU}>
            <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%', position: 'relative' }}>
              <IconButton
                sx={{
                  position: 'absolute',
                  top: 8,
                  right: 8,
                  backgroundColor: 'rgba(255, 255, 255, 0.7)',
                  zIndex: 2,
                  '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.8)' },
                }}
                onClick={() => handleToggleFavorite(product.SKU)}
              >
                {favorites[product.SKU] ? <Favorite color="error" /> : <FavoriteBorder />}
              </IconButton>
              <Box
                sx={{
                  height: 200,
                  overflow: 'hidden',
                  position: 'relative',
                  '&:hover .product-description': {
                    opacity: 1,
                    visibility: 'visible',
                  },
                }}
                onMouseEnter={() => setHoveredProduct(product.SKU)}
                onMouseLeave={() => setHoveredProduct(null)}
              >
                <CardMedia
                  component="img"
                  image={product.url}
                  alt={product.Name}
                  sx={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                  }}
                />
                {hoveredProduct === product.SKU && (
                  <Box
                    className="product-description"
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      backgroundColor: 'rgba(0, 0, 0, 0.6)',
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      opacity: 0,
                      visibility: 'hidden',
                      transition: 'opacity 0.3s, visibility 0.3s',
                      padding: 2,
                      textAlign: 'center',
                    }}
                  >
                    <Typography variant="body2">{product.Description}</Typography>
                  </Box>
                )}
              </Box>
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="div">
                  {product.Name}
                </Typography>
              </CardContent>
              <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', p: 2 }}>
                <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 'bold', alignSelf: 'flex-end' }}>
                  ${product.Price.toFixed(2)}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                  <IconButton
                    aria-label="reduce quantity"
                    onClick={() => handleQuantityChange(product.SKU, -1)}
                    disabled={!cart[product.SKU]}
                  >
                    
                  </IconButton>
                  
 
                </Box>
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
