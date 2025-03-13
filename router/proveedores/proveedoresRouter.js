import { Router } from 'express';

import {
    listarTodosproveedores,
    listarproveedoresPorId,
    crearproveedores,
    actualizarproveedores,
    eliminarproveedores
} from '../../controllers/proveedores/proveedoresController.js';

const proveedoresRouter = Router();



proveedoresRouter.get('/', listarTodosproveedores);
proveedoresRouter.get('/:id', listarproveedoresPorId);

proveedoresRouter.post('/', crearproveedores);
proveedoresRouter.put('/:id', actualizarproveedores);
proveedoresRouter.delete('/:id', eliminarproveedores);

export default proveedoresRouter;
