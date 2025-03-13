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
 * Carga la lista de marcas
 */
const listarTodosmarcasQuery = () => {
    // Una promesa es una forma de que siempre se devuelva un resultado al quien llama (sea error o éxito)
    // Si la consulta no genera error, entonces resuelve/cumple la promesa con el resultado
    // Si hay algun error entonces rechaza la consulta e informa la razón 
    return new Promise((resolve, reject) => {
        config.query('SELECT * FROM marcas', (err, filas) => {
            respuesta(err, filas, resolve, reject);
        });
    });
};

/**
 * Buscar un libro por su ID (llave primaria)
 */
const listarmarcasPorIdQuery = (id) => {
    return new Promise((resolve, reject) => {
        config.query('SELECT * FROM marcas WHERE id_marca = ? LIMIT 1', [id], (err, filas) => {
            respuesta(err, filas, resolve, reject);
        });
    });
};


/**
 * Guardar un nuevo libro
 */
const crearmarcasQuery = async (marcas) => {
    const { id_marcas, nombre, descripcion, precio, stock, categoria_id, marca_id } = marcas;
    return new Promise((resolve, reject) => {
        const sql = 'INSERT INTO marcas (id_marcas, nombre) VALUES (?, ?)';
        config.query(sql, [id_marcas, nombre, descripcion, precio, stock, categoria_id, marca_id], (err, resultado) => {
            respuesta(err, resultado, resolve, reject);
        });
    });
};

/**
 * Actualizar un libro por su ID
 */
const actualizarmarcasQuery = (id, marcas) => {
    const { id_marcas, nombre} = marcas;
    return new Promise((resolve, reject) => {
        const sql = 'UPDATE marcas SET id_marcas = ?, nombre = ? WHERE id_marcas = ?';
        config.query(sql, [id_marcas, nombre], (err, resultado) => {
            respuesta(err, resultado, resolve, reject);
        });
    });
};

/**
 * Eliminar un libro por su ID
 */
const eliminarmarcasQuery = (id) => {
    return new Promise((resolve, reject) => {
        const sql = 'DELETE FROM marcas WHERE id_marcas = ?';
        config.query(sql, [id], (err, resultado) => {
            respuesta(err, resultado, resolve, reject);
        });
    });
};

// Exportar todas las funciones definidas en este archivo
export {
    listarTodosmarcasQuery,
    listarmarcasPorIdQuery,
    crearmarcasQuery,
    actualizarmarcasQuery,
    eliminarmarcasQuery   
}
