import {
    listarTodosclientesQuery,
    listarclientesPorIdQuery,
    crearclientesQuery,
    actualizarclientesQuery,
    eliminarclientesQuery
  } from "../../db/clientes/clientesQueries.js";
  
  /**
   * Obtener todos los clientes de la base de datos
   */
  const listarTodosclientes = async (req, res) => {
    // Un bloque try-catch  sirve para validar si la peticion se obtiene o se devuelve un error
    // Try -> intentar
    // Catch -> capturar el error
    try {
      //  Ejecutar la consulta en la base de datos
      const clientes = await listarTodosclientesQuery();
      res.json(clientes);
    } catch (error) {
      res.status(500).send(error);
    }
  };
  
  /**
   * Obtener el clientes con el ID especificado en la query / url
   * @param {*} req 
   * @param {*} res 
   */
  
  const listarclientesPorId = async (req, res) => { 
    try {
      //  Ejecutar la consulta en la base de datos
      const clientes = await listarclientesPorIdQuery(req.params.id);
      res.json(clientes);
    } catch (error) {
      res.status(500).send(error);
    }
  };
  
  /**
   * Crear un clientes
   */
  const crearclientes = async (req, res) => {
    console.log(req.body)
    try {
        const datosclientes = req.body;
        const resultado = await crearclientesQuery(datosclientes);
        res.json({ mensaje: 'clientes creado con éxito', id: resultado.insertId });
    } catch (error) {
        res.status(500).send(error);
    }
  };
  
  /**
   * Actualizar los datos de un clientes
   */
  const actualizarclientes = async (req, res) => {
    try {
        const id = req.params.id;
        const datosclientes = req.body;
        const resultado = await actualizarclientesQuery(id, datosclientes);
        if (resultado.affectedRows > 0) {
            res.json({ mensaje: 'clientes actualizado con éxito', id: id });
        } else {
            res.status(404).json({ mensaje: 'clientes no encontrado' });
        }
    } catch (error) {
        res.status(500).send(error);
    }
  };
  
  /**
   * Eliminar un clientes
   */
  const eliminarclientes = async (req, res) => {
    try {
        const id = req.params.id;
        const resultado = await eliminarclientesQuery(id);
        if (resultado.affectedRows > 0) {
            res.json({ mensaje: 'clientes eliminado con éxito' });
        } else {
            res.status(404).json({ mensaje: 'clientes no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al eliminar el clientes', error: error.message });
    }
  };
  
  export {
    listarTodosclientes,
    listarclientesPorId,
    crearclientes,
    actualizarclientes,
    eliminarclientes,
  };
  