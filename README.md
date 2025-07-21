# Mini API de Usuarios

## Breve descripción del proyecto

Esta es una aplicación web simple que muestra la arquitectura cliente-servidor. Permite a los usuarios registrar su nombre, edad y ciudad a través de un formulario. El backend, construido con Express.js, valida los datos, los guarda en un archivo `JSON` para simular persistencia y devuelve un mensaje personalizado. El frontend muestra este mensaje y una lista actualizada de todos los registros históricos.

## Tecnologías utilizadas

* **Backend**: Node.js, Express.js
* **Frontend**: HTML5, CSS3, JavaScript
* **API**: RESTful
* **Comunicación**: `fetch()` API
* **Persistencia de datos**: Sistema de archivos (`fs` module) con formato JSON.

## Estructura de carpetas

La organización del proyecto separa claramente las responsabilidades:

-   `server.js`: El punto de entrada de la aplicación. Configura el servidor Express, los *middlewares* y las rutas principales.
-   `/public/`: Contiene todos los archivos del lado del cliente (frontend).
-   `/routes/`: Define los *endpoints* de la API.
-   `/data/`: Almacena los datos persistentes.

## Flujo completo de datos: del formulario al JSON

1.  **Entrada del Usuario**: El usuario llena los campos en `index.html`.
2.  **Captura en Frontend**: `main.js` captura los datos y envía una solicitud `POST` a `/usuarios` usando `fetch`.
3.  **Procesamiento en Backend**: El router `routes/usuarios.js` recibe la solicitud, valida los datos y los guarda en `data/registros.json`.
4.  **Respuesta del Servidor**: El servidor envía una respuesta JSON con un mensaje personalizado.
5.  **Actualización del Frontend**: `main.js` recibe la respuesta, la muestra en el DOM y actualiza la lista del historial con una solicitud `GET`.