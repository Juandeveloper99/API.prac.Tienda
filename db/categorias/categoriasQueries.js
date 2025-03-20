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
 * Carga la lista de categorias
 */
const listarTodoscategoriasQuery = () => {
    // Una promesa es una forma de que siempre se devuelva un resultado al quien llama (sea error o éxito)
    // Si la consulta no genera error, entonces resuelve/cumple la promesa con el resultado
    // Si hay algun error entonces rechaza la consulta e informa la razón 
    return new Promise((resolve, reject) => {
        config.query('SELECT * FROM categorias', (err, filas) => {
            respuesta(err, filas, resolve, reject);
        });
    });
};

/**
 * Buscar un libro por su ID (llave primaria)
 */
const listarcategoriasPorIdQuery = (id) => {
    return new Promise((resolve, reject) => {
        config.query('SELECT * FROM categorias WHERE id_categoria = ? LIMIT 1', [id], (err, filas) => {
            respuesta(err, filas, resolve, reject);
        });
    });
};


/**
 * Guardar un nuevo libro
 */
const crearcategoriasQuery = async (categorias) => {
    const { id_categorias, nombre, descripcion, precio, stock, categoria_id, marca_id } = categorias;
    return new Promise((resolve, reject) => {
        const sql = 'INSERT INTO categorias (id_categoria, nombre) VALUES (?, ?)';
        config.query(sql, [id_categorias, nombre], (err, resultado) => {
            respuesta(err, resultado, resolve, reject);
        });
    });
};

/**
 * Actualizar un libro por su ID
 */
const actualizarcategoriasQuery = (id, categorias) => {
    const { id_categorias, nombre} = categorias;
    return new Promise((resolve, reject) => {
        const sql = 'UPDATE categorias SET id_categorias = ?, nombre = ? WHERE id_categorias = ?';
        config.query(sql, [id_categorias, nombre], (err, resultado) => {
            respuesta(err, resultado, resolve, reject);
        });
    });
};

/**
 * Eliminar un libro por su ID
 */
const eliminarcategoriasQuery = (id) => {
    return new Promise((resolve, reject) => {
        const sql = 'DELETE FROM categorias WHERE id_categorias = ?';
        config.query(sql, [id], (err, resultado) => {
            respuesta(err, resultado, resolve, reject);
        });
    });
};

// Exportar todas las funciones definidas en este archivo
export {
    listarTodoscategoriasQuery,
    listarcategoriasPorIdQuery,
    crearcategoriasQuery,
    actualizarcategoriasQuery,
    eliminarcategoriasQuery   
}
