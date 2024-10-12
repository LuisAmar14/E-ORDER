import React from 'react';
import { Box } from '@mui/material'; 
import Navbar from '../../components/Navbar';
import MenuP from '../../components/MainMenu';

const Home: React.FC = () => {
  return (
    <>
      <Box 
        sx={{ 
          // minHeight: '100vh', // Puedes comentar esta línea si no es necesario
          padding: '0', // Elimina padding para que el Navbar se adhiera al borde
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
