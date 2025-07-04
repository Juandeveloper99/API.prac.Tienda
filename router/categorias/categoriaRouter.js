import { Router } from 'express';

import {
    listartodoscategorias,
    listarcategoriasPorId,
    crearcategorias,
    actualizarcategorias,
    eliminarcategorias
} from '../../controllers/categorias/categoriasController.js';

const categoriasRouter = Router();



categoriasRouter.get('/', listartodoscategorias);
categoriasRouter.get('/:id', listarcategoriasPorId);

categoriasRouter.post('/', crearcategorias);
categoriasRouter.put('/:id', actualizarcategorias);
categoriasRouter.delete('/:id', eliminarcategorias);

export default categoriasRouter;
