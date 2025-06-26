import { Router } from 'express';

import {
    listarTodoscredito,
    listarcreditoPorId,
    crearcredito,
    actualizarcredito,
    eliminarcredito
} from '../../controllers/credito/creditoController.js';

const creditoRouter = Router();



creditoRouter.get('/', listarTodoscredito);
creditoRouter.get('/:id', listarcreditoPorId);
creditoRouter.post('/', crearcredito);
creditoRouter.put('/:id', actualizarcredito);
creditoRouter.delete('/:id', eliminarcredito);

export default creditoRouter;
