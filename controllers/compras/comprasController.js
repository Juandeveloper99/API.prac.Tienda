import {
    listarTodoscomprasQuery,
    listarcomprasPorIdQuery,
    crearcomprasQuery,
    actualizarcomprasQuery,
    eliminarcomprasQuery
  } from "../../db/compras/comprasQueries.js";
  
  /**
   * Obtener todos los compras de la base de datos
   */
  const listarTodoscompras = async (req, res) => {
    // Un bloque try-catch  sirve para validar si la peticion se obtiene o se devuelve un error
    // Try -> intentar
    // Catch -> capturar el error
    try {
      //  Ejecutar la consulta en la base de datos
      const compras = await listarTodoscomprasQuery();
      res.json(compras);
    } catch (error) {
      res.status(500).send(error);
    }
  };
  
  /**
   * Obtener el compras con el ID especificado en la query / url
   * @param {*} req 
   * @param {*} res 
   */
  
  const listarcomprasPorId = async (req, res) => { 
    try {
      //  Ejecutar la consulta en la base de datos
      const compras = await listarcomprasPorIdQuery(req.params.id);
      res.json(compras);
    } catch (error) {
      res.status(500).send(error);
    }
  };
  
  /**
   * Crear un compras
   */
  const crearcompras = async (req, res) => {
    console.log(req.body)
    try {
        const datoscompras = req.body;
        const resultado = await crearcomprasQuery(datoscompras);
        res.json({ mensaje: 'compras creado con éxito', id: resultado.insertId });
    } catch (error) {
        res.status(500).send(error);
    }
  };
  
  /**
   * Actualizar los datos de un compras
   */
  const actualizarcompras = async (req, res) => {
    try {
        const id = req.params.id;
        const datoscompras = req.body;
        const resultado = await actualizarcomprasQuery(id, datoscompras);
        if (resultado.affectedRows > 0) {
            res.json({ mensaje: 'compras actualizado con éxito', id: id });
        } else {
            res.status(404).json({ mensaje: 'compras no encontrado' });
        }
    } catch (error) {
        res.status(500).send(error);
    }
  };
  
  /**
   * Eliminar un compras
   */
  const eliminarcompras = async (req, res) => {
    try {
        const id = req.params.id;
        const resultado = await eliminarcomprasQuery(id);
        if (resultado.affectedRows > 0) {
            res.json({ mensaje: 'compras eliminado con éxito' });
        } else {
            res.status(404).json({ mensaje: 'compras no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al eliminar el compras', error: error.message });
    }
  };
  
  export {
    listarTodoscompras,
    listarcomprasPorId,
    crearcompras,
    actualizarcompras,
    eliminarcompras,
  };
  