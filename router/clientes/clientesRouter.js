import { Router } from 'express';

import {
    listarTodosclientes,
    listarclientesPorId,
    crearclientes,
    actualizarclientes,
    eliminarclientes
} from '../../controllers/clientes/clientesController.js';

const clientesRouter = Router();



clientesRouter.get('/', listarTodosclientes);
clientesRouter.get('/:id', listarclientesPorId);

clientesRouter.post('/', crearclientes);
clientesRouter.put('/:id', actualizarclientes);
clientesRouter.delete('/:id', eliminarclientes);

export default clientesRouter;
