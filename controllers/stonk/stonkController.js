import {
    listarTodosstonkQuery,
    listarstonkPorIdQuery,
    crearstonkQuery,
    actualizarstonkQuery,
    eliminarstonkQuery
  } from "../../db/stonk/stonkQueries.js"
  /**
   * Obtener todos los stonkde la base de datos
   */
  const listarTodosstonk= async (req, res) => {
    // Un bloque try-catch  sirve para validar si la peticion se obtiene o se devuelve un error
    // Try -> intentar
    // Catch -> capturar el error
    try {
      //  Ejecutar la consulta en la base de datos
      const stonk= await listarTodosstonkQuery();
      res.json(stonk);
    } catch (error) {
      res.status(500).send(error);
    }
  };
  
  /**
   * Obtener el stonkcon el ID especificado en la query / url
   * @param {*} req 
   * @param {*} res 
   */
  
  const listarstonkPorId = async (req, res) => { 
    try {
      //  Ejecutar la consulta en la base de datos
      const stonk= await listarstonkPorIdQuery(req.params.id);
      res.json(stonk);
    } catch (error) {
      res.status(500).send(error);
    }
  };
  
  /**
   * Crear un stonk
   */
  const crearstonk= async (req, res) => {
    console.log(req.body)
    try {
        const datosstonk= req.body;
        const resultado = await crearstonkQuery(datosstonk);
        res.json({ mensaje: 'stonkcreado con éxito', id: resultado.insertId });
    } catch (error) {
        res.status(500).send(error);
    }
  };
  
  /**
   * Actualizar los datos de un stonk
   */
  const actualizarstonk= async (req, res) => {
    try {
        const id = req.params.id;
        const datosstonk= req.body;
        const resultado = await actualizarstonkQuery(id, datosstonk);
        if (resultado.affectedRows > 0) {
            res.json({ mensaje: 'stonkactualizado con éxito', id: id });
        } else {
            res.status(404).json({ mensaje: 'stonkno encontrado' });
        }
    } catch (error) {
        res.status(500).send(error);
    }
  };
  
  /**
   * Eliminar un stonk
   */
  const eliminarstonk= async (req, res) => {
    try {
        const id = req.params.id;
        const resultado = await eliminarstonkQuery(id);
        if (resultado.affectedRows > 0) {
            res.json({ mensaje: 'stonke liminado con éxito' });
        } else {
            res.status(404).json({ mensaje: 'stonk no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al eliminar el stonk', error: error.message });
    }
  };
  
  export {
    listarTodosstonk,
    listarstonkPorId,
    crearstonk,
    actualizarstonk,
    eliminarstonk,
  };
  