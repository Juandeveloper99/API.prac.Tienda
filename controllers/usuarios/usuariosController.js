import {
    listarTodosusuariosQuery,
    listarusuariosPorIdQuery,
    crearusuariosQuery,
    actualizarusuariosQuery,
    eliminarusuariosQuery
  } from "../../db/usuarios/usuariosQueries.js";
  
  /**
   * Obtener todos los usuarios de la base de datos
   */
  const listarTodosusuarios = async (req, res) => {
    // Un bloque try-catch  sirve para validar si la peticion se obtiene o se devuelve un error
    // Try -> intentar
    // Catch -> capturar el error
    try {
      //  Ejecutar la consulta en la base de datos
      const usuarios = await listarTodosusuariosQuery();
      res.json(usuarios);
    } catch (error) {
      res.status(500).send(error);
    }
  };
  
  /**
   * Obtener el usuarios con el ID especificado en la query / url
   * @param {*} req 
   * @param {*} res 
   */
  
  const listarusuariosPorId = async (req, res) => { 
    try {
      //  Ejecutar la consulta en la base de datos
      const usuarios = await listarusuariosPorIdQuery(req.params.id);
      res.json(usuarios);
    } catch (error) {
      res.status(500).send(error);
    }
  };
  
  /**
   * Crear un usuarios
   */
  const crearusuarios = async (req, res) => {
    console.log(req.body)
    try {
        const datosusuarios = req.body;
        const resultado = await crearusuariosQuery(datosusuarios);
        res.json({ mensaje: 'usuarios creado con éxito', id: resultado.insertId });
    } catch (error) {
        res.status(500).send(error);
    }
  };
  
  /**
   * Actualizar los datos de un usuarios
   */
  const actualizarusuarios = async (req, res) => {
    try {
        const id = req.params.id;
        const datosusuarios = req.body;
        const resultado = await actualizarusuariosQuery(id, datosusuarios);
        if (resultado.affectedRows > 0) {
            res.json({ mensaje: 'usuarios actualizado con éxito', id: id });
        } else {
            res.status(404).json({ mensaje: 'usuarios no encontrado' });
        }
    } catch (error) {
        res.status(500).send(error);
    }
  };
  
  /**
   * Eliminar un usuarios
   */
  const eliminarusuarios = async (req, res) => {
    try {
        const id = req.params.id;
        const resultado = await eliminarusuariosQuery(id);
        if (resultado.affectedRows > 0) {
            res.json({ mensaje: 'usuarios eliminado con éxito' });
        } else {
            res.status(404).json({ mensaje: 'usuarios no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al eliminar el usuarios', error: error.message });
    }
  };
  
  export {
    listarTodosusuarios,
    listarusuariosPorId,
    crearusuarios,
    actualizarusuarios,
    eliminarusuarios,
  };
  