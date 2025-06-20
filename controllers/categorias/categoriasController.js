import {
    listartodascategoriasQuery,
    listarcategoriasPorIdQuery,
    crearcategoriasQuery,
    actualizarcategoriasQuery,
    eliminarcategoriasQuery
  } from "../../db/categorias/categoriasQueries.js"
  /**
   * Obtener todos los categorias de la base de datos
   */
  const listartodoscategorias = async (req, res) => {
    // Un bloque try-catch  sirve para validar si la peticion se obtiene o se devuelve un error
    // Try -> intentar
    // Catch -> capturar el error
    try {
      //  Ejecutar la consulta en la base de datos
      const categorias = await listartodascategoriasQuery();
      res.json(categorias);
    } catch (error) {
      res.status(500).send(error);
    }
  };
  
  /**
   * Obtener el categorias con el ID especificado en la query / url
   * @param {*} req 
   * @param {*} res 
   */
  
  const listarcategoriasPorId = async (req, res) => { 
    try {
      //  Ejecutar la consulta en la base de datos
      const categorias = await listarcategoriasPorIdQuery(req.params.id);
      res.json(categorias);
    } catch (error) {
      res.status(500).send(error);
    }
  };
  
  /**
   * Crear un categorias
   */
  const crearcategorias = async (req, res) => {
    console.log(req.body)
    try {
        const datoscategorias = req.body;
        const resultado = await crearcategoriasQuery(datoscategorias);
        res.json({ mensaje: 'categorias creado con éxito', id: resultado.insertId });
    } catch (error) {
        res.status(500).send(error);
    }
  };
  
  /**
   * Actualizar los datos de un categorias
   */
  const actualizarcategorias = async (req, res) => {
    try {
        const id = req.params.id;
        const datoscategorias = req.body;
        const resultado = await actualizarcategoriasQuery(id, datoscategorias);
        if (resultado.affectedRows > 0) {
            res.json({ mensaje: 'categorias actualizado con éxito', id: id });
        } else {
            res.status(404).json({ mensaje: 'categorias no encontrado' });
        }
    } catch (error) {
        res.status(500).send(error);
    }
  };
  
  /**
   * Eliminar un categorias
   */
  const eliminarcategorias = async (req, res) => {
    try {
        const id = req.params.id;
        const resultado = await eliminarcategoriasQuery(id);
        if (resultado.affectedRows > 0) {
            res.json({ mensaje: 'categorias eliminado con éxito' });
        } else {
            res.status(404).json({ mensaje: 'categorias no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al eliminar el categorias', error: error.message });
    }
  };
  
  export {
    listartodoscategorias,
    listarcategoriasPorId,
    crearcategorias,
    actualizarcategorias,
    eliminarcategorias,
  };
  