import config from '../../config.js';


// Helper function to handle query results
const respuesta = (err, result, resolve, reject) => {
    if (err) {
        console.log(err);
        reject(err);
    } else {
        resolve(result);
    }
};
/**
 * Carga la lista de compras
 */
const listarTodoscomprasQuery = () => {
    // Una promesa es una forma de que siempre se devuelva un resultado al quien llama (sea error o éxito)
    // Si la consulta no genera error, entonces resuelve/cumple la promesa con el resultado
    // Si hay algun error entonces rechaza la consulta e informa la razón 
    return new Promise((resolve, reject) => {
        config.query('SELECT * FROM compras', (err, filas) => {
            respuesta(err, filas, resolve, reject);
        });
    });
};

/**
 * Buscar un libro por su ID (llave primaria)
 */
const listarcomprasPorIdQuery = (id) => {
    return new Promise((resolve, reject) => {
        config.query('SELECT * FROM compras WHERE id_compra = ? LIMIT 1', [id], (err, filas) => {
            respuesta(err, filas, resolve, reject);
        });
    });
};


/**
 * Guardar un nuevo libro
 */
const crearcomprasQuery = async (compras) => {
    const { id_compra, proveedor_id, fecha_compra, total} = compras;
    return new Promise((resolve, reject) => {
        const sql = 'INSERT INTO compras (id_compra, proveedor_id, fecha_compra, total) VALUES (?, ?, ?, ?)';
        config.query(sql, [id_compra, proveedor_id, fecha_compra, total], (err, resultado) => {
            respuesta(err, resultado, resolve, reject);
        });
    });
};

/**
 * Actualizar un libro por su ID
 */
const actualizarcomprasQuery = (id, compras) => {
    const { id_compra, proveedor_id, fecha_compra, total} = compras;
    return new Promise((resolve, reject) => {
        const sql = 'UPDATE compras SET id_compra = ?, proveedor_id = ?, fecha_compra = ?, total = ? WHERE id_compras = ?';
        config.query(sql, [id_compras, nombre, descripcion, precio, stock, categoria_id, marca_id], (err, resultado) => {
            respuesta(err, resultado, resolve, reject);
        });
    });
};

/**
 * Eliminar un libro por su ID
 */
const eliminarcomprasQuery = (id) => {
    return new Promise((resolve, reject) => {
        const sql = 'DELETE FROM compras WHERE id_compra = ?';
        config.query(sql, [id], (err, resultado) => {
            respuesta(err, resultado, resolve, reject);
        });
    });
};

// Exportar todas las funciones definidas en este archivo
export {
    listarTodoscomprasQuery,
    listarcomprasPorIdQuery,
    crearcomprasQuery,
    actualizarcomprasQuery,
    eliminarcomprasQuery   
}
