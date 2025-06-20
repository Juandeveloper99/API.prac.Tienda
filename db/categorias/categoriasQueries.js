import config from '../../config.js';

const respuesta = (err, result, resolve, reject) => {
    if (err) {
        console.log(err);
        reject(err);
    } else {
        resolve(result);
    }
};

/**
 * Carga la lista de categorías
 */
const listartodascategoriasQuery = () => {
    return new Promise((resolve, reject) => {
        config.query('SELECT * FROM categorias', (err, filas) => {
            respuesta(err, filas, resolve, reject);
        });
    });
};

/**
 * Buscar una categoría por su ID
 */
const listarcategoriasPorIdQuery = (id) => {
    return new Promise((resolve, reject) => {
        config.query('SELECT * FROM categorias WHERE id_categoria = ? LIMIT 1', [id], (err, filas) => {
            respuesta(err, filas, resolve, reject);
        });
    });
};

/**
 * Guardar una nueva categoría
 */
const crearcategoriasQuery = (categoria) => {
    const { nombre } = categoria;
    return new Promise((resolve, reject) => {
        const sql = 'INSERT INTO categorias (nombre) VALUES (?)';
        config.query(sql, [nombre], (err, resultado) => {
            respuesta(err, resultado, resolve, reject);
        });
    });
};

/**
 * Actualizar una categoría por su ID
 */
const actualizarcategoriasQuery = (id, categoria) => {
    const { nombre } = categoria;
    return new Promise((resolve, reject) => {
        const sql = 'UPDATE categorias SET nombre = ? WHERE id_categoria = ?';
        config.query(sql, [nombre, id], (err, resultado) => {
            respuesta(err, resultado, resolve, reject);
        });
    });
};

/**
 * Eliminar una categoría por su ID
 */
const eliminarcategoriasQuery = (id) => {
    return new Promise((resolve, reject) => {
        const sql = 'DELETE FROM categorias WHERE id_categoria = ?';
        config.query(sql, [id], (err, resultado) => {
            respuesta(err, resultado, resolve, reject);
        });
    });
};

export {
    listartodascategoriasQuery,
    listarcategoriasPorIdQuery,
    crearcategoriasQuery,
    actualizarcategoriasQuery,
    eliminarcategoriasQuery   
};