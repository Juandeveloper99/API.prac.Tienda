import { Router } from 'express';

import {
    listarTodoscompras,
    listarcomprasPorId,
    crearcompras,
    actualizarcompras,
    eliminarcompras
} from '../../controllers/compras/comprasController.js';

const comprasRouter = Router();



comprasRouter.get('/', listarTodoscompras);
comprasRouter.get('/:id', listarcomprasPorId);

comprasRouter.post('/', crearcompras);
comprasRouter.put('/:id', actualizarcompras);
comprasRouter.delete('/:id', eliminarcompras);

export default comprasRouter;
