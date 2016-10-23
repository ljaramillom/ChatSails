# ChatSailsReact
Creando un chat realtime con Sails.js y React

**Parte 1: Sails.js**

- **Instalación**

`npm install -g Sails` 

Esto instalará en la línea de comandos la herramienta para gestión de proyectos Sails de manera global -g

- **Crear el proyecto**

Ahora podemos crear nuestro nuevo proyecto Sails

`sails new chatBackend`

Esto creará el nuevo proyecto en la carpeta chatBackend ahora podemos entrar y "levantar" nuestro nuevo proyecto

`sails lift`

Esto lanza el servidor en la dirección **http://localhost:1337/**
Ahora estamos listos para comenzar con la API de mensajes

- **Crear el API message**

Sails permite generar APIs con una simple línea de comandos, esto generará un Modelo y Controlador automáticamente y todas las acciones CRUD y funciones de búsqueda, filtros, paginación y orden. Este endpoint puede ser accedido desde el navegador, haciendo llamadas ajax o desde socket.io con métodos especialmente formulados por Sails.

`sails generate api message`

Ahora se puede jugar con el endpoint de message para ver como funciona

`sails lift`

**Nota:** Antes de iniciar el servidor, Sails avisa que no existe una configuración para las migraciones y pregunta que se desea hacer.

Esta configuración le dice a Sails como trabajar las migraciones de la base de datos. Existen 3 tipos de migraciones:

- `safe`: Nunca auto-migra la base de datos. Debe hacerse a mano
- `alter`: Auto-migra, intentando mantener los datos actuales
- `drop`: Vacía/elimina todos los datos y reconstruye los modelos cada vez que se realiza un sails lift

En esta ocasión se usará `alter` para modificar la migración se abre el archivo **config/models.js** y se descomenta la línea 30

`migrate: alter`

Ahora si se puede hacer `sails lift`

Abrir el archivo `/api/models/Message.js` y se agrega `schema: true` para forzar los atributos especificados

```
module.exports = {
	
	schema: true,		//Fuerza el uso de atributos especificos

  attributes: {
	author: {
		type: 'string',
		required: true
	},
    text: {
		type: 'string',
		required: true
	}
  }
};
```

Por ahora Sails esta listo, se volverá más adelante para agregar el protocolo de comunicación de socket.io

- **Un poco de estilo**

Se pueden colocar estilos css en el archivo `assets/styles/main.css`

```
html {
	box-sixing: border-box;
}

*, *:before, *:after {
	box-sizing: inherit;
}

html, body {
	margin: 0;
	padding: 0;
}

body {
	font-family: Century Gothic, sans-serif;
	font-size: 12px;
}

.ChatBox {
	max-width: 800px;
	margin: auto;
	padding: 10px;
}

.ChatMessage .author {
	width:  14%;
	display: inline-block;
	text-align: right;
	vertical-align: top;
}

.ChatMessage .message {
	display: inline-block;
	width: 84%;
	border-left: 1px solid rgba(150,150,150,0.50);
	padding-left: 1%;
	padding-bottom: 10px;
}

.ChatList {
	margin: 0;
	padding: 0;
	list-style: none;
}

.ChatForm {
	margin: 1% 0;
}

.ChatForm input {
	font-size: 12px;
	padding: 3px 2px;
	outline: 0;
	vertical-align: middle;
	font-family: inherit;
	border: 1px solid rgba(150,150,150,0.50);
	-webkit-appearance: none;
	border-radius: 0;
}

.ChatForm .author {
	width: 14%;
	display: inline-block;
	text-align: right;
}

.ChatForm .text {
	width: 40%;
	margin-left: 2%;
	border-right: none;
}

.ChatForm input[type=submit]{
	border-left: 0;
	background: #0BADED;
	color: white;
	padding: 3px 15px;
	cursor: pointer;
}
```
**Parte 2: React**

- **Incorporando a Sails**

Para poder utilizar `bower` en nuestro proyecto Sails es preciso cambiar el directorio por defecto de `bower`, para eso se cea el archivo `.bowerrc` donde agregamos lo siguiente:

```
{
   "directory": "assets/vendor"
}
```
Ahora cualquier librería que se instale usando `bower` quedará en el directorio `assets/vendor`.

Iniciamos el proyecto bower con `bower init` rellenando los datos que pregunten. Luego, se instala `React` de la siguiente manera:

`bower install react --save`

de este modo React es agregado a la lista de dependencias de nuestro proyecto en `bower.json`




