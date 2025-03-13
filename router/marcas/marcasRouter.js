import { Router } from 'express';

import {
    listarTodosmarcas,
    listarmarcasPorId,
    crearmarcas,
    actualizarmarcas,
    eliminarmarcas
} from '../../controllers/marcas/marcasController.js';

const marcasRouter = Router();



marcasRouter.get('/', listarTodosmarcas);
marcasRouter.get('/:id', listarmarcasPorId);

marcasRouter.post('/', crearmarcas);
marcasRouter.put('/:id', actualizarmarcas);
marcasRouter.delete('/:id', eliminarmarcas);

export default marcasRouter;
