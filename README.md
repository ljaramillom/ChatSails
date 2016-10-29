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

Sails usa por defecto el puerto 1337, por lo que si visita http://localhost:1337 debe obtener la página por defecto de Sails.

- **Instalación Bower**

Con Bower podemos descargar y actualizar todo tipo de librerías, frameworks, plugins, etc., pero sin tener que preocuparnos por descargarlos y subirlos a mano nosotros mismos. 

`npm install bower --save`

- **Grunt**

Otro requisito para utilizar sails, es tener instalado en nuestro sistema el gestor de tareas Grunt.

`npm install grunt-bower --save`

Grunt, es herramienta muy potente que nos ahorra mucho tiempo cuando estamos desarrollando. Se encarga de realizar tareas que son repetitivas, como minificar código, compilación, pruebas unitarias, etc. en definitiva hace nuestro trabajo más fácil.

- **Estructura de la aplicación**

chatSails
|--api
|--assets
|--config
|--node_modules
|--tasks
    |--config
|--views

- **Crear archivo bower.js** 

Crear un archivo bower.js en la ruta tasks/config/bower.js e ingresar el siguiente código:

```
module.exports = function(grunt) {
  grunt.config.set('bower', {
    dev: {
        dest: '.tmp/public',
        js_dest: '.tmp/public/js',
        css_dest: '.tmp/public/styles'
    }
  });
```

