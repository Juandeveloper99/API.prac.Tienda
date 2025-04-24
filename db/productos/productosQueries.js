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
    return new Promise((resolve, reject) => {
        const sql = `
            SELECT 
                productos.*, 
                categorias.nombre AS nombre_categoria, 
                marcas.nombre AS nombre_marca 
            FROM productos
            INNER JOIN categorias ON productos.categoria_id = categorias.id_categoria
            INNER JOIN marcas ON productos.marca_id = marcas.id_marca
        `;
        config.query(sql, (err, filas) => {
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
    const { id_producto, nombre, descripcion, precio, stock, categoria_id, marca_id, cod_barras} = producto;
    return new Promise((resolve, reject) => {
        const sql = 'INSERT INTO productos (nombre, descripcion, precio, stock, categoria_id, marca_id, cod_barras) VALUES (?, ?, ?, ?, ?, ?, ?)';
        config.query(sql, [nombre, descripcion, precio, stock, categoria_id, marca_id, cod_barras], (err, resultado) => {
            respuesta(err, resultado, resolve, reject);
        });
    });
};

/**
 * Actualizar un libro por su ID
 */
const actualizarproductosQuery = (id, producto) => {
    const { id_producto, nombre, descripcion, precio, stock, categoria_id, marca_id, cod_barras} = producto;
    return new Promise((resolve, reject) => {
        const sql = 'UPDATE productos SET id_producto = ?, nombre = ?, descripcion = ?, precio = ?, stock = ?, categoria_id = ?, marca_id = ?, cod_barras = ? WHERE id_producto = ?';
        config.query(sql, [id_producto, nombre, descripcion, precio, stock, categoria_id, marca_id, cod_barras], (err, resultado) => {
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
