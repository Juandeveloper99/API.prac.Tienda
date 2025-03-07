import {
  listarTodosproductosQuery,
  listarproductosPorIdQuery,
  crearproductosQuery,
  actualizarproductosQuery,
  eliminarproductosQuery
} from "../../db/productos/productosQueries.js";

/**
 * Obtener todos los productos de la base de datos
 */
const listarTodosproductos = async (req, res) => {
  // Un bloque try-catch  sirve para validar si la peticion se obtiene o se devuelve un error
  // Try -> intentar
  // Catch -> capturar el error
  try {
    //  Ejecutar la consulta en la base de datos
    const productos = await listarTodosproductosQuery();
    res.json(productos);
  } catch (error) {
    res.status(500).send(error);
  }
};

/**
 * Obtener el productos con el ID especificado en la query / url
 * @param {*} req 
 * @param {*} res 
 */

const listarproductosPorId = async (req, res) => { 
  try {
    //  Ejecutar la consulta en la base de datos
    const productos = await listarproductosPorIdQuery(req.params.id);
    res.json(productos);
  } catch (error) {
    res.status(500).send(error);
  }
};

/**
 * Crear un productos
 */
const crearproductos = async (req, res) => {
  console.log(req.body)
  try {
      const datosproductos = req.body;
      const resultado = await crearproductosQuery(datosproductos);
      res.json({ mensaje: 'productos creado con éxito', id: resultado.insertId });
  } catch (error) {
      res.status(500).send(error);
  }
};

/**
 * Actualizar los datos de un productos
 */
const actualizarproductos = async (req, res) => {
  try {
      const id = req.params.id;
      const datosproductos = req.body;
      const resultado = await actualizarproductosQuery(id, datosproductos);
      if (resultado.affectedRows > 0) {
          res.json({ mensaje: 'productos actualizado con éxito', id: id });
      } else {
          res.status(404).json({ mensaje: 'productos no encontrado' });
      }
  } catch (error) {
      res.status(500).send(error);
  }
};

/**
 * Eliminar un productos
 */
const eliminarproductos = async (req, res) => {
  try {
      const id = req.params.id;
      const resultado = await eliminarproductosQuery(id);
      if (resultado.affectedRows > 0) {
          res.json({ mensaje: 'productos eliminado con éxito' });
      } else {
          res.status(404).json({ mensaje: 'productos no encontrado' });
      }
  } catch (error) {
      res.status(500).json({ mensaje: 'Error al eliminar el productos', error: error.message });
  }
};

export {
  listarTodosproductos,
  listarproductosPorId,
  crearproductos,
  actualizarproductos,
  eliminarproductos,
};
