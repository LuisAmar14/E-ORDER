import React from 'react';
import { Box } from '@mui/material'; 
import Navbar from '../../components/Navbar';
import MenuP from '../../components/MainMenu';

const Home: React.FC = () => {
  return (
    <>
      <Box 
        sx={{ 
          background: '#f9f3f3', // Make sure this is a string
          // minHeight: '100vh', // Uncomment if you want it to fill the viewport height
          padding: '0' // Remove padding for the Navbar to stick to the edge
        }}
      >
        <Navbar /> 
      </Box>
      <Box sx={{ padding: 0, margin: 0 }}>
        <MenuP/> 
      </Box>
    </>
  );
};

export default Home;
