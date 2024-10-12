import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Button, Typography, Box, Badge, Slide } from '@mui/material';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import logo from '../img_rsc/logoSVG.svg';
import { create } from 'zustand'




// Definimos los tipos para los estados que manejamos
const Navbar: React.FC = () => {
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [lastScrollY, setLastScrollY] = useState<number>(0);

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

  // Tipamos las categorías
  const categories: { id: string; name: string }[] = [
    { id: 'tv', name: 'TV' },
    { id: 'computers', name: 'Computers' },
    { id: 'appliances', name: 'Appliances' },
    { id: 'cellphones', name: 'Cellphones' },
    { id: 'videogames', name: 'Video Games' },
  ];

  return (
    // <Slide appear={false} direction="down" in={isVisible}>
      <AppBar 
        position="static" 
        sx={{ 
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)', 
          borderRadius: '16px', // Add border radius for rounded edges
          overflow: 'hidden' // Ensures the rounded corners are applied correctly
        }}
      >
        {/* Top Row */}
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', padding: '0', minHeight: '60px', alignItems: 'center' }}>
          
          {/* Logo */}
          <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
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

          {/* E-ORDER Title and Tagline */}
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

          {/* Cart and Profile Icons */}
          <Box sx={{ display: 'flex', alignItems: 'center', marginRight: '10px' }}>
            <Link to="/cart" style={{ textDecoration: 'none', color: '#4a4a4a' }}>
              <Badge badgeContent={4} color="secondary">
                <IconButton color="inherit" aria-label="Cart">
                  <FaShoppingCart size={28} />
                </IconButton>
              </Badge>
            </Link>
            <Link to="/profile/signin" style={{ textDecoration: 'none', color: '#4a4a4a', marginLeft: '20px' }}>
              <IconButton color="inherit" aria-label="Profile">
                <FaUser size={28} />
              </IconButton>
            </Link>
          </Box>
        </Toolbar>

        {/* Bottom Row: Categories and Most Popular Items Button */}
        <Toolbar 
          sx={{ 
            justifyContent: 'flex-start', 
            borderTop: '2px solid #7b8a84', // Make the line thicker
            padding: '10px 20px' 
          }}
        >
          {/* Categories */}
          <Box sx={{ display: 'flex', gap: '20px', marginRight: '20px' }}>
            {categories.map((category) => (
              <Button
                key={category.id}
                component={Link}
                to={`/category/${category.id}`}
                color="inherit"
                sx={{ 
                  color: '#49708a', 
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
          </Box>

          {/* Most Popular Items Button */}
          <Button
            component={Link}
            to="/most-popular"
            color="inherit"
            sx={{ 
              color: '#49708a', 
              fontWeight: '500', 
              textTransform: 'uppercase', 
              marginLeft: 'auto',
              fontSize: '0.875rem',
              transition: 'color 0.3s, transform 0.3s',
              '&:hover': {
                color: '#f9f4e3',
                transform: 'scale(1.1)',
              }
            }}
          >
            Most Popular Items
          </Button>
        </Toolbar>
      </AppBar>
    // </Slide>
  );
};

export default Navbar;
