import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Button, Typography, Box, Badge } from '@mui/material';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import logo from '../img_rsc/logoSVG.svg';
import { useAuth } from '../../AuthContext';

const Navbar: React.FC = () => {
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [lastScrollY, setLastScrollY] = useState<number>(0);
  const location = useLocation(); // Use location to determine active route
  const { user, logout } = useAuth(); // Use the user context

  const handleScroll = () => {
    const currentScrollY = window.scrollY;
    if (currentScrollY > lastScrollY) {
      setIsVisible(false); // Hide on scroll down
    } else {
      setIsVisible(true); // Show on scroll up
    }
    setLastScrollY(currentScrollY);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  const categories: { id: string; name: string }[] = [
    { id: 'tv', name: 'TV' },
    { id: 'computers', name: 'Computers' },
    { id: 'appliances', name: 'Appliances' },
    { id: 'cellphones', name: 'Cellphones' },
    { id: 'videogames', name: 'Video Games' },
  ];

  return (
    <Box sx={{ margin: '0 20px' }}>
      <AppBar 
        position="static" 
        sx={{ 
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)', 
          borderRadius: '20px', 
          overflow: 'hidden',
          padding: '10px 0'
        }}
      >
        <Toolbar 
          sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            padding: '0', 
            minHeight: '60px', 
            alignItems: 'center',
            marginTop: '10px' 
          }}
        >
          <Link to="/auth/home" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
            <img 
              src={logo} 
              alt="Logo" 
              style={{ 
                height: '200px', 
                maxWidth: '200px', 
                margin: '0', 
              }} 
            />
          </Link>

          <Box sx={{ textAlign: 'center', flexGrow: 1 }}>
            <Typography 
              variant="h1" 
              sx={{ 
                color: '#2b364a', 
                fontWeight: 'bold',
                fontFamily: 'Arial, sans-serif', 
                letterSpacing: '1px',
                paddingTop: '5px',  
                paddingBottom: '0', 
                transition: 'color 0.3s',
                '&:hover': {
                  color: '#f9f4e3'
                }
              }}
            >
              E-ORDER
            </Typography>
            <Typography variant="h6" sx={{ color: '#2b364a' }} align="center">
              Your one-stop shop for electronics!
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', marginRight: '10px' }}>
            <Link to="/auth/cart" style={{ textDecoration: 'none', color: '#4a4a4a' }}>
              <Badge  color="secondary">
                <IconButton color="inherit" aria-label="Cart">
                  <FaShoppingCart size={28} />
                </IconButton>
              </Badge>
            </Link>
            <Link to="/profile/editprofile" style={{ textDecoration: 'none', color: '#4a4a4a', marginLeft: '20px' }}>
              <IconButton color="inherit" aria-label="Profile">
                <FaUser size={28} />
              </IconButton>
            </Link>
          </Box>
        </Toolbar>

        <Toolbar 
          sx={{ 
            justifyContent: 'flex-start', 
            borderTop: '2px', 
            padding: '10px 20px' 
          }}
        >
          <Box sx={{ display: 'flex', gap: '20px', marginRight: '20px' }}>
            {categories.map((category) => (
              <Button
                key={category.id}
                component={Link}
                to={`/auth/category/${category.id}`}
                color="inherit"
                sx={{ 
                  fontWeight: '500', 
                  textTransform: 'uppercase',
                  fontSize: '0.875rem',
                  transition: 'color 0.3s, transform 0.3s',
                  '&:hover': {
                    color: '#f9f4e3',
                    transform: 'scale(1.1)',
                  }
                }}
              >
                {category.name}
              </Button>
            ))}
            <div>
              {user ? (
                <Typography variant="h6" sx={{ color: '#2b364a' }} align="center">
                  Welcome! {user.username}
                </Typography>
              ) : (
                <p></p>
              )}
            </div>
          </Box>
          
          {/* Cerrar sesión button */}
          <Box 
  sx={{ 
    position: 'absolute', 
    bottom: '10px', 
    right: '10px', 
    display: 'flex', 
    justifyContent: 'flex-end', 
    zIndex: 999 
  }}
>
<Link to="/" style={{ textDecoration: 'none' }}>
  <Button 
    variant="contained" 
    color="secondary" 
    sx={{
      height: '40px',
      padding: '0 20px',
      borderRadius: '25px',
      fontSize: '0.875rem',
      fontWeight: '500',
      backgroundColor: '#EAA799',
      textTransform: 'none',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
      transition: 'all 0.3s ease-in-out',
      '&:hover': {
        backgroundColor: '#CD5c5c',
        transform: 'scale(1.05)',
        boxShadow: '0 6px 12px rgba(0, 0, 0, 0.3)',
      },
      '&:active': {
        backgroundColor: '#EAA799',
      },
    }}
  >
    Cerrar Sesión
  </Button>
  </Link>
</Box>

        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
