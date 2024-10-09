# Documentación de la API E-ORDER

## Introducción
La API E-ORDER permite a los usuarios gestionar su experiencia de compra, incluyendo autenticación, exploración de productos y gestión del carrito.

## Autenticación
Para acceder a los endpoints protegidos, el usuario debe autenticarse utilizando el endpoint `/login`.

## Endpoints

### `POST /login`
Permite a un usuario iniciar sesión.

#### Parámetros
- **Cuerpo de la solicitud**:
  - `username`: (string) Nombre de usuario.
  - `password`: (string) Contraseña.

#### Respuesta
- **200 OK**: Si la autenticación es exitosa.
- **401 Unauthorized**: Si las credenciales son incorrectas.

### `POST /register`
Registra un nuevo usuario.

#### Parámetros
- **Cuerpo de la solicitud**:
  - `first_name`: (string) Nombre.
  - `last_name`: (string) Apellido.
  - `country`: (string) País.
  - `email`: (string) Correo electrónico.
  - `password`: (string) Contraseña.
  - `address`: (string) Domicilio.

#### Respuesta
- **201 Created**: Usuario registrado con éxito.
- **400 Bad Request**: Si los datos son inválidos.

### `POST /user/{id}`
Modifica las credenciales del usuario.

#### Parámetros
- **URL**:
  - `id`: (string) ID del usuario (se debe incluir en la URL).
  
- **Cuerpo de la solicitud**:
  - `first_name`: (string) Nuevo nombre del usuario (opcional).
  - `last_name`: (string) Nuevo apellido del usuario (opcional).
  - `country`: (string) Nuevo país del usuario (opcional).
  - `address`: (string) Nuevo domicilio del usuario (opcional).
  - `email`: (string) Nuevo correo electrónico del usuario (opcional).
  - `password`: (string) Nueva contraseña del usuario (opcional).

#### Respuesta
- **200 OK**: Credenciales modificadas con éxito.
- **404 Not Found**: Usuario no encontrado.

### `GET /products`
Obtiene una lista de los productos.

#### Respuesta
- **200 OK**: Lista de productos.

### `GET /products/category={category}`
Filtra productos por categoría.

#### Respuesta
- **200 OK**: Lista de productos en la categoría seleccionada.

### `POST /cart?product_id={produc}&user_id`
Agrega un producto al carrito.

#### Respuesta
- **200 OK**: Producto agregado con éxito.
- **404 Not Found**: Producto o usuario no encontrado.

### `POST /cart?product_id={product_id}&user_id&quantity={quantity}`
Agrega un producto al carrito con una cantidad específica.

#### Respuesta
- **200 OK**: Producto agregado con la cantidad especificada.

### `GET /cart`
Ve el carrito de compra del usuario actual.

#### Respuesta
- **200 OK**: Lista de productos en el carrito del usuario.

### `POST /checkout`
Procesa una compra con información de tarjeta y total.

#### Parámetros
- **Cuerpo de la solicitud**:
  - `card_info`: (object) Información de la tarjeta.
  - `total`: (float) Total de la compra.

#### Respuesta
- **200 OK**: Estado de la transacción.

## Códigos de Respuesta
- `200 OK`: Éxito.
- `201 Created`: Creación exitosa.
- `400 Bad Request`: Solicitud inválida.
- `401 Unauthorized`: No autorizado.
- `404 Not Found`: No encontrado.
- `500 Internal Server Error`: Error del servidor.


