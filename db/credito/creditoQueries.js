import config from '../../config.js';

// Función reutilizable para manejar errores y resultados
const respuesta = (err, result, resolve, reject) => {
    if (err) {
        console.error('Error en la consulta:', {
            error: err,
            stack: err.stack
        });
        reject(err);
    } else {
        resolve(result);
    }
};

/**
 * Listar todas las credito
 */
const listarTodoscreditoQuery = () => {
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM credito ORDER BY fecha_fact DESC`;
        config.query(sql, (err, filas) => {
            respuesta(err, filas, resolve, reject);
        });
    });
};

/**
 * Buscar una factura por ID
 */
const listarcreditoPorIdQuery = (id) => {
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM credito WHERE credito_id = ? LIMIT 1`;
        config.query(sql, [id], (err, filas) => {
            if (err) {
                console.error('Error en listarfacturaPorIdQuery:', {
                    sql,
                    params: [id],
                    error: err
                });
                return reject(err);
            }
            resolve(filas.length > 0 ? filas[0] : null);
        });
    });
};

/**
 * Crear una nueva factura
 */
const crearcreditoQuery = (credito) => {
    const { fecha_fact, cliente, productos_fact, usuario_factura, total } = credito;

    return new Promise((resolve, reject) => {
        if (!fecha_fact || !cliente || !productos_fact || !usuario_factura || total === undefined) {
            const error = new Error('Todos los campos de la factura son requeridos');
            console.error('Error de validación:', error);
            return reject(error);
        }

        const sql = 'INSERT INTO credito SET ?';
        const datos = {
            fecha_fact,
            cliente,
            productos_fact,
            usuario_factura,
            total: parseInt(total)
        };

        config.query(sql, datos, (err, resultado) => {
            if (err) {
                console.error('Error en crearfacturaQuery:', {
                    sql,
                    params: datos,
                    error: err
                });
                return reject(err);
            }
            resolve({
                id: resultado.insertId,
                ...datos
            });
        });
    });
};

/**
 * Actualizar una factura existente
 */
const actualizarcreditoQuery = ( factura) => {
    const { fecha_fact, cliente, productos_fact, usuario_factura, total } = factura;

    return new Promise((resolve, reject) => {
        if (!fecha_fact || !cliente || !productos_fact || !usuario_factura || total === undefined) {
            const error = new Error('Todos los campos de la factura son requeridos');
            console.error('Error de validación:', error);
            return reject(error);
        }

        const sql = `
            UPDATE credito SET 
                fecha_fact = ?, 
                cliente = ?, 
                productos_fact = ?, 
                usuario_factura = ?, 
                total = ? 
            WHERE credito_id = ?
        `;

        const params = [
            fecha_fact,
            cliente,
            productos_fact,
            usuario_factura,
            parseInt(total),
            id
        ];

        config.query(sql, params, (err, resultado) => {
            if (err) {
                console.error('Error en actualizarcreditoQuery:', {
                    sql,
                    params,
                    error: err
                });
                return reject(err);
            }
            resolve({
                id,
                ...factura,
                affectedRows: resultado.affectedRows
            });
        });
    });
};

/**
 * Eliminar una factura por ID
 */
const eliminarcreditoQuery = (id) => {
    return new Promise((resolve, reject) => {
        const sql = 'DELETE FROM credito WHERE credito_id = ?';
        config.query(sql, [id], (err, resultado) => {
            if (err) {
                console.error('Error en eliminarfacturaQuery:', {
                    sql,
                    params: [id],
                    error: err
                });
                return reject(err);
            }
            resolve({
                id,
                affectedRows: resultado.affectedRows
            });
        });
    });
};

// Exportar funciones
export {
    listarTodoscreditoQuery,
    listarcreditoPorIdQuery,
    crearcreditoQuery,
    actualizarcreditoQuery,
    eliminarcreditoQuery
};
