# Chat Sails

a [Sails](http://sailsjs.org) application

- **Instalación:**

Para instalar Sails, es bastante simple. Los requisitos son tener Node.js instalado y también la NPM, que viene con Node. Entonces se debe escribir el siguiente comando en el terminal:

`npm -g install sails`

- **Crear un nuevo projecto:**

Con el fin de crear un nuevo proyecto de Sails, se utiliza el siguiente comando:

`sails new chatSails`

Luego ingresamos a la carpeta del proyecto con el comando:

`cd chatSails`

A continuación iniciamos el servidor web con el siguiente comando:

`sails lift`

Sails usa por defecto el puerto 1337, por lo que si visita **http://localhost:1337** debe obtener la página por defecto de Sails.

- **Instalación Bower**

Con Bower podemos descargar y actualizar todo tipo de librerías, frameworks, plugins, etc., pero sin tener que preocuparnos por descargarlos y subirlos a mano nosotros mismos. 

`npm install bower -g`

- **Grunt**

Otro requisito para utilizar sails, es tener instalado en nuestro sistema el gestor de tareas Grunt.

`npm install grunt-bower --save`

Grunt, es herramienta muy potente que nos ahorra mucho tiempo cuando estamos desarrollando. Se encarga de realizar tareas que son repetitivas, como minificar código, compilación, pruebas unitarias, etc. en definitiva hace nuestro trabajo más fácil.

- **Estructura de la aplicación**
```
chatSails
|--api
    |--controllers
    |--models
    |--policies
    |--responses
    |--services
|--assets
    |--images
    |--js
    |--styles
    |--templates
|--bower_components
|--config
|--node_modules
|--tasks
    |--config
    |--register
|--views
```

- **Configuración de archivos** 

Crear un archivo **bower.js** en la ruta: tasks/config/bower.js y escribir el siguiente código:

```
module.exports = function(grunt) {
  grunt.config.set('bower', {
    dev: {
        dest: '.tmp/public',
        js_dest: '.tmp/public/js',
        css_dest: '.tmp/public/styles'
    }
  });
 
  grunt.loadNpmTasks('grunt-bower');
 
};
```
Agregar **'bower:dev',** en el archivo compileAssets.js de la siguiente ruta: /tasks/register/compileAssets.js 

```
module.exports = function(grunt) {
  grunt.registerTask('compileAssets', [
    'clean:dev',
    'bower:dev',
    'jst:dev',
    'less:dev',
    'copy:dev',
    'coffee:dev'
  ]);
};
```
Crear el archivo **chat.ejs** en la siguiente ruta: views/chat.ejs y escribir el siguiente código:

```
<div>
	<div class="navbar-header">Chat Sails by Pioneras Developers</div>
	<div class="col-md-12" style="padding:100px">
		<table id="table-message" class="table-message">
			<tbody></tbody>
		</table>

		</div>

		<div class="navbar">
			<div class="div-form">
					<div class="child-form">
						<input id="name" type="text" placeholder="Nombre">
					</div>

					<div  class="child-form">
						<input id="message" type="text" placeholder="Mensaje">
					</div>
					<button id="send" class="btn-send child-form">Enviar</button>  
			</div>
		</div>

	</div>
```

Configurar el archivo **routes.js** en la siguiente ruta: /config/routes.js y escribir el siguiente código:

```
module.exports.routes = {

  'get /': {
    view: 'chat'
  },
  'get /join_chat': 'ChatController.joinUser',
  'get /send_message': 'ChatController.sendMessage',
};
```
- **Instalación de jQuery**

`bower install jquery --save`

- **Creación de carpetas**

Crear la carpeta **views** en la siguiente ruta: assets/js/views en esta nueva carpeta crear el archivo chat.js y escribir el siguiente código:

```
$(function(){
	$("#send").click(function(){
		//enviar mensaje escrito
		var data = {};
		data.user = $("#name").val();
		data.message = $("#message").val();
		
		io.socket.get('/send_message', data,  function(data, response) {
		});

		$("#message").val("");
		$("#message").focus();
	});

	//matricular usuario al chat
	io.socket.get('/join_chat', function(data, response) {
	});

	//recibir mensaje
	io.socket.on('message', function(data) {
		var tr = $("<tr><td class='td'><strong>" + data.user + " : " + "</strong>" + data.message + "</td></tr>");
		$("#table-message").find("tbody").append(tr);
	});
});
```
Crear la carpeta **views** en la siguiente ruta: assets/styles/views en esta nueva carpeta crear el archivo chat.css y escribir el siguiente código:

```
body{
		background: #ededed;
		font-family: 'Open Sans', sans-serif;
	}

	.navbar-header {
		font-family: 'Open Sans', sans-serif;
		font-size: 33px;
		text-align: center;
		color: #FF8410;
		font-style: italic;
		font-weight: bold;
		padding: 2px;
		text-shadow: 1px 2px #999;
		height: 60px;
	}

	.chat_message {
		padding: 10px;
		color: #000;
		font-size: 15px;
		background: #fff;
		font-family: 'Open Sans', sans-serif;
	}
  
	.table-message {
		width: 100%;
		max-width: 100%;
		margin-bottom: 23px;
	}

	.td {
		padding: 5px;
		border-top: 1px solid #dddddd;
		height: 30px;
		background: white;
	}

	.navbar {
		position: fixed;
		right: 0;
		left: 0;
		z-index: 1030;
		background-color: #FF8410; 
		bottom: 0;
		margin-bottom: 0;
		height: 60px;
	}

  .div-form {
		height: 100%;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}

	.child-form {
		height: 30px;
		margin-right: 20px;
		border-bottom: 1px solid white;
	}

	.child-form input {
		height: 30px;
		background-color: rgba(255,255,255,0);
    	border: 0;
    	color: white;
    	font-family: 'Open Sans', sans-serif;
    	font-size: 15px;
	}

	.child-form input:focus {
		outline: none;
	}

	::-webkit-input-placeholder {
		color: rgba(255,255,255,0.5);
	}

	.btn-send {
		text-transform: uppercase;
		box-shadow: 1px 1px 2px rgba(0,0,0,0.3);
		border-right: none;
		border-bottom: none;
        border-radius: 5px;
 		transition: all 2s ease;
        width: 10%;
	}
```
- **Creación de un API**

Se creará el archivo **controlador**, para ello ejecutaremos la siguiente sentencia en la consola:

`sails generate api Chat`

- **Configuración de archivo ChatController**

En la siguiente ruta: api/controllers/ChatController.js en esta nueva carpeta crear el archivo chat.css y escribir el siguiente código:

```
 module.exports = {

 	joinUser: function(req, res){
 		console.info("Se une un usuario nuevo al chat");
 		if (!req.isSocket) {return res.badRequest();}
 		sails.sockets.join(req, 'PionerasDev');
 	},

 	sendMessage: function(req, res){
 		var data = {};
 		data.user = req.param("user");
 		data.message = req.param("message");
		sails.sockets.broadcast('PionerasDev', 'message', data);
 	}

 };
```

- **Migraciones de las Bases de datos**

Para las migraciones de la base de datos. Existen 3 tipos de migraciones:

     1. safe: Nunca auto-migra la base de datos. Debe hacerse a mano
     2. alter: Auto-migra, intentando mantener los datos actuales
     3. drop: Vacía/elimina todos los datos y reconstruye los modelos cada vez que se realiza un Sails lift

En esta ocasión se usará `alter`, para modificar la migración se abre el archivo: config/models.js y se descomenta la línea 30

`migrate: 'alter'`

- **Chat Pioneras**

Iniciamos el servidor web con el siguiente comando:

`sails lift`

Abrimos el navegador y visitamos la siguiente dirección **http://localhost:1337**

                                  :satisfied: !Chat de Pioneras funcionando! :clap:
