import { Router } from 'express';

import {
    listarTodosfacturacion,
    listarfacturacionPorId,
    crearfacturacion,
    actualizarfacturacion,
    eliminarfacturacion
} from '../../controllers/facturacion/facturacionController.js';

const facturacionRouter = Router();



facturacionRouter.get('/', listarTodosfacturacion);
facturacionRouter.get('/:id', listarfacturacionPorId);

facturacionRouter.post('/', crearfacturacion);
facturacionRouter.put('/:id', actualizarfacturacion);
facturacionRouter.delete('/:id', eliminarfacturacion);

export default facturacionRouter;
