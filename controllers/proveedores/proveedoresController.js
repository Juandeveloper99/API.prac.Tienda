import {
    listarTodosproveedoresQuery,
    listarproveedoresPorIdQuery,
    crearproveedoresQuery,
    actualizarproveedoresQuery,
    eliminarproveedoresQuery
  } from "../../db/proveedores/proveedoresQueries.js";
  
  /**
   * Obtener todos los proveedores de la base de datos
   */
  const listarTodosproveedores = async (req, res) => {
    // Un bloque try-catch  sirve para validar si la peticion se obtiene o se devuelve un error
    // Try -> intentar
    // Catch -> capturar el error
    try {
      //  Ejecutar la consulta en la base de datos
      const proveedores = await listarTodosproveedoresQuery();
      res.json(proveedores);
    } catch (error) {
      res.status(500).send(error);
    }
  };
  
  /**
   * Obtener el proveedores con el ID especificado en la query / url
   * @param {*} req 
   * @param {*} res 
   */
  
  const listarproveedoresPorId = async (req, res) => { 
    try {
      //  Ejecutar la consulta en la base de datos
      const proveedores = await listarproveedoresPorIdQuery(req.params.id);
      res.json(proveedores);
    } catch (error) {
      res.status(500).send(error);
    }
  };
  
  /**
   * Crear un proveedores
   */
  const crearproveedores = async (req, res) => {
    console.log(req.body)
    try {
        const datosproveedores = req.body;
        const resultado = await crearproveedoresQuery(datosproveedores);
        res.json({ mensaje: 'proveedores creado con éxito', id: resultado.insertId });
    } catch (error) {
        res.status(500).send(error);
    }
  };
  
  /**
   * Actualizar los datos de un proveedores
   */
  const actualizarproveedores = async (req, res) => {
    try {
        const id = req.params.id;
        const datosproveedores = req.body;
        const resultado = await actualizarproveedoresQuery(id, datosproveedores);
        if (resultado.affectedRows > 0) {
            res.json({ mensaje: 'proveedores actualizado con éxito', id: id });
        } else {
            res.status(404).json({ mensaje: 'proveedores no encontrado' });
        }
    } catch (error) {
        res.status(500).send(error);
    }
  };
  
  /**
   * Eliminar un proveedores
   */
  const eliminarproveedores = async (req, res) => {
    try {
        const id = req.params.id;
        const resultado = await eliminarproveedoresQuery(id);
        if (resultado.affectedRows > 0) {
            res.json({ mensaje: 'proveedores eliminado con éxito' });
        } else {
            res.status(404).json({ mensaje: 'proveedores no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al eliminar el proveedores', error: error.message });
    }
  };
  
  export {
    listarTodosproveedores,
    listarproveedoresPorId,
    crearproveedores,
    actualizarproveedores,
    eliminarproveedores,
  };
  