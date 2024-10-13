import React from 'react';
import { Box } from '@mui/material'; 
import Navbar from '../../components/Navbar';
import MostPo from '../../components/MostP';


const MostPop: React.FC = () => {
    return (
      <>
        <Box 
          sx={{ 
            backgroundColor: '#1e64955', 
            // minHeight: '100vh', // Puedes comentar esta línea si no es necesario
            padding: '0', // Elimina padding para que el Navbar se adhiera al borde
          }}
        >
          <Navbar /> 
        </Box>
        <Box sx={{ padding: 0, margin: 0 }}>
          <MostPo/> 
        </Box>
      </>
    );
  };
  
  export default MostPop;