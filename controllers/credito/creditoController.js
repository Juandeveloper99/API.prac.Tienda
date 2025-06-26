import {
    listarTodoscreditoQuery,
    listarcreditoPorIdQuery,
    crearcreditoQuery,
    actualizarcreditoQuery,
    eliminarcreditoQuery
  } from "../../db/credito/creditoQueries.js";
  
  /**
   * Obtener todos los credito de la base de datos
   */
  const listarTodoscredito = async (req, res) => {
    // Un bloque try-catch  sirve para validar si la peticion se obtiene o se devuelve un error
    // Try -> intentar
    // Catch -> capturar el error
    try {
      //  Ejecutar la consulta en la base de datos
      const credito = await listarTodoscreditoQuery();
      res.json(credito);
    } catch (error) {
      res.status(500).send(error);
    }
  };
  
  /**
   * Obtener el credito con el ID especificado en la query / url
   * @param {*} req 
   * @param {*} res 
   */
  
  const listarcreditoPorId = async (req, res) => { 
    try {
      //  Ejecutar la consulta en la base de datos
      const credito = await listarcreditoPorIdQuery(req.params.id);
      res.json(credito);
    } catch (error) {
      res.status(500).send(error);
    }
  };
  
  /**
   * Crear un credito
   */
  const crearcredito = async (req, res) => {
    console.log(req.body)
    try {
        const datoscredito = req.body;
        const resultado = await crearcreditoQuery(datoscredito);
        res.json({ mensaje: 'credito creado con éxito', id: resultado.insertId });
    } catch (error) {
        res.status(500).send(error);
    }
  };
  
  /**
   * Actualizar los datos de un credito
   */
  const actualizarcredito = async (req, res) => {
    try {
        const id = req.params.id;
        const datoscredito = req.body;
        const resultado = await actualizarcreditoQuery(id, datoscredito);
        if (resultado.affectedRows > 0) {
            res.json({ mensaje: 'credito actualizado con éxito', id: id });
        } else {
            res.status(404).json({ mensaje: 'credito no encontrado' });
        }
    } catch (error) {
        res.status(500).send(error);
    }
  };
  
  /**
   * Eliminar un credito
   */
  const eliminarcredito = async (req, res) => {
    try {
        const id = req.params.id;
        const resultado = await eliminarcreditoQuery(id);
        if (resultado.affectedRows > 0) {
            res.json({ mensaje: 'credito eliminado con éxito' });
        } else {
            res.status(404).json({ mensaje: 'credito no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al eliminar el credito', error: error.message });
    }
  };
  
  export {
    listarTodoscredito,
    listarcreditoPorId,
    crearcredito,
    actualizarcredito,
    eliminarcredito,
  };
  