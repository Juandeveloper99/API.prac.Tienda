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
 * Carga la lista de proveedores
 */
const listarTodosproveedoresQuery = () => {
    // Una promesa es una forma de que siempre se devuelva un resultado al quien llama (sea error o éxito)
    // Si la consulta no genera error, entonces resuelve/cumple la promesa con el resultado
    // Si hay algun error entonces rechaza la consulta e informa la razón 
    return new Promise((resolve, reject) => {
        config.query('SELECT * FROM proveedores', (err, filas) => {
            respuesta(err, filas, resolve, reject);
        });
    });
};

/**
 * Buscar un libro por su ID (llave primaria)
 */
const listarproveedoresPorIdQuery = (id) => {
    return new Promise((resolve, reject) => {
        config.query('SELECT * FROM proveedores WHERE id_proveedor = ? LIMIT 1', [id], (err, filas) => {
            respuesta(err, filas, resolve, reject);
        });
    });
};


/**
 * Guardar un nuevo libro
 */
const crearproveedoresQuery = async (proveedores) => {
    const { id_proveedor, nombre, contacto, telefono, email} = proveedores;
    return new Promise((resolve, reject) => {
        const sql = 'INSERT INTO proveedores (id_proveedores, nombre, contacto, telefono, email) VALUES (?, ?, ?, ?, ?)';
        config.query(sql, [id_proveedores, nombre, contacto, telefono, email], (err, resultado) => {
            respuesta(err, resultado, resolve, reject);
        });
    });
};

/**
 * Actualizar un libro por su ID
 */
const actualizarproveedoresQuery = (id, proveedores) => {
    const { id_proveedores, nombre, contacto, telefono, email} = proveedores;
    return new Promise((resolve, reject) => {
        const sql = 'UPDATE proveedores SET id_proveedores = ?, nombre = ?, contacto = ?, telefono = ?, email = ? WHERE id_proveedores = ?';
        config.query(sql, [id_proveedores, nombre, contacto, telefono, email], (err, resultado) => {
            respuesta(err, resultado, resolve, reject);
        });
    });
};

/**
 * Eliminar un libro por su ID
 */
const eliminarproveedoresQuery = (id) => {
    return new Promise((resolve, reject) => {
        const sql = 'DELETE FROM proveedores WHERE id_proveedores = ?';
        config.query(sql, [id], (err, resultado) => {
            respuesta(err, resultado, resolve, reject);
        });
    });
};

// Exportar todas las funciones definidas en este archivo
export {
    listarTodosproveedoresQuery,
    listarproveedoresPorIdQuery,
    crearproveedoresQuery,
    actualizarproveedoresQuery,
    eliminarproveedoresQuery   
}
