
# E-order
E-Commerce Application

## Descripción
Esta es una aplicación web de comercio electrónico desarrollada con **React** en el frontend y **Node.js** en el backend. Los datos se obtienen desde la API de Best Buy y se almacenan en una base de datos **MongoDB**. El proyecto permite a los usuarios navegar por productos, iniciar sesión, registrarse y gestionar sus perfiles. Así como el agregar artículos a su carrito, eliminarlos, aumentar la cantidad o disminuirla y proceder a la pseudocompra.

## Características
- **Frontend en React**: Interfaz moderna y elegante con un diseño responsive, con biblioteca MUI (Material UI).
- **Backend en Node.js**: Servidor configurado para manejar las solicitudes de la API de Best Buy y una API propia.
- **Base de datos en MongoDB**: Almacena la información extraída de la API, los datos de usuario y datos de los productos.
- **Autenticación**: Los usuarios pueden registrarse, iniciar sesión y modificar su perfil.
- **Carrito de compras**: Funcionalidad para añadir y quitar productos del carrito.
- **Navbar personalizado**:
  - Barra de búsqueda.
  - Logo centrado.
  - Carrito y perfil a la derecha.
  - Desplegable para categorías.

## Endpoints de la API

- **Autenticación y Usuarios**:
  - `POST /login`: Recibe el usuario y la contraseña para iniciar sesión.
  - `POST /register`: Registra un nuevo usuario con nombre, apellido, país, correo, contraseña, etc.
  - `POST /user/{id}`: Modifica las credenciales de un usuario por su ID.

- **Productos**:
  - `GET /products`: Obtiene los productos más populares (ordenados por número de clicks).
  - `GET /products/category=Stationery`: Filtra los productos por categoría (por ejemplo, papelería).

- **Carrito de Compras**:
  - `POST /cart?product_id=84848&user_id`: Agrega un producto al carrito del usuario.
  - `POST /cart?product_id=84848&user_id&quantity=23`: Agrega un producto al carrito con una cantidad específica.
  - `GET /cart`: Visualiza los productos en el carrito del usuario autenticado.

- **Checkout**:
  - `POST /checkout`: Procesa la transacción de compra. Se envía la información de la 'tarjeta' y el total de la compra, y devuelve el estado de la transacción.

## Instalación

### Clonar el repositorio
```bash
git clone https://github.com/tu_usuario/whatiwant.git
```

### Instalar dependencias del frontend y backend
1. **Backend**:
    ```bash
    cd APP/backend
    npm install
    ```
2. **Frontend**:
    ```bash
    cd APP/frontend
    npm install
    ```

### Configurar la base de datos
1. Instalar **MongoDB** y **MongoDB Compass** si no lo has hecho.
2. Crear una base de datos y colecciones en **MongoDB Compass** para almacenar los datos de la API de Best Buy.
3. Asegúrate de que el servidor de MongoDB esté en funcionamiento.

### Ejecutar la aplicación

1. **Backend**:
    ```bash
    cd APP/backend
    npm start
    ```
2. **Frontend**:
    ```bash
    cd APP/frontend
    npm start
    ```

La aplicación estará disponible en `http://localhost:3000`.

## API utilizada
- **Best Buy API**: Se utiliza para obtener los productos disponibles en la tienda.

## Tecnologías utilizadas
- **Frontend**:
  - React
  - JavaScript
  - Estilo MUI
- **Backend**:
  - Node.js
  - Express
  - Axios
- **Base de datos**:
  - MongoDB

## Próximos pasos
- Implementar más categorías dinámicas.
- Mejorar el diseño responsivo del Navbar.
- Añadir validaciones avanzadas de autenticación y seguridad.
- Diseño de páginas pendientes.

## Contribuciones
Si deseas contribuir a este proyecto, siéntete libre de hacer un **fork** del repositorio, crear una rama nueva con tus cambios, y abrir un **pull request**.

## Licencia
Este proyecto está bajo la licencia MIT.
