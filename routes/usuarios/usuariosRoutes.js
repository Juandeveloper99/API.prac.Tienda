import { Router } from 'express';

import {
    listarTodosusuarios,
    listarusuariosPorId,
    crearusuarios,
    actualizarusuarios,
    eliminarusuarios
} from '../../controllers/usuarios/usuariosController.js';

const usuariosRouter = Router();



usuariosRouter.get('/', listarTodosusuarios);
usuariosRouter.get('/:id', listarusuariosPorId);

usuariosRouter.post('/', crearusuarios);
usuariosRouter.put('/:id', actualizarusuarios);
usuariosRouter.delete('/:id', eliminarusuarios);

export default usuariosRouter;
