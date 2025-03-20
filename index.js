import express from 'express';
import cors from 'cors';

import dotenv from 'dotenv';
dotenv.config();

// Importar las rutas

import productosrouter from './router/productos/productosRouter.js';
import usuariosrouter from './router/usuarios/usuariosRouter.js';
import clientesrouter from './router/clientes/clientesRouter.js';
import marcasrouter from './router/marcas/marcasRouter.js';
import proveedoresrouter from './router/proveedores/proveedoresRouter.js';
import categoriasrouter from './router/categorias/categoriaRouter.js';
import stonkrouter from './router/stonk/stonkRouter.js';
import comprasrouter from './router/compras/comprasRouter.js';

// Crear la app de express
const app = express();

// Habilitar la captura de datos mediante post / formularios
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const corsOptions = {
    origin: process.env.CORS_ORIGIN,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  
    exposedHeaders: 'Content-Length,X-Knowledge',
    credentials: true,
    preflightContinue: false,
    optionsSuccessStatus: 204 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

// Apply CORS middleware globally


// Configurar el puerto
const port = 3000;

// Usar las rutas

app.use('/productos', productosrouter);
app.use('/usuarios', usuariosrouter);
app.use('/clientes', clientesrouter);
app.use('/marcas', marcasrouter);
app.use('/proveedores', proveedoresrouter);
app.use('/categorias', categoriasrouter);
app.use('/movimientos_stock', stonkrouter);
app.use('/compras', comprasrouter);



// Levantar el servidor en el puerto 3000
app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`);
});
