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
 * Listar todos los productos con nombre de categoría y marca
 */
const listarTodosproductosQuery = () => {
    return new Promise((resolve, reject) => {
        const sql = `
            SELECT 
                productos.*, 
                categorias.nombre AS nombre_categoria, 
                marcas.nombre AS nombre_marca 
            FROM productos
            INNER JOIN categorias ON productos.categoria_id = categorias.id_categoria
            INNER JOIN marcas ON productos.marca_id = marcas.id_marca
            ORDER BY productos.nombre ASC
        `;
        config.query(sql, (err, filas) => {
            respuesta(err, filas, resolve, reject);
        });
    });
};

/**
 * Buscar un producto por ID
 */
const listarproductosPorIdQuery = (id) => {
    return new Promise((resolve, reject) => {
        const sql = `
            SELECT 
                productos.*, 
                categorias.nombre AS nombre_categoria, 
                marcas.nombre AS nombre_marca 
            FROM productos
            INNER JOIN categorias ON productos.categoria_id = categorias.id_categoria
            INNER JOIN marcas ON productos.marca_id = marcas.id_marca
            WHERE productos.id_producto = ? 
            LIMIT 1
        `;
        config.query(sql, [id], (err, filas) => {
            if (err) {
                console.error('Error en listarproductosPorIdQuery:', {
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
 * Crear un nuevo producto
 */
const crearproductosQuery = (producto) => {
    const { nombre, descripcion, precio, stock, categoria_id, marca_id, cod_barras } = producto;

    return new Promise((resolve, reject) => {
        if (!nombre || !descripcion || precio === undefined || stock === undefined || 
            !categoria_id || !marca_id || !cod_barras) {
            const error = new Error('Todos los campos del producto son requeridos');
            console.error('Error de validación:', error);
            return reject(error);
        }

        const sql = 'INSERT INTO productos SET ?';
        const datos = {
            nombre,
            descripcion,
            precio: parseFloat(precio),
            stock: parseInt(stock),
            categoria_id,
            marca_id,
            cod_barras
        };

        config.query(sql, datos, (err, resultado) => {
            if (err) {
                console.error('Error en crearproductosQuery:', {
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
 * Actualizar un producto existente
 */
const actualizarproductosQuery = (id, producto) => {
    const { nombre, descripcion, precio, stock, categoria_id, marca_id, cod_barras } = producto;

    return new Promise((resolve, reject) => {
        if (!nombre || !descripcion || precio === undefined || stock === undefined || 
            !categoria_id || !marca_id || !cod_barras) {
            const error = new Error('Todos los campos del producto son requeridos');
            console.error('Error de validación:', error);
            return reject(error);
        }

        const sql = `
            UPDATE productos SET 
                nombre = ?, 
                descripcion = ?, 
                precio = ?, 
                stock = ?, 
                categoria_id = ?, 
                marca_id = ?, 
                cod_barras = ?
            WHERE id_producto = ?
        `;

        const params = [
            nombre,
            descripcion,
            parseFloat(precio),
            parseInt(stock),
            categoria_id,
            marca_id,
            cod_barras,
            id
        ];

        config.query(sql, params, (err, resultado) => {
            if (err) {
                console.error('Error en actualizarproductosQuery:', {
                    sql,
                    params,
                    error: err
                });
                return reject(err);
            }
            resolve({
                id,
                ...producto,
                affectedRows: resultado.affectedRows
            });
        });
    });
};

/**
 * Eliminar un producto por ID
 */
const eliminarproductosQuery = (id) => {
    return new Promise((resolve, reject) => {
        const sql = 'DELETE FROM productos WHERE id_producto = ?';
        config.query(sql, [id], (err, resultado) => {
            if (err) {
                console.error('Error en eliminarproductosQuery:', {
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
    listarTodosproductosQuery,
    listarproductosPorIdQuery,
    crearproductosQuery,
    actualizarproductosQuery,
    eliminarproductosQuery
};
