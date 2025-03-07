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
 * Carga la lista de productos
 */
const listarTodosproductosQuery = () => {
    // Una promesa es una forma de que siempre se devuelva un resultado al quien llama (sea error o éxito)
    // Si la consulta no genera error, entonces resuelve/cumple la promesa con el resultado
    // Si hay algun error entonces rechaza la consulta e informa la razón 
    return new Promise((resolve, reject) => {
        config.query('SELECT * FROM productos', (err, filas) => {
            respuesta(err, filas, resolve, reject);
        });
    });
};

/**
 * Buscar un libro por su ID (llave primaria)
 */
const listarproductosPorIdQuery = (id) => {
    return new Promise((resolve, reject) => {
        config.query('SELECT * FROM productos WHERE id_producto = ? LIMIT 1', [id], (err, filas) => {
            respuesta(err, filas, resolve, reject);
        });
    });
};


/**
 * Guardar un nuevo libro
 */
const crearproductosQuery = async (producto) => {
    const { id_producto, nombre, descripcion, precio, stock, categoria_id, marca_id } = producto;
    return new Promise((resolve, reject) => {
        const sql = 'INSERT INTO productos (id_producto, nombre, descripcion, precio, stock, categoria_id, marca_id) VALUES (?, ?, ?, ?, ?, ?, ?)';
        config.query(sql, [id_producto, nombre, descripcion, precio, stock, categoria_id, marca_id], (err, resultado) => {
            respuesta(err, resultado, resolve, reject);
        });
    });
};

/**
 * Actualizar un libro por su ID
 */
const actualizarproductosQuery = (id, producto) => {
    const { id_producto, nombre, descripcion, precio, stock, categoria_id, marca_id } = producto;
    return new Promise((resolve, reject) => {
        const sql = 'UPDATE productos SET id_producto = ?, nombre = ?, descripcion = ?, precio = ?, stock = ?, categoria_id = ?, marca_id WHERE id_producto = ?';
        config.query(sql, [id_producto, nombre, descripcion, precio, stock, categoria_id, marca_id], (err, resultado) => {
            respuesta(err, resultado, resolve, reject);
        });
    });
};

/**
 * Eliminar un libro por su ID
 */
const eliminarproductosQuery = (id) => {
    return new Promise((resolve, reject) => {
        const sql = 'DELETE FROM productos WHERE id_producto = ?';
        config.query(sql, [id], (err, resultado) => {
            respuesta(err, resultado, resolve, reject);
        });
    });
};

// Exportar todas las funciones definidas en este archivo
export {
    listarTodosproductosQuery,
    listarproductosPorIdQuery,
    crearproductosQuery,
    actualizarproductosQuery,
    eliminarproductosQuery   
}
