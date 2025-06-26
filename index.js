import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';


dotenv.config();

// Importar las rutas
import productosrouter from './router/productos/productosRouter.js';
import usuariosrouter from './router/usuarios/usuariosRouter.js';
import clientesrouter from './router/clientes/clientesRouter.js';
import marcasrouter from './router/marcas/marcasRouter.js';
import categoriasrouter from './router/categorias/categoriaRouter.js';
import facturacionrouter from './router/facturacion/facturacionRouter.js';
import creditoRouter from './router/credito/creditoRouter.js';

const app = express();

// 🔥 Configurar CORS directamente (sin depender de .env)
const corsOptions = {
    origin: '*', // Permite todas las solicitudes (temporalmente)
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
};

app.use(cors(corsOptions));

// 🔥 Añadir manualmente el encabezado CORS en cada respuesta
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // Permite todas las solicitudes
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

// Procesar JSON y formularios
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 3000;

// Rutas


app.use('/productos', productosrouter);
app.use('/usuarios', usuariosrouter);
app.use('/clientes', clientesrouter);
app.use('/marcas', marcasrouter);
app.use('/categorias', categoriasrouter);
app.use('/facturacion', facturacionrouter);
app.use('/credito', creditoRouter);

// 🔥 Levantar el servidor
app.listen(port, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${port}`);
});