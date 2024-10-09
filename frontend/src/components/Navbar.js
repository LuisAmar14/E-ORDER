import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, TextField, InputAdornment, Button, Menu, MenuItem } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import { ArrowDropDown } from '@mui/icons-material'; //  ícono de flecha hacia abajo
import logo from '../img_rsc/logoSVG.svg'; // Ruta del logo
import { Home } from '@mui/icons-material'; // ICONO DE HOME

const Navbar = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  // Definición de categorías estáticas
  const categories = [
    { id: 'cellphones', name: 'Celulares' },
    { id: 'laptops', name: 'Laptops' },
    { id: 'accessories', name: 'Accesorios' },
  ];

  return (
    <AppBar position="static" sx={{ backgroundColor: '#ede7d5', elevation: 4 }}>
      <Toolbar sx={{ justifyContent: 'space-between', padding: '0 20px', maxHeight: '70px' }}> {/* Ajusta minHeight */}
        {/* Barra de búsqueda */}
        <TextField
          variant="outlined"
          placeholder="Search..."
          size="small"
          sx={{ width: '250px', backgroundColor: '#f8f9fa', borderRadius: 1 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />

        {/* Logo */}
       {/* <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', height: '100%' }}>
          <img src={logo} alt="Logo" style={{ maxHeight: '150px', margin: '0 0px' }} />
       </Link>*/}

        
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Link to="/cart" style={{ textDecoration: 'none' }}>
            <IconButton color="inherit" sx={{ display: 'flex', alignItems: 'center', color: '#545454' }} aria-label="Cart">
              <FaShoppingCart size={24} /> Cart (0)
            </IconButton>
          </Link>
          <Link to="/profile/signin" style={{ textDecoration: 'none' }}>
            <IconButton color="inherit" sx={{ display: 'flex', alignItems: 'center', color: '#545454' }} aria-label="Profile">
              <FaUser size={24} /> Profile
            </IconButton>
          </Link>
        </div>
      </Toolbar>

      {/* Barra inferior  */}
      <Toolbar sx={{ justifyContent: 'space-between', borderTop: '1px solid #7b8a84', paddingTop: '10px' }}>
        <Button component={Link} to="/" color="inherit" sx={{ color: '#545454', fontWeight: '500', display: 'flex', alignItems: 'center' }}>
            <Home sx={{ marginRight: '5px' }} /> {/* Ícono de Home */}
            HOME
        </Button>

        {/* Menú de Categorías */}
        <div>
        <Button
        onClick={handleMenuClick}
        color="inherit"
        sx={{ color: '#545454', fontWeight: '500', display: 'flex', alignItems: 'center' }}
    >
        CATEGORIES <ArrowDropDown sx={{ marginLeft: '5px' }} />
    </Button>
    <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
        PaperProps={{
            sx: {
                backgroundColor: '#ede7d5',
                borderRadius: '8px',
                boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)',
                maxHeight: '300px', // Limita la altura del menú
                overflowY: 'auto', // Añade scroll si hay demasiados elementos
                '& .MuiMenuItem-root': {
                    padding: '10px 20px', // Aumenta el padding
                    fontSize: '16px', // Aumenta el tamaño de fuente
                    '&:hover': {
                        backgroundColor: '#b7cc18',
                        color: '#fff',
                    },
                    '&:focus': {
                        backgroundColor: '#b7cc18',
                        color: '#fff',
                    },
                },
            },
        }}
    >
        {categories.map((category) => (
            <MenuItem
                key={category.id}
                onClick={() => {
                    handleCloseMenu();
                    // Aquí puedes agregar lógica para manejar la selección, si es necesario
                }}
                selected={category.selected} // Asegúrate de manejar correctamente el estado de selección
            >
                <Link
                    to={`/category/${category.id}`}
                    style={{ textDecoration: 'none', color: '#545454', width: '100%' }} // Asegúrate de que el link ocupa todo el ancho
                >
                    {category.name}
                </Link>
            </MenuItem>
        ))}
    </Menu>


        </div>
        </Toolbar>
    </AppBar>
  );
};

export default Navbar;
