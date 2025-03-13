import {
    listarTodosmarcasQuery,
    listarmarcasPorIdQuery,
    crearmarcasQuery,
    actualizarmarcasQuery,
    eliminarmarcasQuery
  } from "../../db/marcas/marcasQueries.js";
  
  /**
   * Obtener todos los marcas de la base de datos
   */
  const listarTodosmarcas = async (req, res) => {
    // Un bloque try-catch  sirve para validar si la peticion se obtiene o se devuelve un error
    // Try -> intentar
    // Catch -> capturar el error
    try {
      //  Ejecutar la consulta en la base de datos
      const marcas = await listarTodosmarcasQuery();
      res.json(marcas);
    } catch (error) {
      res.status(500).send(error);
    }
  };
  
  /**
   * Obtener el marcas con el ID especificado en la query / url
   * @param {*} req 
   * @param {*} res 
   */
  
  const listarmarcasPorId = async (req, res) => { 
    try {
      //  Ejecutar la consulta en la base de datos
      const marcas = await listarmarcasPorIdQuery(req.params.id);
      res.json(marcas);
    } catch (error) {
      res.status(500).send(error);
    }
  };
  
  /**
   * Crear un marcas
   */
  const crearmarcas = async (req, res) => {
    console.log(req.body)
    try {
        const datosmarcas = req.body;
        const resultado = await crearmarcasQuery(datosmarcas);
        res.json({ mensaje: 'marcas creado con éxito', id: resultado.insertId });
    } catch (error) {
        res.status(500).send(error);
    }
  };
  
  /**
   * Actualizar los datos de un marcas
   */
  const actualizarmarcas = async (req, res) => {
    try {
        const id = req.params.id;
        const datosmarcas = req.body;
        const resultado = await actualizarmarcasQuery(id, datosmarcas);
        if (resultado.affectedRows > 0) {
            res.json({ mensaje: 'marcas actualizado con éxito', id: id });
        } else {
            res.status(404).json({ mensaje: 'marcas no encontrado' });
        }
    } catch (error) {
        res.status(500).send(error);
    }
  };
  
  /**
   * Eliminar un marcas
   */
  const eliminarmarcas = async (req, res) => {
    try {
        const id = req.params.id;
        const resultado = await eliminarmarcasQuery(id);
        if (resultado.affectedRows > 0) {
            res.json({ mensaje: 'marcas eliminado con éxito' });
        } else {
            res.status(404).json({ mensaje: 'marcas no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al eliminar el marcas', error: error.message });
    }
  };
  
  export {
    listarTodosmarcas,
    listarmarcasPorId,
    crearmarcas,
    actualizarmarcas,
    eliminarmarcas,
  };
  