import config from '../../config.js'; // Asegúrate de tener esto para las transacciones

// Helper function mejorada
const handleQuery = (err, result, resolve, reject, context = {}) => {
    if (err) {
        console.error('Error en facturación:', {
            error: err,
            context,
            stack: err.stack
        });
        reject(err);
    } else {
        resolve(result);
    }
};

/**
 * Obtiene todas las facturas
 */
const listarTodosfacturacionQuery = () => {
    return new Promise((resolve, reject) => {
        const sql = `
            SELECT 
                factura_id,
                fecha_fact,
                cliente,
                productos_fact,
                usuario_fact,
                total
            FROM facturacion 
            ORDER BY fecha_fact DESC
        `;
        
        config.query(sql, (err, facturas) => {
            if (err) return handleQuery(err, null, resolve, reject, { sql });
            
            // Parsear productos si están en JSON
            const facturasFormateadas = facturas.map(factura => {
                try {
                    return {
                        ...factura,
                        productos_fact: factura.productos_fact ? JSON.parse(factura.productos_fact) : []
                    };
                } catch (e) {
                    console.error('Error parseando productos_fact:', e);
                    return {
                        ...factura,
                        productos_fact: []
                    };
                }
            });
            
            resolve(facturasFormateadas);
        });
    });
};

/**
 * Obtiene una factura por ID
 */
const listarfacturacionPorIdQuery = (id) => {
    return new Promise((resolve, reject) => {
        const sql = `
            SELECT 
                factura_id,
                fecha_fact,
                cliente,
                productos_fact,
                usuario_fact,
                total
            FROM facturacion 
            WHERE factura_id = ?
            LIMIT 1
        `;
        
        config.query(sql, [id], (err, [factura]) => {
            if (err) return handleQuery(err, null, resolve, reject, { sql, params: [id] });
            
            if (!factura) return resolve(null);
            
            try {
                resolve({
                    ...factura,
                    productos_fact: factura.productos_fact ? JSON.parse(factura.productos_fact) : []
                });
            } catch (e) {
                handleQuery(e, null, resolve, reject, { factura });
            }
        });
    });
};

/**
 * Crea una nueva factura con transacción
 */
const crearfacturacionQuery = async (facturaData) => {
    const { cliente, productos, usuario_fact, total } = facturaData;
    
    // Validación
    if (!cliente || !usuario_fact || total <= 0 || !productos?.length) {
        const error = new Error('Datos de factura incompletos: cliente, vendedor, total y productos son requeridos');
        console.error(error.message, facturaData);
        throw error;
    }

    // Formatear productos
    const productosFactura = productos.map(p => ({
        id: p.id_producto,
        nombre: p.nombre,
        cantidad: p.cantidad,
        precio: p.precio,
        codigo: p.cod_barras || ''
    }));

    const productos_fact = JSON.stringify(productosFactura);
    const fecha_fact = new Date().toISOString().slice(0, 19).replace('T', ' ');

    const connection = await getConnection();
    
    try {
        await connection.beginTransaction();

        // 1. Insertar factura
        const [result] = await connection.query(
            `INSERT INTO facturacion 
            (fecha_fact, cliente, productos_fact, usuario_fact, total) 
            VALUES (?, ?, ?, ?, ?)`,
            [fecha_fact, cliente, productos_fact, usuario_fact, total]
        );

        // 2. Actualizar stock para cada producto
        for (const producto of productos) {
            await connection.query(
                `UPDATE productos SET stock = stock - ? WHERE id_producto = ?`,
                [producto.cantidad, producto.id_producto]
            );
        }

        await connection.commit();
        
        return {
            factura_id: result.insertId,
            fecha_fact,
            cliente,
            usuario_fact,
            total,
            productos: productosFactura
        };
    } catch (err) {
        await connection.rollback();
        console.error('Error en transacción de factura:', {
            error: err,
            data: facturaData,
            stack: err.stack
        });
        throw err;
    } finally {
        connection.release();
    }
};

/**
 * Actualiza una factura (solo datos básicos, no productos)
 */
const actualizarfacturacionQuery = (factura_id, { cliente, usuario_fact }) => {
    return new Promise((resolve, reject) => {
        const sql = `
            UPDATE facturacion 
            SET 
                cliente = ?,
                usuario_fact = ?
            WHERE factura_id = ?
        `;
        
        config.query(sql, [cliente, usuario_fact, factura_id], (err, result) => {
            handleQuery(err, result, resolve, reject, { sql, params: [cliente, usuario_fact, factura_id] });
        });
    });
};

/**
 * Elimina una factura
 */
const eliminarfacturacionQuery = (factura_id) => {
    return new Promise((resolve, reject) => {
        const sql = 'DELETE FROM facturacion WHERE factura_id = ?';
        config.query(sql, [factura_id], (err, result) => {
            handleQuery(err, result, resolve, reject, { sql, params: [factura_id] });
        });
    });
};

export {
    listarTodosfacturacionQuery,
    listarfacturacionPorIdQuery,
    crearfacturacionQuery,
    actualizarfacturacionQuery,
    eliminarfacturacionQuery
};