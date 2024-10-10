import React from 'react';
import { Box } from '@mui/material'; // Import Box component
import Navbar from '../../components/Navbar'; 

const Home = () => {
  return (
    <Box 
      sx={{ 
        backgroundColor: '#1e6495', // Set the background color
        minHeight: '100vh', // Ensure it takes full height
        padding: '20px', // Optional padding for content
      }}
    >
      <Navbar /> {/* Include the Navbar component */}
    </Box>
  );
};

export default Home;
