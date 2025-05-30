import { Router } from 'express';

import {
    listarTodosproductos,
    listarproductosPorId,
    crearproductos,
    actualizarproductos,
    eliminarproductos,
    actualizarStock 
} from '../../controllers/productos/productosController.js';

const productosRouter = Router();



productosRouter.get('/', listarTodosproductos);
productosRouter.get('/:id', listarproductosPorId);

productosRouter.post('/', crearproductos);
productosRouter.put('/:id', actualizarproductos);
productosRouter.delete('/:id', eliminarproductos);
productosRouter.put('/:id/stock', actualizarStock);



export default productosRouter;