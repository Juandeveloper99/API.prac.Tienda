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
 * Carga la lista de stonk
 */
const listarTodosstonkQuery = () => {
    // Una promesa es una forma de que siempre se devuelva un resultado al quien llama (sea error o éxito)
    // Si la consulta no genera error, entonces resuelve/cumple la promesa con el resultado
    // Si hay algun error entonces rechaza la consulta e informa la razón 
    return new Promise((resolve, reject) => {
        config.query('SELECT * FROM movimientos_stock', (err, filas) => {
            respuesta(err, filas, resolve, reject);
        });
    });
};

/**
 * Buscar un libro por su ID (llave primaria)
 */
const listarstonkPorIdQuery = (id) => {
    return new Promise((resolve, reject) => {
        config.query('SELECT * FROM movimientos_stock WHERE id_movimiento = ? LIMIT 1', [id], (err, filas) => {
            respuesta(err, filas, resolve, reject);
        });
    });
};


/**
 * Guardar un nuevo libro
 */
const crearstonkQuery = async (stonk) => {
    const { id_movimiento, producto_id, tipo, cantidad, fecha, detalle} = stonk;
    return new Promise((resolve, reject) => {
        const sql = 'INSERT INTO movimientos_stock (id_movimiento, producto_id, tipo, cantidad, fecha, detalle) VALUES (?, ?, ?, ?, ?, ?)';
        config.query(sql, [id_movimiento, producto_id, tipo, cantidad, fecha, detalle], (err, resultado) => {
            respuesta(err, resultado, resolve, reject);
        });
    });
};

/**
 * Actualizar un libro por su ID
 */
const actualizarstonkQuery = (id, stonk) => {
    const { id_movimiento, producto_id, tipo, cantidad, fecha, detalle} = stonk;
    return new Promise((resolve, reject) => {
        const sql = 'UPDATE movimientos_stock SET id_movimiento = ?, producto_id = ?, tipo = ?, cantidad = ?, fecha = ?, detalle = ? WHERE id_stonk = ?';
        config.query(sql, [id_movimiento, producto_id, tipo, cantidad, fecha, detalle], (err, resultado) => {
            respuesta(err, resultado, resolve, reject);
        });
    });
};

/**
 * Eliminar un libro por su ID
 */
const eliminarstonkQuery = (id) => {
    return new Promise((resolve, reject) => {
        const sql = 'DELETE FROM movimientos_stock WHERE id_movimiento = ?';
        config.query(sql, [id], (err, resultado) => {
            respuesta(err, resultado, resolve, reject);
        });
    });
};

// Exportar todas las funciones definidas en este archivo
export {
    listarTodosstonkQuery,
    listarstonkPorIdQuery,
    crearstonkQuery,
    actualizarstonkQuery,
    eliminarstonkQuery   
}
