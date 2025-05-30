import {
  listarTodosproductosQuery,
  listarproductosPorIdQuery,
  crearproductosQuery,
  actualizarproductosQuery,
  eliminarproductosQuery,
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


// En tu routes/productos.js
const actualizarStock = async (req, res) => {
  const { id } = req.params;
  const { stock } = req.body;

  // 1. Validaciones mejoradas
  const validationErrors = [];
  
  if (!id || !Number.isInteger(Number(id)) || Number(id) <= 0) {
    validationErrors.push('ID de producto debe ser un entero positivo');
  }

  if (stock === undefined || !Number.isFinite(Number(stock)) || Number(stock) < 0) {
    validationErrors.push('Stock debe ser un número positivo');
  }

  if (validationErrors.length > 0) {
    return res.status(400).json({
      success: false,
      errors: validationErrors,
      timestamp: new Date().toISOString()
    });
  }

  // 2. Manejo de transacciones y lógica mejorada
  try {
    // 2.1. Verificar existencia del producto primero
    const productoExistente = await verificarExistenciaProductoQuery(id);
    if (!productoExistente) {
      return res.status(404).json({
        success: false,
        error: 'Producto no encontrado',
        productId: id,
        suggestion: 'Verifique el ID del producto'
      });
    }

    // 2.2. Actualizar stock
    const resultado = await actualizarStockQuery(id, stock);
    
    // 2.3. Validar resultado
    if (resultado.affectedRows === 0) {
      console.warn(`Actualización de stock no afectó filas para producto ID: ${id}`);
      return res.status(409).json({
        success: false,
        error: 'No se pudo actualizar el stock',
        reason: 'Ninguna fila fue afectada'
      });
    }

    // 2.4. Registrar la transacción
    await registrarMovimientoStock({
      productoId: id,
      cantidad: stock - productoExistente.stock,
      tipo: 'AJUSTE',
      usuario: req.user?.id || 'sistema'
    });

    // 3. Respuesta exitosa estructurada
    return res.json({
      success: true,
      data: {
        id_producto: id,
        stock_anterior: productoExistente.stock,
        nuevo_stock: stock,
        diferencia: stock - productoExistente.stock
      },
      metadata: {
        timestamp: new Date().toISOString(),
        operation: 'updateStock'
      }
    });

  } catch (error) {
    // 4. Manejo de errores mejorado
    console.error(`Error al actualizar stock para producto ${id}:`, {
      error: error.message,
      stack: error.stack,
      requestBody: req.body,
      params: req.params
    });

    const statusCode = error.code === 'ER_DUP_ENTRY' ? 409 : 500;
    
    return res.status(statusCode).json({
      success: false,
      error: 'Error al actualizar stock',
      details: process.env.NODE_ENV === 'development' ? {
        message: error.message,
        code: error.code,
        stack: error.stack
      } : undefined,
      requestId: req.requestId
    });
  }
};


export {
  listarTodosproductos,
  listarproductosPorId,
  crearproductos,
  actualizarproductos,
  eliminarproductos,
  actualizarStock
};