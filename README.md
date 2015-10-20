react-init
============
[![Dependency Status](https://david-dm.org/wesitos/react-init.svg)](https://david-dm.org/wesitos/react-init)
[![devDependency Status](https://david-dm.org/wesitos/react-init/dev-status.svg)](https://david-dm.org/wesitos/react-init#info=devDependencies)
### Estructura de carpetas

    react-init
    ├── build : Carpeta que se sirve
    │   └── static: CSS y Javascript compilados para navegador (creado al construir)
    │       └── css
    │       └── js  : Apps de react compilados
    ├── src
    │   ├── app : Scripts principales de cada pagina (jsx)
    │   ├── component : Componentes de react (jsx)
    │   ├── html: html estatico, (se copia a "build/")
    │   └── styles
    └── tasks : Scripts de gulp para automatizacion
### JSX
Un componente de react por archivo en `src/component`. Los componentes se referenciaran entre si utilizando `require` (CommonJS). Ejemplo:
``` js
    /*Archivo: src/component/Foo.jsx */
    
    // Utilizamos el componente Faa que se encuentra en la misma carpeta
    import React from "react";  //var React = require("react");
    import Faa from "./Faa,jsx""; //var Faa = require("./Faa.jsx");
    
    var Foo = React.createClass({
        render: function(){
            return(<Faa data="lalala"/>);
        }
    });
    /* Al final de cada componente, hay que almacenarlo en module.exports
       para que pueda ser utilizado */
    module.exports = Foo;
```
``` js
/* Archivo: src/app/index.jsx */

    import ReactDOM from "react-dom";       // var ReactDOM = require("react-dom");
    // Utilizamos un componente de react en el script
    import Foo from "../component/Foo.jsx"; //var Foo = require("../component/Foo.jsx");
    
    ReactDOM.render(<Foo/>, document.getElementById("container"));
```
``` html
<!-- Archivo: src/html/index.html -->
<!DOCTYPE html>
<html>
    <head>
        <script src="static/js/vendor.js" />
    </head>
    <body>
        <div id="container"></div>
        <script src="static/js/index.js" />
    </body>
</html
```
### Como utilizar
Instalar dependencias
``` bash
$ npm install
```
Para construir.
``` bash
$ npm run build
```
Para construir continuamente.
``` bash
$ npm run dev
```
Para construir y minimizar.
``` bash
$ npm run deploy
```
Para ejecutar un servidor estático
``` bash
$ node app.js
```
