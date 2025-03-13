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
 * Carga la lista de clientes
 */
const listarTodosclientesQuery = () => {
    // Una promesa es una forma de que siempre se devuelva un resultado al quien llama (sea error o éxito)
    // Si la consulta no genera error, entonces resuelve/cumple la promesa con el resultado
    // Si hay algun error entonces rechaza la consulta e informa la razón 
    return new Promise((resolve, reject) => {
        config.query('SELECT * FROM clientes', (err, filas) => {
            respuesta(err, filas, resolve, reject);
        });
    });
};

/**
 * Buscar un libro por su ID (llave primaria)
 */
const listarclientesPorIdQuery = (id) => {
    return new Promise((resolve, reject) => {
        config.query('SELECT * FROM clientes WHERE id_cliente = ? LIMIT 1', [id], (err, filas) => {
            respuesta(err, filas, resolve, reject);
        });
    });
};


/**
 * Guardar un nuevo libro
 */
const crearclientesQuery = async (cliente) => {
    const { id_cliente, nombre, descripcion, precio, stock, categoria_id, marca_id } = cliente;
    return new Promise((resolve, reject) => {
        const sql = 'INSERT INTO clientes (id_cliente, nombre, email, telefono, direccion) VALUES (?, ?, ?, ?, ?)';
        config.query(sql, [id_cliente, nombre, email, telefono, direccion], (err, resultado) => {
            respuesta(err, resultado, resolve, reject);
        });
    });
};

/**
 * Actualizar un libro por su ID
 */
const actualizarclientesQuery = (id, cliente) => {
    const { id_cliente, nombre, email, telefono, direccion} = cliente;
    return new Promise((resolve, reject) => {
        const sql = 'UPDATE clientes SET id_cliente = ?, nombre = ?, email = ?, telefono = ?, direccion = ?  WHERE id_cliente = ?';
        config.query(sql, [id_cliente, nombre, email, telefono, direccion], (err, resultado) => {
            respuesta(err, resultado, resolve, reject);
        });
    });
};

/**
 * Eliminar un libro por su ID
 */
const eliminarclientesQuery = (id) => {
    return new Promise((resolve, reject) => {
        const sql = 'DELETE FROM clientes WHERE id_cliente = ?';
        config.query(sql, [id], (err, resultado) => {
            respuesta(err, resultado, resolve, reject);
        });
    });
};

// Exportar todas las funciones definidas en este archivo
export {
    listarTodosclientesQuery,
    listarclientesPorIdQuery,
    crearclientesQuery,
    actualizarclientesQuery,
    eliminarclientesQuery   
}
