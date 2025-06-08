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
 * Carga la lista de marcas
 */
const listarTodosmarcasQuery = () => {
    return new Promise((resolve, reject) => {
        config.query('SELECT * FROM marcas', (err, filas) => {
            respuesta(err, filas, resolve, reject);
        });
    });
};

/**
 * Buscar una marca por su ID
 */
const listarmarcasPorIdQuery = (id) => {
    return new Promise((resolve, reject) => {
        config.query('SELECT * FROM marcas WHERE id_marca = ? LIMIT 1', [id], (err, filas) => {
            respuesta(err, filas, resolve, reject);
        });
    });
};

/**
 * Guardar una nueva marca
 */
const crearmarcasQuery = (marcas) => {
    const { nombre } = marcas;
    return new Promise((resolve, reject) => {
        const sql = 'INSERT INTO marcas (nombre) VALUES (?)'; // Solo un placeholder
        config.query(sql, [nombre], (err, resultado) => {
            respuesta(err, resultado, resolve, reject);
        });
    });
};

/**
 * Actualizar una marca por su ID
 */
const actualizarmarcasQuery = (id, marcas) => {
    const { nombre } = marcas;
    return new Promise((resolve, reject) => {
        const sql = 'UPDATE marcas SET nombre = ? WHERE id_marca = ?'; // Corregido nombre de columna
        config.query(sql, [nombre, id], (err, resultado) => {
            respuesta(err, resultado, resolve, reject);
        });
    });
};

/**
 * Eliminar una marca por su ID
 */
const eliminarmarcasQuery = (id) => {
    return new Promise((resolve, reject) => {
        const sql = 'DELETE FROM marcas WHERE id_marca = ?'; // Corregido nombre de columna
        config.query(sql, [id], (err, resultado) => {
            respuesta(err, resultado, resolve, reject);
        });
    });
};

export {
    listarTodosmarcasQuery,
    listarmarcasPorIdQuery,
    crearmarcasQuery,
    actualizarmarcasQuery,
    eliminarmarcasQuery   
};