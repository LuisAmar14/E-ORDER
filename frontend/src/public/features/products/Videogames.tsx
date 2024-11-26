import React from 'react';
import { Box } from '@mui/material'; 
import Navbar from '../../components/Navbar';
import MenuP from '../../components/MainMenu';

const Videogames: React.FC = () => {
    return (
      <>
        <Box 
          sx={{ 
            backgroundColor: '#1e64955', 
            padding: '0', // Elimina padding para que el Navbar se adhiera al borde
          }}
        >
          <Navbar /> 
        </Box>
        <Box sx={{ padding: 0, margin: 0 }}>
        </Box>
        <MenuP Category="Video Games" />
      </>
    );
};

export default Videogames;