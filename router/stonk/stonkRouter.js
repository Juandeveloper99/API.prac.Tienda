import { Router } from 'express';

import {
    listarTodosstonk,
    listarstonkPorId,
    crearstonk,
    actualizarstonk,
    eliminarstonk
} from '../../controllers/stonk/stonkController.js';

const stonkRouter = Router();



stonkRouter.get('/', listarTodosstonk);
stonkRouter.get('/:id', listarstonkPorId);

stonkRouter.post('/', crearstonk);
stonkRouter.put('/:id', actualizarstonk);
stonkRouter.delete('/:id', eliminarstonk);

export default stonkRouter;
