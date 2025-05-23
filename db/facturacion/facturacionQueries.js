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
 * Carga la lista de facturacion
 */
const listarTodosfacturacionQuery = () => {
    return new Promise((resolve, reject) => {
        const sql = `
            SELECT 
                facturacion.factura_id,
                facturacion.no.fact,
                facturacion.fecha_fact,
                facturacion.cliente,
                facturacion.producto_fact,
                facturacion.cantidad_prod,
                facturacion.Usuario_factura,
                facturacion.precio_producto,
                productos.nombre,
                productos.precio,
                productos.cod_barras
            FROM 
                facturacion
            INNER JOIN 
                productos ON facturacion.producto_fact = productos.id_producto;
        `;
        config.query(sql, (err, filas) => {
            respuesta(err, filas, resolve, reject);
        });
    });
};



/**
 * Buscar un libro por su ID (llave primaria)
 */
const listarfacturacionPorIdQuery = (id) => {
    
    return new Promise((resolve, reject) => {
        config.query('SELECT * FROM facturacion WHERE factura_id = ? LIMIT 1', [id], (err, filas) => {
            respuesta(err, filas, resolve, reject);
        });
    });
};


/**
 * Guardar un nuevo libro
 */
const crearfacturacionQuery = async (factura) => {
    const { fecha_fact, cliente, productos_fact, usuario_factura, total} = factura;
    return new Promise((resolve, reject) => {
        const sql = 'INSERT INTO facturacion (fecha_fact, cliente, productos_fact, usuario_factura, total) VALUES (?, ?, ?, ?, ?)';
        config.query(sql, [fecha_fact, cliente, productos_fact, usuario_factura, total], (err, resultado) => {
            respuesta(err, resultado, resolve, reject);
        });
    });
};



/**
 * Actualizar un libro por su ID
 */
const actualizarfacturacionQuery = (factura) => {
    const { n_fact, fecha_fact, vendedor, cat_fact, producto_fact, cliente} = factura;
    return new Promise((resolve, reject) => {
        const sql = 'UPDATE facturacion SET factura_id = ?, n_fact = ?, fecha_fact = ?, vendedor = ?, cat_fact = ?, producto_fact = ?, cliente = ? WHERE factura_id = ?';
        config.query(sql, [n_fact, fecha_fact, vendedor, cat_fact, producto_fact, cliente], (err, resultado) => {
            respuesta(err, resultado, resolve, reject);
        });
    });
};

/**
 * Eliminar un libro por su ID
 */
const eliminarfacturacionQuery = (id) => {
    return new Promise((resolve, reject) => {
        const sql = 'DELETE FROM facturacion WHERE factura_id = ?';
        config.query(sql, [id], (err, resultado) => {
            respuesta(err, resultado, resolve, reject);
        });
    });
};

// Exportar todas las funciones definidas en este archivo
export {
    listarTodosfacturacionQuery,
    listarfacturacionPorIdQuery,
    crearfacturacionQuery,
    actualizarfacturacionQuery,
    eliminarfacturacionQuery   
}
