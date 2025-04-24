import {
    listarTodosfacturacionQuery,
    listarfacturacionPorIdQuery,
    crearfacturacionQuery,
    actualizarfacturacionQuery,
    eliminarfacturacionQuery
  } from "../../db/facturacion/facturacionQueries.js";
  
  /**
   * Obtener todos los facturacion de la base de datos
   */
  const listarTodosfacturacion = async (req, res) => {
    // Un bloque try-catch  sirve para validar si la peticion se obtiene o se devuelve un error
    // Try -> intentar
    // Catch -> capturar el error
    try {
      //  Ejecutar la consulta en la base de datos
      const facturacion = await listarTodosfacturacionQuery();
      res.json(facturacion);
    } catch (error) {
      res.status(500).send(error);
    }
  };
  
  /**
   * Obtener el facturacion con el ID especificado en la query / url
   * @param {*} req 
   * @param {*} res 
   */
  
  const listarfacturacionPorId = async (req, res) => { 
    try {
      //  Ejecutar la consulta en la base de datos
      const facturacion = await listarfacturacionPorIdQuery(req.params.id);
      res.json(facturacion);
    } catch (error) {
      res.status(500).send(error);
    }
  };
  
  /**
   * Crear un facturacion
   */
  const crearfacturacion = async (req, res) => {
    console.log(req.body)
    try {
        const datosfacturacion = req.body;
        const resultado = await crearfacturacionQuery(datosfacturacion);
        res.json({ mensaje: 'facturacion creado con éxito', id: resultado.insertId });
    } catch (error) {
        res.status(500).send(error);
    }
  };
  
  /**
   * Actualizar los datos de un facturacion
   */
  const actualizarfacturacion = async (req, res) => {
    try {
        const id = req.params.id;
        const datosfacturacion = req.body;
        const resultado = await actualizarfacturacionQuery(id, datosfacturacion);
        if (resultado.affectedRows > 0) {
            res.json({ mensaje: 'facturacion actualizado con éxito', id: id });
        } else {
            res.status(404).json({ mensaje: 'facturacion no encontrado' });
        }
    } catch (error) {
        res.status(500).send(error);
    }
  };
  
  /**
   * Eliminar un facturacion
   */
  const eliminarfacturacion = async (req, res) => {
    try {
        const id = req.params.id;
        const resultado = await eliminarfacturacionQuery(id);
        if (resultado.affectedRows > 0) {
            res.json({ mensaje: 'facturacion eliminado con éxito' });
        } else {
            res.status(404).json({ mensaje: 'facturacion no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al eliminar el facturacion', error: error.message });
    }
  };
  
  export {
    listarTodosfacturacion,
    listarfacturacionPorId,
    crearfacturacion,
    actualizarfacturacion,
    eliminarfacturacion,
  };
  