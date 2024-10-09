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
  
#### Ejemplo de solicitud

POST http://api.e-order.com/login \
{
  "username": "Luis_Amar",
  "password": "hola123"
}

#### Respuesta
- **200 OK**: Si la autenticación es exitosa.
- **401 Unauthorized**: Si las credenciales son incorrectas.
{
"token": "Inicio de sesión exitosa"
}
{
"token": "Nombre de usuario o contraseña incorrecta"
}

### `POST /register`
Registra un nuevo usuario.

#### Parámetros
- **Cuerpo de la solicitud**:
  - `first_name`: (string) Nombre.
  - `last_name`: (string) Apellido.
  - `user_name`: (string) Nombre de usuario.
  - `country`: (string) País.
  - `email`: (string) Correo electrónico.
  - `password`: (string) Contraseña.
  - `address`: (string) Domicilio.
#### Ejemplo de solicitud

POST http://api.e-order.com/register
{
  "first_name": "Luis",
  "last_name": "Amar",
  "user_name": "hola123",
  "country": "MEX",
  "email": "luis_1@hotmail.com",
  "password": "hola123",
  "address": "5 de mayo #12"
}


#### Respuesta
- **201 Created**: Usuario registrado con éxito.
- **400 Bad Request**: Los datos son inválidos.
{
  "message": "Usuario registrado con éxito"
}
{
  "message": "Error al validar campos"
}




### `POST /user/{id}`
Modifica las credenciales del usuario.

#### Parámetros
  
- **Cuerpo de la solicitud**:
  - `user_name`: (string) Nuevo nombre de usuario (opcional).
  - `country`: (string) Nuevo país del usuario (opcional).
  - `address`: (string) Nuevo domicilio del usuario (opcional).
  - `email`: (string) Nuevo correo electrónico del usuario (opcional).
  - `password`: (string) Nueva contraseña del usuario (opcional).

#### Ejemplo de solicitud
POST http://api.e-order.com/user/{id}
{
  "user_name": "amar_luis",
  "country": "USA",
  "address": "6 de mayo #13",
  "email": "luis_2@hotmail.com",
  "password": "adios123"
}

#### Respuesta
- **200 OK**: Credenciales modificadas con éxito.
- **400 Bad Request**: Los datos son inválidos.
    {
      "message": "Usuario modificado con éxito"

    }
    {
      "message": "Error al validar campos"

    }
### `GET /products`
Obtiene una lista de los productos más populares.

#### Ejemplo de solicitud
GET http://api.e-order.com/products


#### Respuesta
- **200 OK**: Lista de productos "más vistos".
[
  {
    "id": 1,
    "name": "Samsung Galaxy S24",
    "price": 50,
    "descriprion": "Celular ..."
  },
  {
    "id": 25,
    "name": "Samsung Neo QLED",
    "price": 100,
    "description": "Television QLED"
  }
]

### `GET /products/category={category}`
Filtra productos por categoría.

#### Ejemplo de solicitud
GET http://api.e-order.com/products?category=Cellphones



#### Respuesta
- **200 OK**: Lista de productos en la categoría seleccionada.
[
  {
    "id": 1,
    "name": "Samsung Galaxy S24",
    "category": "Cellphones",
    "price": 50,
    "descriprion": Celular...
  },
  {
    "id": 2,
    "name": "Iphone 25",
    "price": 51,
    "description": "Celular"
  }
]


### `POST /cart?product_id={produc}&user_id`
Agrega un producto al carrito.

#### Ejemplo de solicitud
POST http://api.e-order.com/cart?product_id=1&user_id=1


#### Respuesta
- **200 OK**: Producto agregado con éxito.
- **404 Not Found**: Producto o usuario no encontrado.
{
  "message": "Producto añadido al carrito"
}
{
  "message": "Error añadiendo producto"
}

### `POST /cart?product_id={product_id}&user_id&quantity={quantity}`
Agrega un producto al carrito con una cantidad específica.

#### Ejemplo de solicitud
POST http://api.e-order.com/cart?product_id=84848&user_id=12345&quantity=23

#### Respuesta
- **200 OK**: Producto agregado con la cantidad indicada.

### `GET /cart?user_id={user_id}`
Ve el carrito de compra del usuario actual.
#### Ejemplo de solicitud

#### Ejemplo de solicitud
GET http://api.e-order.com/cart?user_id=1

#### Respuesta
- **200 OK**: Lista de productos en el carrito del usuario.
[
  {
    "product_id": 2,
    "name": "Iphone 25",
    "quantity": 2,
    "price": 102
  }
    {
    "product_id": 25,
    "name": "Samsung QLED",
    "quantity": 5,
    "price": 500
  }
]

### `POST /checkout`
Procesa una compra con información de tarjeta y total.


#### Parámetros
- **Cuerpo de la solicitud**:
  - `card_info`: (object) Información de la tarjeta.
  - `total`: (float) Total de la compra.
#### Ejemplo de solicitud
 POST http://api.e-order.com/checkout
{
  "card_info": {
    "number": "1111111111111111",
    "expiry": "09/31",
    "cvv": "111"
  },
  "total": 111
}
#### Respuesta
- **200 OK**: Estado de la transacción.

## Códigos de Respuesta
- `200 OK`: Éxito.
- `201 Created`: Creación exitosa.
- `400 Bad Request`: Solicitud inválida.
- `401 Unauthorized`: No autorizado.
- `404 Not Found`: No encontrado.
- `500 Internal Server Error`: Error del servidor.


