import { Router } from 'express';

import {
    listarTodosproductos,
    listarproductosPorId,
    crearproductos,
    actualizarproductos,
    eliminarproductos
} from '../../controllers/productos/productosController.js';

const productosRouter = Router();



productosRouter.get('/', listarTodosproductos);
productosRouter.get('/:id', listarproductosPorId);

productosRouter.post('/', crearproductos);
productosRouter.put('/:id', actualizarproductos);
productosRouter.delete('/:id', eliminarproductos);

export default productosRouter;
